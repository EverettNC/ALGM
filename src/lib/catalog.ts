import type { CapLevel, CapabilityId, Model } from "./types";

export const CAPABILITIES: Record<
  CapabilityId,
  { label: string; blurb: string; aliases: string[] }
> = {
  swarm: {
    label: "Multi-agent swarm",
    blurb:
      "Several agents splitting work under a coordinator you run. Almost never a button in a consumer chat UI.",
    aliases: [
      "swarm",
      "swarms",
      "swarming",
      "multi-agent",
      "multiagent",
      "multi agent",
      "crew",
      "autogen",
      "orchestrat",
      "worker pool",
    ],
  },
  tools: {
    label: "Tool use",
    blurb: "Function calling, MCP, or other external tools mid-turn.",
    aliases: ["tool", "tools", "function call", "mcp", "plugins"],
  },
  computer_use: {
    label: "Computer use",
    blurb: "The model drives a desktop, browser, or GUI on your behalf.",
    aliases: [
      "computer use",
      "computer-use",
      "operator",
      "desktop control",
      "gui agent",
      "click",
    ],
  },
  vision: {
    label: "Vision",
    blurb: "Read images, screenshots, and diagrams you attach.",
    aliases: ["vision", "image understanding", "screenshot", "ocr", "see"],
  },
  image_gen: {
    label: "Image generation",
    blurb: "Produce new images from a prompt.",
    aliases: [
      "image gen",
      "imagine",
      "generate image",
      "draw",
      "dall",
      "flux",
      "picture",
    ],
  },
  video: {
    label: "Video generation",
    blurb: "Produce short video clips from text or a still.",
    aliases: ["video", "clip", "animate"],
  },
  voice: {
    label: "Voice",
    blurb: "Spoken input or output.",
    aliases: ["voice", "tts", "speech", "speak", "audio"],
  },
  code_exec: {
    label: "Code execution",
    blurb: "Run code in a sandbox and return the result.",
    aliases: [
      "code execution",
      "code interpreter",
      "run code",
      "sandbox",
      "execute python",
    ],
  },
  web_search: {
    label: "Web search",
    blurb: "Live retrieval from the public web.",
    aliases: ["web search", "browse", "search the web", "live search"],
  },
  long_context: {
    label: "Long context",
    blurb: "Hundreds of thousands of tokens in a single window.",
    aliases: ["long context", "100k", "200k", "1m", "million token", "needle"],
  },
  fine_tune: {
    label: "Fine-tune",
    blurb: "Train a specialist from your own examples.",
    aliases: ["fine-tune", "finetune", "fine tune", "lora", "adapter"],
  },
  offline: {
    label: "Offline",
    blurb: "Works with the network unplugged.",
    aliases: ["offline", "airgap", "air-gapped", "no internet"],
  },
  on_device: {
    label: "On-device",
    blurb: "Weights and inference stay on hardware you control.",
    aliases: ["on-device", "on device", "local", "ollama", "lm studio", "vllm"],
  },
};

