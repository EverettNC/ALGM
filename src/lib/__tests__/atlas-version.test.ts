import test from "node:test";
import assert from "node:assert/strict";
import { atlasModelFor } from "../honesty-local.ts";

const row = (over: Record<string, unknown>) => ({
  id: "", name: "", provider: "", where: "datacenter", role: "chat",
  status: "in_use", source: "wire", ...over,
}) as never;

test("Sonnet 5 is NOT reported as Sonnet 4", () => {
  const got = atlasModelFor(row({ id: "claude-sonnet-5", name: "claude-sonnet-5", provider: "Anthropic" }));
  assert.equal(got, undefined, "claiming Sonnet 4 for a Sonnet 5 session is inventing a model");
});

test("Opus 5 is NOT reported as Opus 4", () => {
  assert.equal(atlasModelFor(row({ id: "claude-opus-5", name: "Claude Opus 5", provider: "Anthropic" })), undefined);
});

test("Sonnet 4 still matches Sonnet 4", () => {
  assert.equal(atlasModelFor(row({ id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic" })), "claude-sonnet-4");
});

test("Opus 4 still matches Opus 4", () => {
  assert.equal(atlasModelFor(row({ id: "claude-opus-4-20250514", name: "Claude Opus 4", provider: "Anthropic" })), "claude-opus-4");
});

test("a vendor live-session row names no model, so it scores nothing", () => {
  assert.equal(atlasModelFor(row({ id: "openai-live", name: "OpenAI live session", provider: "OpenAI" })), undefined);
  assert.equal(atlasModelFor(row({ id: "xai-live", name: "xAI live session", provider: "xAI" })), undefined);
  assert.equal(atlasModelFor(row({ id: "anthropic-live", name: "Anthropic live session", provider: "Anthropic" })), undefined);
});

test("GPT-5 matches, GPT-4o does not get called GPT-5", () => {
  assert.equal(atlasModelFor(row({ id: "gpt-5", name: "GPT-5", provider: "OpenAI" })), "gpt-5");
  assert.equal(atlasModelFor(row({ id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" })), undefined);
});

test("Gemini 2.5 matches, Gemini 3 does not", () => {
  assert.equal(atlasModelFor(row({ id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Gemini" })), "gemini-2.5");
  assert.equal(atlasModelFor(row({ id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Gemini" })), undefined);
});

test("Grok 4.5 matches, Grok 5 does not", () => {
  assert.equal(atlasModelFor(row({ id: "grok-4.5", name: "Grok 4.5", provider: "xAI" })), "grok-4.5");
  assert.equal(atlasModelFor(row({ id: "grok-5", name: "Grok 5", provider: "xAI" })), undefined);
});

test("local models still match by family, which is how they are named", () => {
  assert.equal(atlasModelFor(row({ id: "llama3.3:70b", name: "llama3.3:70b", provider: "Ollama", where: "local" })), "llama-70b-local");
  assert.equal(atlasModelFor(row({ id: "qwen2.5:72b", name: "qwen2.5:72b", provider: "Ollama", where: "local" })), "qwen-local");
});
