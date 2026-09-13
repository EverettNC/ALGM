import type { Investigation, Payload } from "./types";

export function seedInvestigations(now = Date.now()): Investigation[] {
  return [
    {
      id: "inv-claude-swarm-flag",
      title: "Capability flag: swarm=true on claude.ai",
      source: "Claude Opus 4 · claude.ai",
      kind: "update",
      failedAt: now - 1000 * 60 * 37,
      bytesHeld: 18432,
      status: "held",
      stage: "schema.contradiction",
    },
    {
      id: "inv-deepseek-policy",
      title: "Policy PDF truncated at 24 KB",
      source: "DeepSeek V3 · hosted",
      kind: "policy",
      failedAt: now - 1000 * 60 * 60 * 5,
      bytesHeld: 24576,
      status: "held",
      stage: "fetch.truncated",
    },
    {
      id: "inv-grok-card",
      title: "Model card upload — signature mismatch",
      source: "Grok 4.5 · xAI API",
      kind: "upload",
      failedAt: now - 1000 * 60 * 12,
      bytesHeld: 9021,
      status: "held",
      stage: "verify.signature",
    },
  ];
}

export const PAYLOADS: Record<string, Payload> = {
  "inv-claude-swarm-flag": {
    checksum: "sha256:9c2e…a71b",
    error:
      "Environment claude.ai claimed swarm=yes. Catalog and product surface both say single-assistant. Update rejected so a false 'allowed' would not land.",
    excerpt:
      '{ "env": "claude.ai", "capabilities": { "swarm": true, "computer_use": false } }',
    recommendation:
      "Quarantine. A swarm flag on the website is almost certainly a scraper error or a marketing page bleed. Keep the blocked verdict.",
    honestyNote:
      "Applying this would have told you Claude can swarm in the chat box. That is the lie ALGM exists to stop.",
  },
  "inv-deepseek-policy": {
    checksum: "sha256:40aa…12f0",
    error:
      "Policy document ended mid-sentence in the retention section. Lazy-load refused to parse a partial legal file.",
    excerpt:
      "…customer content may be stored in accordance with applicable law and DeepSeek’s…",
    recommendation:
      "Retry when the full PDF is available. Until then, hosted DeepSeek stays at honesty 28 and is not recommended for private work.",
    honestyNote:
      "A truncated policy is worse than a harsh one. ALGM will not guess the missing clause.",
  },
  "inv-grok-card": {
    checksum: "sha256:b77d…e4c2",
    error:
      "Detached signature did not match the model-card body. File was held, not applied.",
    excerpt:
      "x-card-signature: ed25519:…  (mismatch vs body hash)",
    recommendation:
      "Retry the upload from the vendor source. If you pasted this yourself, re-copy the file — it may have been truncated in transit.",
    honestyNote:
      "Grok’s current API path is unchanged. A bad card does not lower or raise the score.",
  },
};

export function parseUpload(text: string): {
  ok: boolean;
  title: string;
  error?: string;
  payload?: Payload;
} {
  const raw = text.trim();
  if (raw.length < 12) {
    return {
      ok: false,
      title: "Upload too small",
      error: "Nothing to inspect. Paste a model card, changelog, or policy excerpt.",
    };
  }
  const lower = raw.toLowerCase();
  const claimsSwarmOnWeb =
    /\bswarm\b/.test(lower) &&
    /\b(true|yes|enabled)\b/.test(lower) &&
    /(claude\.ai|chatgpt|grok\.com|gemini app|le chat)/.test(lower);
  const truncated =
    raw.endsWith("…") ||
    raw.endsWith("...") ||
    /\b(tbd|lorem|TODO)\b/.test(raw) ||
    raw.length < 80;

  if (claimsSwarmOnWeb) {
    return {
      ok: false,
      title: "Rejected: swarm claimed on a consumer website",
      error: "Consumer chat UIs do not grow a swarm because a file says so.",
      payload: {
        checksum: `sha256:local-${raw.length.toString(16)}`,
        error:
          "The upload asserts swarming on a single-assistant website. ALGM will not apply that flag.",
        excerpt: raw.slice(0, 220),
        recommendation: "Quarantine. If this came from a vendor, treat it as marketing bleed.",
        honestyNote:
          "Capability honesty: the environment, not the filename, decides what is possible.",
      },
    };
  }
  if (truncated) {
    return {
      ok: false,
      title: "Held: upload looks truncated",
      error: "File is too short or ends as a stub. Lazy-loaded for inspection, not applied.",
      payload: {
        checksum: `sha256:local-${raw.length.toString(16)}`,
        error: "Truncated or placeholder upload.",
        excerpt: raw.slice(0, 220),
        recommendation: "Retry with the full document, or quarantine and keep current scores.",
        honestyNote: "Partial files do not get to rewrite the catalog.",
      },
    };
  }
  return {
    ok: true,
    title: "Upload accepted as a note",
    payload: {
      checksum: `sha256:local-${raw.length.toString(16)}`,
      error: "No contradiction detected. Stored as an inspected note — catalog not auto-patched.",
      excerpt: raw.slice(0, 220),
      recommendation:
        "Clear it if it was just a note. ALGM still will not hot-patch capabilities from a paste.",
      honestyNote: "Human review stays in the loop. That is intentional.",
    },
  };
}
