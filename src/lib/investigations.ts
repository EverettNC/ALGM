import type { Payload } from "./types";

/**
 * The Watch pad holds things a person pasted or a feed delivered broken.
 * It starts empty. There are no seeded cases and no canned payloads: an item
 * exists on the pad only because something real was ingested on this device.
 */

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
