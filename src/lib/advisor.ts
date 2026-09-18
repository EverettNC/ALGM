import { CAPABILITIES, MODELS, capOf, getEnv, getModel } from "./catalog.ts";
import type {
  Alternative,
  CapLevel,
  CapabilityId,
  EnvKind,
  Environment,
  Model,
  Verdict,
  VerdictKind,
} from "./types";

const PRIVACY_RE =
  /\b(train|training|retain|retention|privacy|data center|datacenter|origin|honest|subprocessor|where does|where is my data|gdpr|china|prc|leaves? the device|on-?device)\b/i;

function norm(s: string) {
  return s.toLowerCase().replace(/[_/]+/g, " ").trim();
}

function hit(hay: string, needles: string[]) {
  const h = norm(hay);
  return needles.some((n) => h.includes(n));
}

export function detectCapability(query: string): CapabilityId | undefined {
  const q = norm(query);
  let best: { id: CapabilityId; n: number } | undefined;
  for (const [id, meta] of Object.entries(CAPABILITIES) as [
    CapabilityId,
    (typeof CAPABILITIES)[CapabilityId],
  ][]) {
    const n = meta.aliases.filter((a) => q.includes(a)).length;
    if (n && (!best || n > best.n)) best = { id, n };
  }
  return best?.id;
}

