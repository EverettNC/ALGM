import test from "node:test";
import assert from "node:assert/strict";
import {
  ALL_MODEL_IDS,
  CAPABILITIES,
  MODELS,
  capOf,
  getEnv,
  getModel,
  honestyOf,
} from "../catalog.ts";
import type { CapLevel, CapabilityId } from "../types.ts";

const CAP_IDS = Object.keys(CAPABILITIES) as CapabilityId[];
const LEVELS: CapLevel[] = ["yes", "limited", "no"];

test("every model is complete and uniquely identified", () => {
  assert.ok(MODELS.length > 0, "the catalog is empty");
  const seen = new Set<string>();
  for (const m of MODELS) {
    assert.ok(!seen.has(m.id), `${m.id} is defined twice`);
    seen.add(m.id);
    for (const field of ["name", "short", "family", "provider", "summary", "origin"] as const) {
      assert.ok(m[field].trim().length > 0, `${m.id} has no ${field}`);
    }
    assert.ok(m.aliases.length > 0, `${m.id} has no aliases, so nothing can name it`);
    assert.ok(m.environments.length > 0, `${m.id} has no environments`);
  }
});

test("every model's defaultEnv actually exists on that model", () => {
  for (const m of MODELS) {
    const found = m.environments.some((e) => e.id === m.defaultEnv);
    assert.ok(found, `${m.id} defaults to ${m.defaultEnv}, which is not one of its environments`);
  }
});

test("environment ids are unique within a model, and every env is complete", () => {
  for (const m of MODELS) {
    const seen = new Set<string>();
    for (const e of m.environments) {
      assert.ok(!seen.has(e.id), `${m.id}/${e.id} is defined twice`);
      seen.add(e.id);
      assert.ok(e.label.trim().length > 0, `${m.id}/${e.id} has no label`);
      assert.ok(e.notes.trim().length > 0, `${m.id}/${e.id} has no notes to explain itself`);
      assert.ok(
        ["web", "api", "local", "enterprise"].includes(e.kind),
        `${m.id}/${e.id} has an unknown kind: ${e.kind}`,
      );
    }
  }
});

test("capability levels are only ever yes, limited or no", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      for (const [cap, level] of Object.entries(e.capabilities)) {
        assert.ok(
          CAP_IDS.includes(cap as CapabilityId),
          `${m.id}/${e.id} names an unknown capability: ${cap}`,
        );
        assert.ok(LEVELS.includes(level as CapLevel), `${m.id}/${e.id}/${cap} is ${level}`);
      }
    }
  }
});

test("honesty is a real score on every path, and it is explained", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      const h = e.data.honesty;
      assert.ok(Number.isFinite(h), `${m.id}/${e.id} has a non-numeric honesty`);
      assert.ok(h >= 0 && h <= 100, `${m.id}/${e.id} honesty is ${h}, outside 0-100`);
      assert.ok(
        e.data.honestyWhy.trim().length > 10,
        `${m.id}/${e.id} scores ${h} with no reason given`,
      );
      assert.ok(e.data.retention.trim().length > 0, `${m.id}/${e.id} has no retention statement`);
    }
  }
});

test("a local runtime never claims to leave the device, and a web UI never claims to stay", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      if (e.kind === "local") {
        assert.equal(
          e.data.leavesDevice,
          false,
          `${m.id}/${e.id} is a local runtime but is marked as leaving the device`,
        );
      }
      if (e.kind === "web") {
        assert.equal(
          e.data.leavesDevice,
          true,
          `${m.id}/${e.id} is a hosted web UI but claims to stay on the device`,
        );
      }
    }
  }
});

test("on-device and offline are only ever granted to a local runtime", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      for (const cap of ["on_device", "offline"] as CapabilityId[]) {
        if ((e.capabilities[cap] ?? "no") !== "no") {
          assert.equal(
            e.kind,
            "local",
            `${m.id}/${e.id} is ${e.kind} but grants ${cap} — that is the claim ALGM exists to refuse`,
          );
        }
      }
    }
  }
});

test("no consumer web UI is credited with a native swarm", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      if (e.kind !== "web") continue;
      assert.notEqual(
        e.capabilities.swarm,
        "yes",
        `${m.id}/${e.id} is a chat website credited with a full swarm — ALGM's central claim is that these do not swarm`,
      );
    }
  }
});

test("every capability has a label, a blurb, and aliases that can find it", () => {
  for (const [id, meta] of Object.entries(CAPABILITIES)) {
    assert.ok(meta.label.trim().length > 0, `${id} has no label`);
    assert.ok(meta.blurb.trim().length > 10, `${id} has no blurb`);
    assert.ok(meta.aliases.length > 0, `${id} has no aliases, so no query can reach it`);
    for (const a of meta.aliases) {
      assert.equal(
        a,
        a.toLowerCase(),
        `${id} alias "${a}" is not lowercase; matching normalises first`,
      );
    }
  }
});

test("model aliases are lowercase, so alias matching can find them", () => {
  for (const m of MODELS) {
    for (const a of m.aliases) {
      assert.equal(a, a.toLowerCase(), `${m.id} alias "${a}" is not lowercase`);
    }
  }
});

test("lookups agree with the catalog, and miss cleanly", () => {
  for (const id of ALL_MODEL_IDS) {
    const m = getModel(id);
    assert.ok(m, `${id} is listed but does not resolve`);
    assert.equal(m.id, id);
    const env = getEnv(id, m.defaultEnv);
    assert.ok(env, `${id} default env does not resolve`);
  }
  assert.equal(getModel("no-such-model"), undefined);
  assert.equal(getEnv("no-such-model", "no-such-env"), undefined);
});

test("capOf reports no for a path that grants nothing, never undefined", () => {
  for (const m of MODELS) {
    for (const e of m.environments) {
      for (const cap of CAP_IDS) {
        const level = capOf(m.id, e.id, cap);
        assert.ok(LEVELS.includes(level), `${m.id}/${e.id}/${cap} returned ${level}`);
      }
    }
  }
  assert.equal(capOf("no-such-model", "no-such-env", "swarm"), "no");
});

test("honestyOf stays in range for every known path", () => {
  for (const m of MODELS) {
    const overall = honestyOf(m.id);
    assert.ok(overall >= 0 && overall <= 100, `${m.id} overall honesty is ${overall}`);
    for (const e of m.environments) {
      const h = honestyOf(m.id, e.id);
      assert.ok(h >= 0 && h <= 100, `${m.id}/${e.id} honesty is ${h}`);
    }
  }
});