export const MODELS: Model[] = [
  {
    id: "grok-4.5",
    name: "Grok 4.5",
    short: "Grok 4.5",
    family: "grok",
    provider: "xAI",
    aliases: ["grok", "grok 4.5", "grok-4.5", "xai"],
    summary:
      "xAI’s current flagship. Strong at tool use, live search, and image generation. Native swarming is not a product — you still write the loop.",
    origin: "Colossus supercluster, Memphis, United States",
    defaultEnv: "grok-api",
    environments: [
      {
        id: "grok-web",
        label: "grok.com",
        kind: "web",
        region: "United States",
        facility: "Colossus · Memphis",
        capabilities: {
          swarm: "no",
          tools: "yes",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "Single-assistant product. Image and search are first-class. There is no worker pool or swarm UI.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Conversation history on the account; API logs shorter",
          subprocessors: ["xAI", "cloud edge (US)"],
          honesty: 78,
          honestyWhy:
            "Traffic is US-routed to Colossus. Consumer chats may be used to improve the product unless you opt out where offered.",
        },
      },
      {
        id: "grok-api",
        label: "xAI API",
        kind: "api",
        region: "United States",
        facility: "Colossus · Memphis",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "limited",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "You can fan out multiple completions yourself. xAI does not ship a hosted swarm orchestrator.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "API payloads retained for abuse review, not training by default",
          subprocessors: ["xAI"],
          honesty: 84,
          honestyWhy:
            "API traffic stays on xAI infrastructure in the US. Confirm the current zero-training clause in the API terms — ALGM does not re-read the PDF for you.",
        },
      },
    ],
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    short: "Opus 4",
    family: "claude",
    provider: "Anthropic",
    aliases: ["claude", "opus", "claude opus", "anthropic"],
    summary:
      "Anthropic’s heavy reasoning model. Excellent tools and computer use on the API. claude.ai will not run a swarm.",
    origin: "AWS / GCP, United States",
    defaultEnv: "claude-web",
    environments: [
      {
        id: "claude-web",
        label: "claude.ai",
        kind: "web",
        region: "United States",
        facility: "AWS us-east-1 · Anthropic control plane",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "no",
          vision: "yes",
          image_gen: "no",
          video: "no",
          voice: "limited",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "One assistant, Projects, Artifacts. No coordinator, no worker agents, no computer-use desktop.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Consumer chats retained per plan; privacy controls in settings",
          subprocessors: ["AWS", "Google Cloud", "Anthropic"],
          honesty: 74,
          honestyWhy:
            "Prompts leave the device for US cloud regions Anthropic uses. Consumer terms can allow improvement use unless you turn it off.",
        },
      },
      {
        id: "claude-api",
        label: "Anthropic API",
        kind: "api",
        region: "United States",
        facility: "AWS us-east-1 / us-west-2",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "yes",
          vision: "yes",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "limited",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "Computer use and tools are real. A swarm is still your orchestrator making many API calls.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "Zero training on API by default; limited operational logs",
          subprocessors: ["AWS", "Anthropic"],
          honesty: 86,
          honestyWhy:
            "API is the honest Claude path for sensitive work: no training by default, US regions, documented retention.",
        },
      },
      {
        id: "claude-bedrock",
        label: "Amazon Bedrock",
        kind: "enterprise",
        region: "Your AWS region",
        facility: "Customer-chosen AWS region",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "limited",
          vision: "yes",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "no",
          web_search: "no",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "Data residency follows the AWS region you pick. Still one model per invoke.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "Stays in your AWS account boundary",
          subprocessors: ["AWS"],
          honesty: 90,
          honestyWhy:
            "Enterprise path. Anthropic does not train on Bedrock customer content. Region is the one you configured — verify it.",
        },
      },
    ],
  },
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4",
    short: "Sonnet 4",
    family: "claude",
    provider: "Anthropic",
    aliases: ["sonnet", "claude sonnet"],
    summary:
      "Faster, cheaper Claude. Same environment rules as Opus: no swarm on claude.ai, computer use on the API.",
    origin: "AWS / GCP, United States",
    defaultEnv: "sonnet-api",
    environments: [
      {
        id: "sonnet-web",
        label: "claude.ai",
        kind: "web",
        region: "United States",
        facility: "AWS us-east-1 · Anthropic control plane",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "no",
          vision: "yes",
          image_gen: "no",
          video: "no",
          voice: "limited",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes: "Same product constraints as Opus on the website.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Per claude.ai plan",
          subprocessors: ["AWS", "Google Cloud", "Anthropic"],
          honesty: 74,
          honestyWhy: "Same consumer path as Opus on claude.ai.",
        },
      },
      {
        id: "sonnet-api",
        label: "Anthropic API",
        kind: "api",
        region: "United States",
        facility: "AWS us-east-1 / us-west-2",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "yes",
          vision: "yes",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "limited",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes: "Best default when you want Claude speed plus tools.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "API zero-training default",
          subprocessors: ["AWS", "Anthropic"],
          honesty: 86,
          honestyWhy: "Same API data path as Opus.",
        },
      },
    ],
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    short: "GPT-5",
    family: "gpt",
    provider: "OpenAI",
    aliases: ["gpt", "gpt-5", "gpt5", "chatgpt", "openai"],
    summary:
      "OpenAI flagship. ChatGPT Agent can drive a browser on some plans. A true swarm is still your code against the API.",
    origin: "OpenAI US regions + Azure",
    defaultEnv: "chatgpt",
    environments: [
      {
        id: "chatgpt",
        label: "ChatGPT",
        kind: "web",
        region: "United States (plus local routing)",
        facility: "OpenAI + Azure mixed regions",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "limited",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "yes",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "GPTs and Agent mode are not a swarm. Agent can use a computer on qualifying plans, with a visible session.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Account history; training depends on plan and toggles",
          subprocessors: ["OpenAI", "Microsoft Azure"],
          honesty: 62,
          honestyWhy:
            "Consumer ChatGPT may use chats to improve models unless you disable it. Routing can include Azure regions outside the one you assume.",
        },
      },
      {
        id: "openai-api",
        label: "OpenAI API",
        kind: "api",
        region: "United States",
        facility: "OpenAI US + Azure",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "limited",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "yes",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "yes",
          offline: "no",
          on_device: "no",
        },
        notes:
          "Fine-tunes and tool loops are API features. Orchestrate swarms on your side.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "API data not used for training by default",
          subprocessors: ["OpenAI", "Microsoft Azure"],
          honesty: 80,
          honestyWhy:
            "API is the cleaner OpenAI path. Still leaves the device; still Azure in the chain.",
        },
      },
      {
        id: "azure-openai",
        label: "Azure OpenAI",
        kind: "enterprise",
        region: "Your Azure region",
        facility: "Customer-chosen Azure region",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "no",
          voice: "yes",
          code_exec: "limited",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "yes",
          offline: "no",
          on_device: "no",
        },
        notes: "Enterprise network, VNet, and region locks. Feature lag vs public API.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "Your Azure tenant",
          subprocessors: ["Microsoft Azure"],
          honesty: 88,
          honestyWhy:
            "Data stays in the Azure resource you provisioned. Confirm the region — it is not always US.",
        },
      },
    ],
  },
  {
    id: "gemini-2.5",
    name: "Gemini 2.5 Pro",
    short: "Gemini 2.5",
    family: "gemini",
    provider: "Google",
    aliases: ["gemini", "bard", "google"],
    summary:
      "Long-context specialist with Google Search baked in. Workspace vs Vertex is the honesty fork.",
    origin: "Google Cloud, multi-region",
    defaultEnv: "gemini-app",
    environments: [
      {
        id: "gemini-app",
        label: "Gemini app",
        kind: "web",
        region: "Google global",
        facility: "Google Cloud multi-region",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes: "Consumer Gemini. Huge context, no swarm, Google-account gravity.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Tied to Google account activity",
          subprocessors: ["Google"],
          honesty: 58,
          honestyWhy:
            "Consumer Gemini sits on a Google account. Activity controls decide training. Region is Google’s, not yours.",
        },
      },
      {
        id: "vertex",
        label: "Vertex AI",
        kind: "enterprise",
        region: "Your GCP region",
        facility: "Customer-chosen GCP region",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "limited",
          voice: "yes",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "yes",
          offline: "no",
          on_device: "no",
        },
        notes: "The honest Google path for company data. You pick the region.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "Your GCP project",
          subprocessors: ["Google Cloud"],
          honesty: 85,
          honestyWhy:
            "Vertex does not train on your prompts by default. Residency is the region on the endpoint.",
        },
      },
    ],
  },
  {
    id: "llama-70b-local",
    name: "Llama 3.3 70B (local)",
    short: "Llama 70B",
    family: "llama",
    provider: "Meta (weights) · you (runtime)",
    aliases: ["llama", "llama 3", "ollama", "local llama", "meta"],
    summary:
      "You run the weights. Swarm, tools, and air-gap are all possible because you own the loop. Quality depends on your machine.",
    origin: "This device (weights from Meta)",
    defaultEnv: "ollama",
    environments: [
      {
        id: "ollama",
        label: "Ollama / LM Studio",
        kind: "local",
        region: "This device",
        facility: "Local runtime",
        capabilities: {
          swarm: "yes",
          tools: "yes",
          computer_use: "limited",
          vision: "limited",
          image_gen: "no",
          video: "no",
          voice: "limited",
          code_exec: "yes",
          web_search: "limited",
          long_context: "limited",
          fine_tune: "limited",
          offline: "yes",
          on_device: "yes",
        },
        notes:
          "Swarms work if you run a coordinator (your script, Open WebUI, Crew-style loop). The model will not invent one.",
        data: {
          leavesDevice: false,
          training: "never",
          retention: "Nothing leaves unless you add a tool that calls out",
          subprocessors: [],
          honesty: 97,
          honestyWhy:
            "Inference is on-device. The only leak is a tool you attach (search, browser, cloud fallback).",
        },
      },
    ],
  },
  {
    id: "qwen-local",
    name: "Qwen 2.5 72B (local)",
    short: "Qwen local",
    family: "qwen",
    provider: "Alibaba (weights) · you (runtime)",
    aliases: ["qwen", "qwen2", "qwen local"],
    summary:
      "Strong local coder. Same honesty profile as any local runtime — as long as you do not point it at a hosted Qwen endpoint.",
    origin: "This device (weights from Alibaba)",
    defaultEnv: "qwen-local",
    environments: [
      {
        id: "qwen-local",
        label: "Local runtime",
        kind: "local",
        region: "This device",
        facility: "Local runtime",
        capabilities: {
          swarm: "yes",
          tools: "yes",
          computer_use: "limited",
          vision: "limited",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "yes",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "limited",
          offline: "yes",
          on_device: "yes",
        },
        notes: "Do not confuse with Qwen Chat online — that is a different data path.",
        data: {
          leavesDevice: false,
          training: "never",
          retention: "On-device only",
          subprocessors: [],
          honesty: 96,
          honestyWhy:
            "Local weights. Hosted Qwen Chat is a different product and is not this environment.",
        },
      },
    ],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    short: "Mistral",
    family: "mistral",
    provider: "Mistral",
    aliases: ["mistral", "le chat"],
    summary:
      "EU-native option. le Chat vs La Plateforme vs Azure/AWS is the residency choice.",
    origin: "European Union (default) / chosen cloud",
    defaultEnv: "mistral-api",
    environments: [
      {
        id: "le-chat",
        label: "le Chat",
        kind: "web",
        region: "European Union",
        facility: "Mistral EU control plane",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "no",
          voice: "limited",
          code_exec: "limited",
          web_search: "yes",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes: "Consumer EU chat. No swarm.",
        data: {
          leavesDevice: true,
          training: "opt_out",
          retention: "Mistral account, EU default",
          subprocessors: ["Mistral", "EU cloud"],
          honesty: 76,
          honestyWhy:
            "Default residency is EU, which is the point. Still leaves the device. Check whether a CDN hop exits the Union.",
        },
      },
      {
        id: "mistral-api",
        label: "La Plateforme",
        kind: "api",
        region: "European Union",
        facility: "Mistral EU",
        capabilities: {
          swarm: "limited",
          tools: "yes",
          computer_use: "no",
          vision: "yes",
          image_gen: "yes",
          video: "no",
          voice: "no",
          code_exec: "limited",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "yes",
          offline: "no",
          on_device: "no",
        },
        notes: "Fine-tunes and tools. Swarm is your orchestrator.",
        data: {
          leavesDevice: true,
          training: "never",
          retention: "API terms, EU default",
          subprocessors: ["Mistral"],
          honesty: 87,
          honestyWhy: "EU API with no-training default. Rare among frontier hosts.",
        },
      },
    ],
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    short: "DeepSeek",
    family: "deepseek",
    provider: "DeepSeek",
    aliases: ["deepseek", "deep seek"],
    summary:
      "Very capable, very cheap hosted — and a sharp honesty drop. Run the open weights locally if the work is sensitive.",
    origin: "People’s Republic of China (hosted) / this device (local weights)",
    defaultEnv: "deepseek-chat",
    environments: [
      {
        id: "deepseek-chat",
        label: "DeepSeek Chat / API",
        kind: "web",
        region: "People’s Republic of China",
        facility: "DeepSeek hosted infrastructure",
        capabilities: {
          swarm: "no",
          tools: "limited",
          computer_use: "no",
          vision: "limited",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "yes",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "no",
          offline: "no",
          on_device: "no",
        },
        notes:
          "Hosted DeepSeek is not a US/EU data path. ALGM will not pretend otherwise.",
        data: {
          leavesDevice: true,
          training: "unknown",
          retention: "Not independently auditable from here",
          subprocessors: ["DeepSeek"],
          honesty: 28,
          honestyWhy:
            "Prompts go to infrastructure in the PRC. Retention and training are not transparent enough to score higher. Use local weights instead.",
        },
      },
      {
        id: "deepseek-local",
        label: "Local open weights",
        kind: "local",
        region: "This device",
        facility: "Local runtime",
        capabilities: {
          swarm: "yes",
          tools: "yes",
          computer_use: "limited",
          vision: "no",
          image_gen: "no",
          video: "no",
          voice: "no",
          code_exec: "yes",
          web_search: "limited",
          long_context: "yes",
          fine_tune: "limited",
          offline: "yes",
          on_device: "yes",
        },
        notes: "Same family, opposite data path. This is the DeepSeek ALGM will recommend for private work.",
        data: {
          leavesDevice: false,
          training: "never",
          retention: "On-device only",
          subprocessors: [],
          honesty: 95,
          honestyWhy: "You host it. The hosted chat product is not this environment.",
        },
      },
    ],
  },
];

export const ALL_MODEL_IDS = MODELS.map((m) => m.id);

export function getModel(id: string) {
  return MODELS.find((m) => m.id === id);
}

export function getEnv(modelId: string, envId: string) {
  return getModel(modelId)?.environments.find((e) => e.id === envId);
}

export function capOf(
  modelId: string,
  envId: string,
  cap: CapabilityId,
): CapLevel {
  return getEnv(modelId, envId)?.capabilities[cap] ?? "no";
}

export function honestyOf(modelId: string, envId?: string): number {
  const model = getModel(modelId);
  if (!model) return 0;
  const env =
    model.environments.find((e) => e.id === envId) ??
    model.environments.find((e) => e.id === model.defaultEnv) ??
    model.environments[0];
  return env?.data.honesty ?? 0;
}

export function trainingLabel(t: Model["environments"][number]["data"]["training"]) {
  switch (t) {
    case "never":
      return "Not used for training";
    case "opt_out":
      return "May train unless you opt out";
    case "opt_in":
      return "Trains only if you opt in";
    case "default_on":
      return "Used for training by default";
    default:
      return "Training policy unclear";
  }
}
