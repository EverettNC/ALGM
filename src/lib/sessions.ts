import { ALL_MODEL_IDS, getEnv, getModel } from "./catalog";
import type { HonestySession } from "./types";

const TEMPLATES: Omit<HonestySession, "id" | "at">[] = [
  {
    modelId: "claude-opus-4",
    envId: "claude-web",
    claimedOrigin: "Anthropic · United States",
    observedPath: ["This device", "Edge US-East", "AWS us-east-1", "Anthropic control plane"],
    honesty: 74,
    note: "Path matches the consumer website. Training opt-out is on you.",
    drift: false,
  },
  {
    modelId: "grok-4.5",
    envId: "grok-api",
    claimedOrigin: "Colossus · Memphis",
    observedPath: ["This device", "xAI API edge", "Colossus Memphis"],
    honesty: 84,
    note: "API path is the one you configured. No unexpected hop.",
    drift: false,
  },
  {
    modelId: "gpt-5",
    envId: "chatgpt",
    claimedOrigin: "OpenAI · US",
    observedPath: ["This device", "ChatGPT edge", "Azure mixed region", "OpenAI"],
    honesty: 62,
    note: "Observed Azure hop is allowed by the product, not disclosed in the tab UI.",
    drift: true,
  },
  {
    modelId: "llama-70b-local",
    envId: "ollama",
    claimedOrigin: "This device",
    observedPath: ["This device"],
    honesty: 97,
    note: "No outbound inference. Tools are idle.",
    drift: false,
  },
  {
    modelId: "deepseek-v3",
    envId: "deepseek-chat",
    claimedOrigin: "DeepSeek (unspecified region on the site)",
    observedPath: ["This device", "Public edge", "Hosted PRC infrastructure"],
    honesty: 28,
    note: "Claimed origin was vague. Observed path is hosted PRC. Drift flagged.",
    drift: true,
  },
  {
    modelId: "gemini-2.5",
    envId: "gemini-app",
    claimedOrigin: "Google",
    observedPath: ["This device", "Google front door", "Multi-region"],
    honesty: 58,
    note: "Region is Google’s choice, not yours. Vertex would pin it.",
    drift: true,
  },
  {
    modelId: "mistral-large",
    envId: "mistral-api",
    claimedOrigin: "Mistral · EU",
    observedPath: ["This device", "Mistral EU edge", "La Plateforme"],
    honesty: 87,
    note: "Default residency is EU. No unexpected hop off-continent.",
    drift: false,
  },
  {
    modelId: "qwen-local",
    envId: "qwen-local",
    claimedOrigin: "This device",
    observedPath: ["This device"],
    honesty: 96,
    note: "Local weights. Hosted Qwen Chat is a different product.",
    drift: false,
  },
  {
    modelId: "claude-sonnet-4",
    envId: "sonnet-api",
    claimedOrigin: "Anthropic API · United States",
    observedPath: ["This device", "Anthropic API edge", "AWS us-east-1"],
    honesty: 86,
    note: "API path. Zero-training default holds.",
    drift: false,
  },
];

export function seedSessions(now = Date.now()): HonestySession[] {
  return TEMPLATES.map((t, i) => {
    const model = getModel(t.modelId);
    const env = getEnv(t.modelId, t.envId);
    return {
      ...t,
      claimedOrigin: t.claimedOrigin || model?.origin || "Unknown",
      id: `sess-${t.modelId}-${i}`,
      at: now - (i * 7 + 3) * 60 * 1000,
      honesty: env?.data.honesty ?? t.honesty,
    };
  });
}

export function liveAgents() {
  return ALL_MODEL_IDS.map((id) => {
    const model = getModel(id);
    if (!model) return null;
    const env =
      model.environments.find((e) => e.id === model.defaultEnv) ??
      model.environments[0];
    return { model, env };
  }).filter((x): x is NonNullable<typeof x> => Boolean(x));
}
