import test from "node:test";
import assert from "node:assert/strict";
import { advise, adviseStructured, detectCapability, detectModels } from "../advisor.ts";
import { CAPABILITIES, MODELS, capOf, getModel } from "../catalog.ts";
import type { CapabilityId, Verdict } from "../types.ts";

const CAP_IDS = Object.keys(CAPABILITIES) as CapabilityId[];

/** Everything about a verdict except the parts that are meant to differ per call. */
function stable(v: Verdict) {
  const { id: _id, at: _at, ...rest } = v;
  return rest;
}

test("an empty request asks for one instead of inventing a verdict", () => {
  for (const q of ["", "   ", "\n\t "]) {
    const v = advise(q);
    assert.equal(v.kind, "unknown", `"${q}" should not produce a real verdict`);
    assert.equal(v.alternatives.length, 0);
    assert.ok(v.headline.trim().length > 0);
  }
});

test("words the catalog does not know are marked unknown, never guessed into a door", () => {
  const v = advise("zzzz qqqq vvvv");
  assert.equal(v.kind, "unknown");
  assert.equal(v.modelId, undefined, "an unmatched query must not select a model");
  assert.equal(v.envId, undefined, "an unmatched query must not select an environment");
});

test("capability detection finds the move being asked about", () => {
  const cases: Array<[string, CapabilityId]> = [
    ["I want to swarm with Claude", "swarm"],
    ["can it do computer use", "computer_use"],
    ["fine-tune GPT", "fine_tune"],
  ];
  for (const [q, expected] of cases) {
    assert.equal(detectCapability(q), expected, `"${q}" should detect ${expected}`);
  }
  assert.equal(detectCapability("zzzz qqqq"), undefined);
});

test("model detection finds named models and ranks the strongest match first", () => {
  const found = detectModels("swarm with Claude");
  assert.ok(found.length > 0, "Claude should be detected");
  assert.ok(
    found[0].family.includes("claude") || found[0].aliases.some((a) => a.includes("claude")),
    `expected a Claude model first, got ${found[0].id}`,
  );
  assert.deepEqual(detectModels("zzzz qqqq"), []);
});

test("every verdict is complete — no blank headline, body, teach or honesty note", () => {
  const queries = [
    "",
    "swarm with Claude",
    "computer use on GPT in ChatGPT",
    "keep this on-device",
    "where does my data go",
    "zzzz qqqq",
    "fine-tune Grok",
  ];
  for (const q of queries) {
    const v = advise(q);
    assert.ok(v.headline.trim().length > 0, `"${q}" has no headline`);
    assert.ok(v.body.trim().length > 0, `"${q}" has no body`);
    assert.ok(v.teach.trim().length > 0, `"${q}" has no teaching point`);
    assert.ok(v.honestyNote.trim().length > 0, `"${q}" has no honesty note`);
    assert.ok(Array.isArray(v.steps), `"${q}" has no steps array`);
  }
});

test("the same question always gives the same answer", () => {
  for (const q of ["swarm with Claude", "keep this on-device", "computer use on GPT"]) {
    assert.deepEqual(stable(advise(q)), stable(advise(q)), `"${q}" is not deterministic`);
  }
});

test("each verdict carries its own id and timestamp", () => {
  const a = advise("swarm with Claude");
  const b = advise("swarm with Claude");
  assert.notEqual(a.id, b.id, "two verdicts share an id");
  assert.ok(a.at > 0 && b.at > 0);
});

test("a privacy question is answered as a privacy verdict, not a capability one", () => {
  for (const q of ["where does my data go", "is this used for training", "what is the retention"]) {
    assert.equal(advise(q).kind, "privacy", `"${q}" should route to a privacy verdict`);
  }
});

test("naming a model without a capability still gets an honest path answer", () => {
  const v = advise("Claude");
  assert.equal(v.kind, "privacy");
  assert.ok(v.modelId, "a named model should resolve to a path");
});

test("the verdict matches what the catalog actually grants for that path", () => {
  for (const m of MODELS) {
    for (const cap of CAP_IDS) {
      const v = adviseStructured(m.id, m.defaultEnv, cap);
      if (!v.modelId || !v.envId || v.kind === "privacy" || v.kind === "unknown") continue;
      const level = capOf(v.modelId, v.envId, cap);
      const expected = level === "yes" ? "allowed" : level === "limited" ? "limited" : "blocked";
      if (v.capability === cap) {
        assert.equal(
          v.kind,
          expected,
          `${m.id}/${m.defaultEnv}/${cap} is "${level}" in the catalog but the verdict said ${v.kind}`,
        );
      }
    }
  }
});

