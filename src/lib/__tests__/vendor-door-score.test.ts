import test from "node:test";
import assert from "node:assert/strict";
import { sessionFromRow, atlasModelFor } from "../honesty-local.ts";

const row = (over: Record<string, unknown>) => ({
  id: "", name: "", provider: "", where: "datacenter", role: "chat",
  status: "in_use", source: "wire", ...over,
}) as never;

test("an OpenAI live session through Chrome SCORES the ChatGPT door", () => {
  const s = sessionFromRow(row({
    id: "openai-live", name: "OpenAI live session", provider: "OpenAI",
    host: "ws.chatgpt.com", via: "Chrome", source: "wire",
  }));
  assert.equal(s.scored, true, "this used to read Unscored");
  assert.ok(s.honesty > 0, `expected a real score, got ${s.honesty}`);
  assert.equal(s.envId, "chatgpt");
  assert.match(s.note, /not which model is answering/, "and it does not claim a model it cannot see");
});

test("an xAI live session through Chrome SCORES the Grok web door", () => {
  const s = sessionFromRow(row({
    id: "xai-live", name: "xAI live session", provider: "xAI",
    host: "grok.com", via: "Chrome", source: "wire",
  }));
  assert.equal(s.scored, true);
  assert.ok(s.honesty > 0);
  assert.equal(s.envId, "grok-web");
});

test("an OpenAI API path scores the API door, not the web one", () => {
  const s = sessionFromRow(row({
    id: "openai-live", name: "OpenAI live session", provider: "OpenAI",
    host: "api.openai.com", via: null, source: "wire",
  }));
  assert.equal(s.scored, true);
  assert.equal(s.envId, "openai-api");
});

test("the model is still never invented", () => {
  assert.equal(atlasModelFor(row({ id: "claude-sonnet-5", name: "claude-sonnet-5", provider: "Anthropic" })), undefined);
  const s = sessionFromRow(row({
    id: "openai-live", name: "OpenAI live session", provider: "OpenAI", via: "Chrome",
  }));
  assert.ok(!/GPT-5 is answering|model is GPT-5/.test(s.note));
});

test("a vendor the atlas has never heard of is still unscored, not guessed", () => {
  const s = sessionFromRow(row({
    id: "acme-live", name: "Acme live session", provider: "Acme", via: "Chrome",
  }));
  assert.equal(s.scored, false);
  assert.match(s.note, /no entry for it/);
});

test("a named model still scores its own door as before", () => {
  const s = sessionFromRow(row({
    id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic",
    host: "api.anthropic.com", source: "wire",
  }));
  assert.equal(s.scored, true);
  assert.equal(s.modelId, "claude-sonnet-4");
});