export function detectModels(query: string) {
  const q = norm(query);
  const scored = MODELS.map((m) => ({
    m,
    n: m.aliases.filter((a) => q.includes(a)).length,
  }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  return scored.map((x) => x.m);
}

function detectKind(query: string): EnvKind | undefined {
  const q = norm(query);
  if (hit(q, ["bedrock", "azure", "vertex", "enterprise", "vpc"])) return "enterprise";
  if (hit(q, ["api", "sdk", "endpoint"])) return "api";
  if (hit(q, ["ollama", "lm studio", "local", "on device", "on-device"])) return "local";
  if (hit(q, ["claude.ai", "chatgpt", "grok.com", "website", "web ui", "in the app"])) return "web";
  return undefined;
}

function pickEnv(modelId: string, preferred?: EnvKind, query?: string) {
  const model = getModel(modelId);
  if (!model) return undefined;
  const q = query ? norm(query) : "";
  const named = model.environments.find((e) => q && q.includes(norm(e.label)));
  if (named) return named;
  if (preferred) {
    const match = model.environments.find((e) => e.kind === preferred);
    if (match) return match;
  }
  return model.environments.find((e) => e.id === model.defaultEnv) ?? model.environments[0];
}

function levelToKind(level: CapLevel): VerdictKind {
  if (level === "yes") return "allowed";
  if (level === "limited") return "limited";
  return "blocked";
}

function alternatives(cap: CapabilityId, skip?: { modelId: string; envId: string }): Alternative[] {
  const out: Alternative[] = [];
  for (const model of MODELS) {
    for (const env of model.environments) {
      if (skip && skip.modelId === model.id && skip.envId === env.id) continue;
      const level = env.capabilities[cap] ?? "no";
      if (level === "no") continue;
      out.push({
        modelId: model.id,
        envId: env.id,
        level,
        why:
          level === "yes"
            ? `${model.short} in ${env.label} can do this.`
            : `${model.short} in ${env.label} can do a limited version — you still run the missing piece.`,
      });
    }
  }
  out.sort((a, b) => {
    const rank = (l: CapLevel) => (l === "yes" ? 0 : 1);
    return rank(a.level) - rank(b.level);
  });
  const seen = new Set<string>();
  return out
    .filter((a) => {
      const k = a.modelId;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 4);
}

function teachFor(cap: CapabilityId): string {
  switch (cap) {
    case "swarm":
      return "A swarm is your loop, not the model's personality. Consumer chat sites run one assistant. To swarm, you call an API or a local runtime many times from a coordinator you control.";
    case "computer_use":
      return "Computer use means the model is driving a GUI. That is a special environment with a virtual desktop, not a normal chat box. If the vendor does not expose that environment, the model cannot click for you.";
    case "on_device":
    case "offline":
      return "On-device means the weights sit on hardware you control. A 'private' cloud tab is still someone else's computer. If the work cannot leave the room, only a local runtime qualifies.";
    case "fine_tune":
      return "Fine-tuning is a separate product surface — usually API-only, often paid, never the chat homepage.";
    default:
      return "Capabilities are per environment, not per brand name. Claude on claude.ai is not Claude on Bedrock. Always name the door you are walking through.";
  }
}

function blockedCopy(name: string, envLabel: string, capLabel: string, notes: string) {
  return `This version of ${name} in ${envLabel} does not allow ${capLabel.toLowerCase()}. ${notes}`;
}

function privacyVerdict(query: string): Verdict {
  const models = detectModels(query);
  const target = models[0] ?? MODELS[0];
  const env = target ? pickEnv(target.id, detectKind(query), query) : undefined;
  const data = env?.data;
  const headline = data
    ? `${target!.short} · ${env!.label} — honesty ${data.honesty}`
    : "Name the environment to score the path";
  const body = data
    ? `${data.honestyWhy} Training: ${
        data.training === "never"
          ? "not used for training by default."
          : data.training === "opt_out"
            ? "may be used to improve the product unless you opt out."
            : data.training === "unknown"
              ? "the vendor does not make training/retention clear enough to trust."
              : "check the current terms."
      } Retention: ${data.retention}. ${
        data.leavesDevice ? "This path leaves the device." : "This path stays on the device."
      }`
    : "ALGM can only be honest about a path you name. Type who you are about to talk to, or pick a door in Stack.";

  return {
    id: crypto.randomUUID(),
    at: Date.now(),
    query,
    kind: "privacy",
    headline,
    body,
    teach:
      "ALGM does not encrypt, tunnel, or block traffic. It tells you the path so you can choose a different door. That is the whole honesty contract.",
    modelId: target?.id,
    envId: env?.id,
    alternatives: [],
    honestyNote: data?.honestyWhy ?? "No path selected.",
    steps: data
      ? [
          data.leavesDevice
            ? "If the work is sensitive, switch to a local runtime."
            : "Keep tools that call the network off, or the on-device claim is void.",
          "Read the training control on that product before you paste anything you would not email to the vendor.",
          "Re-check after updates — policies move, and ALGM will hold a failed update for inspection instead of silently applying it.",
        ]
      : ["Open Stack and name the door you are about to use."],
  };
}

export function advise(query: string): Verdict {
  const q = query.trim();
  if (!q) {
    return {
      id: crypto.randomUUID(),
      at: Date.now(),
      query: q,
      kind: "unknown",
      headline: "Tell ALGM what you want to do",
      body: "Example: “swarm with Claude”, “computer use on GPT in ChatGPT”, “keep this on-device”.",
      teach: teachFor("swarm"),
      alternatives: [],
      honestyNote: "No request yet.",
      steps: [],
    };
  }

  const cap = detectCapability(q);
  if (PRIVACY_RE.test(q) && !cap) {
    return privacyVerdict(q);
  }

  if (!cap) {
    const models = detectModels(q);
    if (models.length) return privacyVerdict(q);
    return {
      id: crypto.randomUUID(),
      at: Date.now(),
      query: q,
      kind: "unknown",
      headline: "ALGM could not map that to a capability",
      body: "Try naming the move (swarm, computer use, fine-tune, on-device, image generation) and the model (Claude, Grok, GPT, local Llama).",
      teach: "The more specific the door, the more honest the answer.",
      alternatives: [],
      honestyNote: "Nothing routed.",
      steps: ["Use the chips below if you would rather pick than type."],
    };
  }

  const named = detectModels(q);
  const kind = detectKind(q);
  const target = named[0];

  if (!target) {
    const alts = alternatives(cap);
    const capLabel = CAPABILITIES[cap].label;
    return {
      id: crypto.randomUUID(),
      at: Date.now(),
      query: q,
      kind: alts.length ? "limited" : "blocked",
      headline: `No model named — checking ${capLabel.toLowerCase()} against the catalog`,
      body:
        alts.length > 0
          ? `You did not name a model. ${capLabel} is available through these doors:`
          : `Nothing in the catalog can do ${capLabel.toLowerCase()} as a native product feature.`,
      teach: teachFor(cap),
      capability: cap,
      alternatives: alts,
      honestyNote:
        "Advice covers every environment ALGM knows. There is no hidden list and no enable-gate.",
      steps: alts.length
        ? alts.map(
            (a) => `Use ${getModel(a.modelId)?.short} via ${getEnv(a.modelId, a.envId)?.label}.`,
          )
        : ["Open Stack — the atlas of every door ALGM knows."],
    };
  }

  const env = pickEnv(target.id, kind, q)!;
  return verdictFor(target, env, cap, q);
}

/**
 * Build the verdict for one known door. Both entry points land here, so a
 * structured pick and a typed question cannot disagree about the same path.
 */
function verdictFor(target: Model, env: Environment, cap: CapabilityId, q: string): Verdict {
  const level = capOf(target.id, env.id, cap);
  const capMeta = CAPABILITIES[cap];
  const alts = alternatives(cap, { modelId: target.id, envId: env.id });
  const kindV = levelToKind(level);

  const headline =
    kindV === "allowed"
      ? `${target.short} in ${env.label} can do ${capMeta.label.toLowerCase()}`
      : kindV === "limited"
        ? `${target.short} in ${env.label} only partly supports ${capMeta.label.toLowerCase()}`
        : `This version of ${target.short} in ${env.label} does not allow ${capMeta.label.toLowerCase()}`;

  const body =
    kindV === "blocked"
      ? blockedCopy(target.short, env.label, capMeta.label, env.notes)
      : kindV === "limited"
        ? `${env.notes} ${capMeta.blurb} You will still own the missing piece (usually the coordinator, the desktop, or the fine-tune job).`
        : `${env.notes} Go ahead — and still watch the data path below. Being able to do it is not the same as it being the right door.`;

  const steps =
    kindV === "allowed"
      ? [
          `Stay in ${env.label}. Switching to the consumer website may silently drop this capability.`,
          env.data.leavesDevice
            ? "This path leaves the device. If that is unacceptable, use a local runtime from the alternatives."
            : "Keep outbound tools off if you need the on-device guarantee to hold.",
        ]
      : kindV === "limited"
        ? [
            `Keep ${target.short} for generation, but run a coordinator or desktop outside the chat box.`,
            alts[0]
              ? `If you want it native, switch to ${getModel(alts[0].modelId)?.short} · ${getEnv(alts[0].modelId, alts[0].envId)?.label}.`
              : "A local runtime is the native path for swarm or air-gap.",
          ]
        : [
            alts[0]
              ? `Use ${getModel(alts[0].modelId)?.short} in ${getEnv(alts[0].modelId, alts[0].envId)?.label} instead. ALGM will not stop you from opening ${env.label} — it just will not work there.`
              : "Open Stack for a local Llama or Qwen runtime — those can swarm because you own the loop.",
            `Do not keep retrying ${env.label}. The product cannot grow a swarm because you asked nicely.`,
          ];

  return {
    id: crypto.randomUUID(),
    at: Date.now(),
    query: q,
    kind: kindV,
    headline,
    body,
    teach: teachFor(cap),
    modelId: target.id,
    envId: env.id,
    capability: cap,
    alternatives: alts,
    honestyNote: env.data.honestyWhy,
    steps,
  };
}

/**
 * Answer about a door the caller already picked (the Stack page), by id.
 *
 * This used to build a sentence — "swarm with Sonnet 4 in Anthropic API" — and
 * hand it back to `advise`, which re-detected the model from the text. Alias
 * matching scores the environment label too, so "Anthropic API" matched Opus's
 * `anthropic` alias as strongly as "Sonnet 4" matched Sonnet's, and the tie
 * broke on catalog order: asking about Sonnet returned a verdict about Opus.
 * An app about knowing which door you are walking through cannot answer for a
 * different one, so the ids are now used directly.
 */
export function adviseStructured(modelId: string, envId: string, cap: CapabilityId): Verdict {
  const model = getModel(modelId);
  const env = getEnv(modelId, envId);
  const label = CAPABILITIES[cap].label;
  const q = `${label} with ${model?.short ?? modelId} in ${env?.label ?? envId}`;
  if (!model || !env) {
    return {
      id: crypto.randomUUID(),
      at: Date.now(),
      query: q,
      kind: "unknown",
      headline: "ALGM does not know that door",
      body: `No environment "${envId}" on model "${modelId}". Open Stack for the doors it does know.`,
      teach: teachFor(cap),
      alternatives: [],
      honestyNote: "Nothing routed.",
      steps: ["Pick a model and environment from Stack."],
    };
  }
  return verdictFor(model, env, cap, q);
}