test("alternatives only ever point at doors that actually work", () => {
  for (const cap of CAP_IDS) {
    const v = advise(`${CAPABILITIES[cap].aliases[0]}`);
    for (const alt of v.alternatives) {
      assert.notEqual(alt.level, "no", `${cap}: offered a door that cannot do it`);
      assert.equal(
        capOf(alt.modelId, alt.envId, cap),
        alt.level,
        `${cap}: ${alt.modelId}/${alt.envId} disagrees with the catalog`,
      );
      assert.ok(getModel(alt.modelId), `${cap}: alternative names an unknown model`);
      assert.ok(alt.why.trim().length > 0, `${cap}: alternative has no reason`);
    }
  }
});

test("alternatives never repeat a model and never exceed four", () => {
  for (const cap of CAP_IDS) {
    const v = advise(`${CAPABILITIES[cap].aliases[0]}`);
    assert.ok(v.alternatives.length <= 4, `${cap}: ${v.alternatives.length} alternatives offered`);
    const ids = v.alternatives.map((a) => a.modelId);
    assert.equal(new Set(ids).size, ids.length, `${cap}: the same model is offered twice`);
  }
});

test("an alternative never points back at the door just ruled out", () => {
  for (const m of MODELS) {
    const v = adviseStructured(m.id, m.defaultEnv, "swarm");
    if (!v.modelId || !v.envId) continue;
    for (const alt of v.alternatives) {
      assert.ok(
        !(alt.modelId === v.modelId && alt.envId === v.envId),
        `${m.id}: offered the same door it just refused`,
      );
    }
  }
});

test("ALGM never claims to encrypt, tunnel, or block — the honesty contract", () => {
  // Only affirmative claims. "ALGM does not encrypt, tunnel, or block traffic"
  // is the disclaimer itself, and must survive.
  const overclaim =
    /\b(?<!not )(?<!never )(?:ALGM|we|it)\s+(?:will\s+)?(?:encrypts?|tunnels?|anonymi[sz]es?)\b/i;
  const queries = [
    "where does my data go",
    "keep this on-device",
    "swarm with Claude",
    "is this private",
    "computer use on GPT",
  ];
  for (const q of queries) {
    const v = advise(q);
    for (const line of [v.headline, v.body, v.teach, v.honestyNote, ...v.steps]) {
      assert.ok(!overclaim.test(line), `"${q}" produced an overclaim: ${line}`);
    }
  }
});

test("a blocked verdict never reads as permission", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      for (const cap of CAP_IDS) {
        if (capOf(m.id, e.id, cap) !== "no") continue;
        const v = adviseStructured(m.id, e.id, cap);
        if (v.kind !== "blocked") continue;
        assert.ok(
          /does not allow|cannot|will not/i.test(v.headline),
          `${m.id}/${e.id}/${cap}: blocked headline does not read as a refusal: ${v.headline}`,
        );
      }
    }
  }
});

test("adviseStructured answers about the exact door it was given — every model, every environment", () => {
  // Regression: this used to stringify the request and re-detect the model from
  // the text, so "swarm with Sonnet 4 in Anthropic API" scored Opus's
  // `anthropic` alias as highly as Sonnet's own, and answered about Opus.
  let checked = 0;
  for (const m of MODELS) {
    for (const e of m.environments) {
      for (const cap of CAP_IDS) {
        const v = adviseStructured(m.id, e.id, cap);
        assert.equal(v.modelId, m.id, `${m.id}/${e.id}/${cap}: answered about ${v.modelId}`);
        assert.equal(v.envId, e.id, `${m.id}/${e.id}/${cap}: answered about env ${v.envId}`);
        assert.equal(v.capability, cap, `${m.id}/${e.id}/${cap}: answered about ${v.capability}`);
        checked += 1;
      }
    }
  }
  assert.ok(checked > 100, `only ${checked} paths checked — the catalog should cover far more`);
});

test("an unknown door is refused rather than silently rerouted", () => {
  const v = adviseStructured("no-such-model", "no-such-env", "swarm");
  assert.equal(v.kind, "unknown");
  assert.equal(v.modelId, undefined);
  assert.equal(v.alternatives.length, 0);
});
