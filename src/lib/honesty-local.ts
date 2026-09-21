/**
 * Honesty Local is the watcher on this computer (HONESTY, honesty.py). It
 * observes which programs are running and which model is actually answering:
 * live sockets to the datacenters, Ollama and NIM on loopback, the model each
 * app has selected, the model the last session used.
 *
 * ALGM does not observe anything itself. Every session on the Honesty page is
 * a row Honesty Local reported. When Honesty Local is not running, there are
 * no sessions, and the page says so. Nothing here is seeded, sampled, or
 * invented.
 */

import { MODELS, getEnv, getModel } from "./catalog.ts";
import type { EnvKind, HonestySession } from "./types";

export const HONESTY_LOCAL_URL = "http://127.0.0.1:8787";

/** One row of Honesty Local's /api/models. Shape copied from honesty.py model_row(). */
export type HonestyRow = {
  id: string;
  name: string;
  provider: string;
  where: "local" | "datacenter" | string;
  role: "chat" | "reasoning" | string;
  status: "in_use" | "configured" | "reachable" | string;
  source: string;
  host?: string | null;
  via?: string | null;
  at?: string | null;
};

export type HonestyFeed =
  | { state: "idle" }
  | { state: "ok"; checkedAt: number; lastScan?: string | null; machine?: string | null }
  | { state: "offline"; checkedAt: number; error: string };

const BROWSERS = ["chrome", "safari", "firefox", "brave", "edge", "chromium"];

/**
 * The version an observed model id names, if it names one.
 *
 * "claude-sonnet-5" -> "5", "gemini-2.5-pro" -> "2.5", "grok-4.5" -> "4.5".
 * Nothing, when the id is only a family or a live-session placeholder.
 */
function versionIn(id: string, family: string): string | undefined {
  const m = new RegExp(`${family}[^0-9]{0,3}(\\d+(?:\\.\\d+)?)`).exec(id);
  return m?.[1];
}

/**
 * Map a Honesty Local provider + model id onto an atlas model, or nothing.
 *
 * A family match is not a match. This used to answer `id.includes("sonnet")`
 * with "claude-sonnet-4", so a machine running **Sonnet 5** was told it was
 * running Sonnet 4 — a model it was not running, presented as a scored claim
 * with a green Match bar. That is the one thing this page says it never does.
 *
 * The version has to agree. When the observed id names a version the atlas
 * does not carry, the honest answer is no entry: the row is still shown,
 * unscored, saying the atlas has nothing to compare it against. An atlas that
 * is behind should look behind, not confident.
 */
export function atlasModelFor(row: HonestyRow): string | undefined {
  const provider = (row.provider || "").toLowerCase();
  const id = `${row.id} ${row.name}`.toLowerCase();

  /** Only claim `atlasId` when the observed version matches `expected`. */
  const exact = (family: string, expected: string, atlasId: string) => {
    if (!id.includes(family)) return undefined;
    const seen = versionIn(id, family);
    // No version in the id at all: a live-session row that names a vendor but
    // not a model. Nothing to score against.
    if (!seen) return undefined;
    return seen === expected ? atlasId : undefined;
  };

  if (provider === "anthropic") {
    return exact("opus", "4", "claude-opus-4") ?? exact("sonnet", "4", "claude-sonnet-4");
  }
  if (provider === "openai") return exact("gpt", "5", "gpt-5");
  if (provider === "xai") return exact("grok", "4.5", "grok-4.5");
  if (provider === "gemini" || provider === "google") return exact("gemini", "2.5", "gemini-2.5");
  if (provider === "mistral") return id.includes("mistral-large") ? "mistral-large" : undefined;
  if (provider === "deepseek") return exact("deepseek", "3", "deepseek-v3") ?? (id.includes("deepseek-v3") ? "deepseek-v3" : undefined);
  if (provider === "ollama" || provider === "lm studio" || provider === "nvidia nim") {
    if (id.includes("llama")) return "llama-70b-local";
    if (id.includes("qwen")) return "qwen-local";
    if (id.includes("deepseek")) return "deepseek-v3";
    return undefined;
  }
  return undefined;
}

/**
 * The atlas model that owns a vendor's doors, when the observation names a
 * vendor but no model.
 *
 * The wire probe can only see that a session is open to OpenAI or xAI — the
 * host and the browser, never which model is answering. Those rows used to
 * score nothing at all, which threw away the part ALGM is actually for: the
 * door is knowable even when the model is not. A ChatGPT web session has the
 * same retention and routing whichever GPT is behind it.
 *
 * So this picks the vendor's entry purely to read its doors. The model is
 * never claimed off the back of it — `sessionFromRow` scores the environment
 * and says outright that the model is unnamed.
 */
function vendorAtlasModel(provider: string): string | undefined {
  const p = provider.toLowerCase();
  if (p === "openai") return "gpt-5";
  if (p === "xai") return "grok-4.5";
  if (p === "anthropic") return "claude-opus-4";
  if (p === "gemini" || p === "google") return "gemini-2.5";
  if (p === "mistral") return "mistral-large";
  if (p === "deepseek") return "deepseek-v3";
  return undefined;
}

/** Which kind of door the observation points at, from what Honesty Local saw. */
export function observedKind(row: HonestyRow): EnvKind {
  const host = (row.host || "").toLowerCase();
  const via = (row.via || "").toLowerCase();
  if (row.where === "local") return "local";
  if (host.includes("bedrock") || host.includes("azure") || host.includes("vertex")) return "enterprise";
  if (BROWSERS.some((b) => via.includes(b))) return "web";
  return "api";
}

