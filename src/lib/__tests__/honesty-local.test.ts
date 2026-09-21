import test from "node:test";
import assert from "node:assert/strict";
import {
  atlasModelFor,
  fetchHonestySessions,
  observedKind,
  sessionFromRow,
  sessionsFromRows,
  type HonestyRow,
} from "../honesty-local.ts";

const NOW = Date.UTC(2026, 8, 18, 18, 0, 0);

function row(over: Partial<HonestyRow>): HonestyRow {
  return {
    id: "x",
    name: "x",
    provider: "Ollama",
    where: "local",
    role: "chat",
    status: "in_use",
    source: "ollama-ps",
    host: "127.0.0.1:11434",
    via: "Ollama",
    at: new Date(NOW - 60_000).toISOString(),
    ...over,
  };
}

test("a local llama seen by Honesty Local matches the atlas local door with no drift", () => {
  const s = sessionFromRow(row({ id: "llama3.3:70b", name: "llama3.3:70b" }), NOW);
  assert.equal(s.modelId, "llama-70b-local");
  assert.equal(s.envId, "ollama");
  assert.equal(s.drift, false);
  assert.equal(s.scored, true);
  assert.deepEqual(s.observedPath[0], "This device");
  assert.ok(s.observedPath.at(-1)?.includes("on this computer"));
});

test("a llama served from a datacenter is drift: the atlas door is local, the wire is not", () => {
  const s = sessionFromRow(
    row({ id: "llama3.3:70b:cloud", name: "llama3.3:70b:cloud", where: "datacenter", host: "ollama.com" }),
    NOW,
  );
  assert.equal(s.modelId, "llama-70b-local");
  assert.equal(s.drift, true);
  assert.match(s.note, /do not agree/);
});

test("a Sonnet session through the Claude app maps to the API door", () => {
  const s = sessionFromRow(
    row({
      id: "claude-sonnet-4-20250514",
      name: "claude-sonnet-4-20250514",
      provider: "Anthropic",
      where: "datacenter",
      source: "session",
      host: null,
      via: "Claude",
    }),
    NOW,
  );
  assert.equal(s.modelId, "claude-sonnet-4");
  assert.equal(s.envId, "sonnet-api");
  assert.equal(s.drift, false);
  assert.equal(s.claimedOrigin, "AWS us-east-1 / us-west-2");
});

test("a browser session to Anthropic is a web door; a Bedrock host is an enterprise door", () => {
  assert.equal(observedKind(row({ where: "datacenter", via: "Chrome", host: "claude.ai" })), "web");
  assert.equal(
    observedKind(row({ where: "datacenter", via: "Cursor", host: "bedrock-runtime.us-east-1.amazonaws.com" })),
    "enterprise",
  );
  const s = sessionFromRow(
    row({ id: "claude-opus-4", name: "claude-opus-4", provider: "Anthropic", where: "datacenter", via: "Cursor", host: "bedrock-runtime.us-east-1.amazonaws.com" }),
    NOW,
  );
  assert.equal(s.envId, "claude-bedrock");
  assert.equal(s.drift, false);
});

test("a vendor row names no model, so no model is claimed — but the door still scores", () => {
  const s = sessionFromRow(
    row({ id: "anthropic-live", name: "Anthropic live session", provider: "Anthropic", where: "datacenter", source: "wire", host: "api.anthropic.com", via: "Chrome" }),
    NOW,
  );
  // The wire probe sees the vendor and the way in, never which model answers.
  assert.equal(atlasModelFor(row({ id: "anthropic-live", name: "Anthropic live session", provider: "Anthropic" })), undefined);
  // The door is knowable even when the model is not, and the door is what
  // carries the retention and routing story — so it is scored, and the note
  // says outright that the model was not identified.
  assert.equal(s.scored, true);
  assert.ok(s.honesty > 0);
  assert.equal(s.drift, false);
  assert.match(s.note, /not which model is answering/);
});

test("a vendor the atlas has never heard of stays unscored, with no invented number", () => {
  const s = sessionFromRow(
    row({ id: "acme-live", name: "Acme live session", provider: "Acme", where: "datacenter", source: "wire", via: "Chrome" }),
    NOW,
  );
  assert.equal(s.scored, false);
  assert.equal(s.honesty, 0);
  assert.equal(s.drift, false);
  assert.equal(s.claimedOrigin, "Not in the atlas");
  assert.match(s.note, /no entry/);
});

test("only in-use and configured rows become sessions; reachable catalog rows do not", () => {
  const out = sessionsFromRows(
    [
      row({ id: "llama3.3:70b", name: "llama3.3:70b", status: "in_use" }),
      row({ id: "qwen2.5:72b", name: "qwen2.5:72b", status: "reachable" }),
      row({ id: "mistral-large-latest", name: "mistral-large-latest", provider: "Mistral", where: "datacenter", status: "configured", via: "Continue" }),
      "garbage",
      null,
    ],
    NOW,
  );
  assert.deepEqual(
    out.map((s) => s.modelId),
    ["llama-70b-local", "mistral-large"],
  );
});

test("an unreachable watcher is reported as offline with zero sessions, never as data", async () => {
  const { feed, sessions } = await fetchHonestySessions("http://127.0.0.1:1");
  assert.equal(feed.state, "offline");
  assert.equal(sessions.length, 0);
});

test("nothing in the honesty module ships seeded sessions or seeded investigations", async () => {
  const mod = await import("../honesty-local.ts");
  const inv = await import("../investigations.ts");
  for (const name of Object.keys({ ...mod, ...inv })) {
    assert.ok(!/seed|demo|template/i.test(name), `${name} looks like seeded data`);
  }
});
