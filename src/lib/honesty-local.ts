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

/** Map a Honesty Local provider + model id onto an atlas model, or nothing. */
export function atlasModelFor(row: HonestyRow): string | undefined {
  const provider = (row.provider || "").toLowerCase();
  const id = `${row.id} ${row.name}`.toLowerCase();
  if (provider === "anthropic") {
    if (id.includes("opus")) return "claude-opus-4";
    if (id.includes("sonnet")) return "claude-sonnet-4";
    return undefined;
  }
  if (provider === "openai") return id.match(/\bgpt-5/) ? "gpt-5" : undefined;
  if (provider === "xai") return id.includes("grok") ? "grok-4.5" : undefined;
  if (provider === "gemini" || provider === "google") return id.includes("gemini") ? "gemini-2.5" : undefined;
  if (provider === "mistral") return id.includes("mistral") ? "mistral-large" : undefined;
  if (provider === "deepseek") return id.includes("deepseek") ? "deepseek-v3" : undefined;
  if (provider === "ollama" || provider === "lm studio" || provider === "nvidia nim") {
    if (id.includes("llama")) return "llama-70b-local";
    if (id.includes("qwen")) return "qwen-local";
    if (id.includes("deepseek")) return "deepseek-v3";
    return undefined;
  }
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