function pickEnvByKind(modelId: string, kind: EnvKind) {
  const model = getModel(modelId);
  if (!model) return undefined;
  return model.environments.find((e) => e.kind === kind);
}

function observedPath(row: HonestyRow): string[] {
  const hops = ["This device"];
  if (row.via) hops.push(`via ${row.via}`);
  if (row.host) hops.push(row.host);
  hops.push(`${row.provider} · ${row.where === "local" ? "on this computer" : "at the datacenter"}`);
  return hops;
}

function stamp(at?: string | null, fallback = Date.now()): number {
  if (!at) return fallback;
  const t = Date.parse(at);
  return Number.isFinite(t) ? t : fallback;
}

/**
 * One observed row becomes one session. The claim comes from the atlas, the
 * path comes from Honesty Local, and drift is the disagreement between them.
 * A row the atlas does not know is still shown, unscored, with no drift call,
 * because ALGM has no claim to compare it against.
 */
export function sessionFromRow(row: HonestyRow, now = Date.now()): HonestySession {
  const modelId = atlasModelFor(row);
  const kind = observedKind(row);
  const at = stamp(row.at, now);
  const path = observedPath(row);

  if (!modelId) {
    // The model is unnamed, but the door may still be known. Score the path.
    const vendorId = vendorAtlasModel(row.provider);
    const vendorEnv = vendorId ? pickEnvByKind(vendorId, kind) : undefined;
    if (vendorId && vendorEnv) {
      const vendorModel = getModel(vendorId)!;
      return {
        id: `hl-${row.provider}-${row.id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
        modelId: vendorId,
        envId: vendorEnv.id,
        claimedOrigin: vendorEnv.facility,
        observedPath: path,
        honesty: vendorEnv.data.honesty,
        scored: true,
        note:
          `Honesty Local saw a ${vendorModel.provider} session and the door it came through — ` +
          `${vendorEnv.label} — but not which model is answering, so the model is not claimed. ` +
          `The score is for the door: ${vendorEnv.data.honestyWhy}`,
        at,
        drift: false,
      };
    }

    return {
      id: `hl-${row.provider}-${row.id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      modelId: row.id,
      envId: "",
      claimedOrigin: "Not in the atlas",
      observedPath: path,
      honesty: 0,
      scored: false,
      note: `Honesty Local observed ${row.name} (${row.provider}, ${row.status.replace("_", " ")}, source ${row.source}). The atlas has no entry for it, so there is no claim to compare and no score.`,
      at,
      drift: false,
    };
  }

  const env = pickEnvByKind(modelId, kind) ?? getEnv(modelId, getModel(modelId)!.defaultEnv);
  const model = getModel(modelId)!;
  const exact = env?.kind === kind;
  const claimedLocal = env?.kind === "local";
  const observedLocal = row.where === "local";
  const drift = !exact || claimedLocal !== observedLocal;

  const note = drift
    ? `Atlas door for ${model.short} nearest to this observation is ${env?.label ?? "unknown"} (${env?.kind ?? "?"}); Honesty Local saw ${kind === "local" ? "a local runtime" : kind === "web" ? "a browser session" : kind === "enterprise" ? "an enterprise endpoint" : "an API path"}${row.host ? ` to ${row.host}` : ""}. The claim and the path do not agree.`
    : `Observed path matches the atlas door ${env?.label}. ${env?.data.honestyWhy ?? ""}`.trim();

  return {
    id: `hl-${row.provider}-${row.id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    modelId,
    envId: env?.id ?? "",
    claimedOrigin: env?.facility ?? model.origin,
    observedPath: path,
    honesty: env?.data.honesty ?? 0,
    scored: Boolean(env),
    note,
    at,
    drift,
  };
}

export function sessionsFromRows(rows: unknown, now = Date.now()): HonestySession[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r): r is HonestyRow => Boolean(r) && typeof r === "object" && typeof (r as HonestyRow).id === "string")
    .filter((r) => r.status === "in_use" || r.status === "configured")
    .map((r) => sessionFromRow(r, now))
    .sort((a, b) => b.at - a.at);
}

/** Ask Honesty Local. Never throws; an unreachable watcher is a reported state, not a crash. */
export async function fetchHonestySessions(
  base = HONESTY_LOCAL_URL,
): Promise<{ feed: HonestyFeed; sessions: HonestySession[] }> {
  const checkedAt = Date.now();
  try {
    const res = await fetch(`${base}/api/models`, { cache: "no-store" });
    if (!res.ok) {
      return { feed: { state: "offline", checkedAt, error: `Honesty Local answered ${res.status}` }, sessions: [] };
    }
    const data = (await res.json()) as { models?: unknown; last_scan?: string | null; machine?: string | null };
    return {
      feed: { state: "ok", checkedAt, lastScan: data.last_scan ?? null, machine: data.machine ?? null },
      sessions: sessionsFromRows(data.models, checkedAt),
    };
  } catch (err) {
    return {
      feed: { state: "offline", checkedAt, error: err instanceof Error ? err.message : String(err) },
      sessions: [],
    };
  }
}

/** Every door the atlas knows. These are entries in a book, not live sessions. */
export function atlasDoors() {
  return MODELS.flatMap((model) => model.environments.map((env) => ({ model, env })));
}
