//#region node_modules/.nitro/vite/services/ssr/assets/lessons-DfJKw1T5.js
var LESSONS = [
	{
		slug: "the-rules",
		title: "No gates. No off. No craziness.",
		kicker: "Covenant",
		minutes: 3,
		applies: ["every hosted model"],
		body: [
			"ALGM has three rules. They are not settings. They are not a plan. They cannot be switched off.",
			"No gates: ALGM never locks a door. It will not hide a model, demand a toggle, or refuse to score a path. If Claude on claude.ai cannot swarm, ALGM says so and names another door. You can still open the website. That is your call. ALGM is not a cop.",
			"No off: Honesty, Watch, and the advisor stay on. There is no pause, no “don’t show this again,” no kill switch on the origin ledger. Models cannot be toggled out of the atlas. If you do not want the score, close the app.",
			"No craziness: No silent updates. No dark patterns. No pretending a consumer chat box is a swarm. When a model card arrives broken or lying, it is held. You open it. That is the whole of it."
		],
		takeaway: "Guidance without a gate, honesty without an off switch, and no theater. That is ALGM."
	},
	{
		slug: "the-path",
		title: "Where a prompt actually goes",
		kicker: "Honesty",
		minutes: 4,
		applies: ["every hosted model"],
		body: [
			"When you type into a chat site, the text leaves the device. It hits an edge, then a control plane, then a cluster the vendor named in a PDF three links deep. ALGM’s job is to say that path in plain language before you paste something you would not email to that company.",
			"“Private” on a marketing page usually means “not published to the internet.” It does not mean “never stored,” “never logged,” or “never routed through another country.” Those are three different claims. Ask for all three.",
			"On-device is the only path that does not leave. The moment you bolt on web search, a hosted fallback, or a sync folder, the claim is void for that turn."
		],
		takeaway: "Name the door (website, API, enterprise region, local runtime) before you name the model. The door is what decides the path."
	},
	{
		slug: "swarms",
		title: "Why Claude will not swarm in the chat box",
		kicker: "Capability",
		minutes: 5,
		applies: [
			"claude-opus-4",
			"gpt-5",
			"grok-4.5"
		],
		body: [
			"A swarm is several agents with jobs, a shared board, and a coordinator that decides who speaks. That coordinator is software you run. It is not a personality setting.",
			"claude.ai, ChatGPT, grok.com, Gemini, and le Chat are single-assistant products. They will not spawn workers because you typed “act as a swarm.” They may role-play one. Role-play is not a swarm — there is no isolation, no parallel tool use, no honest audit trail.",
			"The environments that can swarm are the ones that let you call the model many times: an API, a local runtime, or a harness you installed. ALGM will keep telling you this until it is boring. Boring is the point."
		],
		takeaway: "If the product has one text box and one reply, it cannot swarm. Move to an API or a local runtime, then write the loop."
	},
	{
		slug: "on-device",
		title: "On-device versus “private cloud”",
		kicker: "Safety",
		minutes: 4,
		applies: [
			"llama-70b-local",
			"qwen-local",
			"deepseek-v3"
		],
		body: [
			"On-device means the weights and the inference live on hardware you can unplug. Ollama, LM Studio, a local vLLM box — those count. A vendor VPC in “your region” is still someone else’s computer with a better contract.",
			"Local open weights of DeepSeek or Qwen are a different product from the hosted chat with the same name. ALGM scores them separately on purpose. Do not let the brand bleed across the path.",
			"The honesty drop on hosted DeepSeek is not a vibe. The prompts go to infrastructure in the PRC, and retention is not independently auditable from this device. If that is unacceptable, run the weights at home or pick another model."
		],
		takeaway: "Same name, two products. Always check whether the environment is local or hosted before you paste."
	},
	{
		slug: "training",
		title: "Training, logs, and the opt-out you forgot",
		kicker: "Honesty",
		minutes: 4,
		applies: [
			"gpt-5",
			"claude-opus-4",
			"gemini-2.5",
			"grok-4.5"
		],
		body: [
			"Three layers get confused constantly: training (weights may learn from you), retention (they keep a copy), and monitoring (a human or classifier may read it). A vendor can say “we do not train” and still keep logs for 30 days and still scan for abuse. That can be fine. It is not the same sentence.",
			"Consumer websites are usually opt-out. APIs and enterprise regions are usually never-train. If the work is sensitive, do not fight the consumer toggle — change environment.",
			"ALGM will show the training policy it knows. Policies move. When an update fails to parse, it is held for inspection instead of silently rewriting the score. That is the lazy-load on purpose."
		],
		takeaway: "For anything you would not put in a support ticket, use API, enterprise, or local — not the free website."
	},
	{
		slug: "right-model",
		title: "Picking the right model for the job",
		kicker: "Craft",
		minutes: 5,
		applies: [
			"grok-4.5",
			"claude-opus-4",
			"gpt-5",
			"llama-70b-local"
		],
		body: [
			"People collect subscriptions and then use the last tab they opened. That is how a swarm request ends up in claude.ai and a private medical note ends up in a consumer Gemini.",
			"A working default: local for anything that must not travel; API Claude or Grok for tools and long reasoning; ChatGPT when you specifically need its agent or image stack; Vertex/Bedrock/Azure when the company already bought the region lock.",
			"ALGM’s advisor is deliberately rude about this. It will not invent a capability so you feel successful. If that door cannot do the thing, it says so and points at the next one. It will not lock you out."
		],
		takeaway: "Choose the environment first, the model second, the prompt third. Reverse that and you leak or you stall."
	},
	{
		slug: "updates",
		title: "Failed updates and why they lazy-load",
		kicker: "Watch",
		minutes: 3,
		applies: ["every hosted model"],
		body: [
			"Model cards, policy diffs, and capability flags arrive as uploads. If the file is truncated, signed wrong, or claims a capability jump that contradicts the environment, ALGM does not apply it.",
			"The stub stays in Watch: title, size, source, error class. The payload is not parsed until you ask. That is lazy-load — so a bad file cannot execute logic just by landing.",
			"When you investigate, you will see a checksum, the failing stage, a short excerpt, and a recommended action: retry, quarantine, or clear. Quarantine keeps the old capability map. That is safer than “what’s new” winning by default."
		],
		takeaway: "A held update is a feature. Inspect it. Do not click through just to make the badge go away."
	},
	{
		slug: "computer-use",
		title: "Computer use: the model with hands",
		kicker: "Capability",
		minutes: 4,
		applies: ["claude-opus-4", "gpt-5"],
		body: [
			"Computer use is a sandboxed desktop the model can click. It is not “write me a Selenium script.” If the environment does not include that desktop, the model can only describe clicks.",
			"Claude’s computer use is an API (and some enterprise) feature. ChatGPT Agent is a plan-gated product surface. Neither belongs to the default website chat.",
			"Hands plus network is a data event. Everything on that desktop can leave. Treat computer-use sessions like sharing your screen with the vendor."
		],
		takeaway: "If you need hands, use the environment that actually has a desktop. Then assume the screen is being read."
	},
	{
		slug: "get-more",
		title: "Getting more out of the stack you already pay for",
		kicker: "Craft",
		minutes: 5,
		applies: [
			"grok-4.5",
			"claude-opus-4",
			"gpt-5",
			"llama-70b-local"
		],
		body: [
			"Most waste is environmental: using a website when you needed an API, using a 70B local for a two-line rewrite, using a hosted DeepSeek for a private repo.",
			"Give each model a job. Example: local Llama drafts against private files; Grok 4.5 searches and images; Opus API does computer use and careful tools; ChatGPT only when you want its agent.",
			"Write the job down. Then ask the advisor before you open a new tab. Two extra seconds. Fewer impossible requests. Fewer quiet leaks."
		],
		takeaway: "The stack you have is enough if you stop asking the wrong door to be a different product."
	}
];
function getLesson(slug) {
	return LESSONS.find((l) => l.slug === slug);
}
//#endregion
export { getLesson as n, LESSONS as t };
