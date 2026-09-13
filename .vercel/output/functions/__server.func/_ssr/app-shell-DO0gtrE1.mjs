import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, c as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Radar, c as Ellipsis, i as Scale, l as Compass, o as LayoutGrid, r as Shield, s as Layers, t as X, u as BookOpen } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DO0gtrE1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Frozen demo clock so SSR and the first client paint share the same stamps. */
var DEMO_NOW = Date.UTC(2026, 8, 13, 11, 0, 0);
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function timeAgo(ts, now = DEMO_NOW) {
	const s = Math.max(0, Math.round((now - ts) / 1e3));
	if (s < 45) return "just now";
	const m = Math.round(s / 60);
	if (m < 60) return `${m}m ago`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}h ago`;
	return `${Math.round(h / 24)}d ago`;
}
function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
	return `${(n / 1048576).toFixed(1)} MB`;
}
function LatticeMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6",
				cy: "16",
				r: "2.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "8",
				r: "2.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "24",
				r: "2.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26",
				cy: "16",
				r: "2.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.1 16H13.7M18.3 16H23.9M16 10.2V13.4M16 18.6V21.8M7.6 14.4L13.8 9.6M18.2 9.6L24.4 14.4M7.6 17.6L13.8 22.4M18.2 22.4L24.4 17.6",
				stroke: "currentColor",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			})
		]
	});
}
function HonestyBar({ value, className }) {
	const tone = value >= 80 ? "bg-good" : value >= 60 ? "bg-warn" : "bg-bad";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-raised", className),
		role: "img",
		"aria-label": `Honesty ${value}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", tone),
			style: { width: `${Math.max(4, Math.min(100, value))}%` }
		})
	});
}
function LivePip({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("live-pip inline-block size-1.5 rounded-full bg-good", className),
		"aria-hidden": "true"
	});
}
var RULES = [
	{
		id: "no-gates",
		numeral: "01",
		title: "No gates",
		short: "ALGM never locks a door.",
		body: "It will not hide a model, demand a toggle, or refuse to score a path. If this version of Claude on claude.ai cannot swarm, ALGM says so and names another door. You can still open the website. That is your call. ALGM is not a cop and not a paywall."
	},
	{
		id: "no-off",
		numeral: "02",
		title: "No off",
		short: "Honesty cannot be switched off.",
		body: "Watch, the origin ledger, and the advisor stay on. There is no pause, no kill switch, no “don’t show this again.” Models cannot be toggled out of the atlas. If you do not want the score, close the app."
	},
	{
		id: "no-craziness",
		numeral: "03",
		title: "No craziness",
		short: "No silent updates. No dark patterns. No pretend swarms.",
		body: "A consumer chat box is one assistant. A failed model card is held, not applied. ALGM does not encrypt, tunnel, or block traffic. It tells you the path in plain language. That is the whole of it."
	}
];
var RULES_LINE = "No gates · No off · No craziness";
function RulesLine({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/rules",
		className: cn("text-xs leading-relaxed tracking-[0.04em] text-faint hover:text-muted", className),
		children: RULES_LINE
	});
}
function RulesGrid({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("grid gap-3", compact ? "sm:grid-cols-3" : "lg:grid-cols-3"),
		"aria-label": "The three rules",
		children: RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.6875rem] tracking-[0.16em] text-faint",
					children: rule.numeral
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl tracking-tight",
					children: rule.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm font-medium text-fg",
					children: rule.short
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: rule.body
				})
			]
		}, rule.id))
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
			ghost: "text-fg hover:bg-raised",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:bg-raised",
			danger: "bg-bad/15 text-bad hover:bg-bad/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-surface text-fg shadow-[0_0_0_1px_var(--color-line)]", side === "right" && "inset-y-0 right-0 h-full w-full max-w-sm p-4", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-muted hover:bg-raised hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl text-fg", className),
		...props
	});
}
var CAPABILITIES = {
	swarm: {
		label: "Multi-agent swarm",
		blurb: "Several agents splitting work under a coordinator you run. Almost never a button in a consumer chat UI.",
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
			"worker pool"
		]
	},
	tools: {
		label: "Tool use",
		blurb: "Function calling, MCP, or other external tools mid-turn.",
		aliases: [
			"tool",
			"tools",
			"function call",
			"mcp",
			"plugins"
		]
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
			"click"
		]
	},
	vision: {
		label: "Vision",
		blurb: "Read images, screenshots, and diagrams you attach.",
		aliases: [
			"vision",
			"image understanding",
			"screenshot",
			"ocr",
			"see"
		]
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
			"picture"
		]
	},
	video: {
		label: "Video generation",
		blurb: "Produce short video clips from text or a still.",
		aliases: [
			"video",
			"clip",
			"animate"
		]
	},
	voice: {
		label: "Voice",
		blurb: "Spoken input or output.",
		aliases: [
			"voice",
			"tts",
			"speech",
			"speak",
			"audio"
		]
	},
	code_exec: {
		label: "Code execution",
		blurb: "Run code in a sandbox and return the result.",
		aliases: [
			"code execution",
			"code interpreter",
			"run code",
			"sandbox",
			"execute python"
		]
	},
	web_search: {
		label: "Web search",
		blurb: "Live retrieval from the public web.",
		aliases: [
			"web search",
			"browse",
			"search the web",
			"live search"
		]
	},
	long_context: {
		label: "Long context",
		blurb: "Hundreds of thousands of tokens in a single window.",
		aliases: [
			"long context",
			"100k",
			"200k",
			"1m",
			"million token",
			"needle"
		]
	},
	fine_tune: {
		label: "Fine-tune",
		blurb: "Train a specialist from your own examples.",
		aliases: [
			"fine-tune",
			"finetune",
			"fine tune",
			"lora",
			"adapter"
		]
	},
	offline: {
		label: "Offline",
		blurb: "Works with the network unplugged.",
		aliases: [
			"offline",
			"airgap",
			"air-gapped",
			"no internet"
		]
	},
	on_device: {
		label: "On-device",
		blurb: "Weights and inference stay on hardware you control.",
		aliases: [
			"on-device",
			"on device",
			"local",
			"ollama",
			"lm studio",
			"vllm"
		]
	}
};
var MODELS = [
	{
		id: "grok-4.5",
		name: "Grok 4.5",
		short: "Grok 4.5",
		family: "grok",
		provider: "xAI",
		aliases: [
			"grok",
			"grok 4.5",
			"grok-4.5",
			"xai"
		],
		summary: "xAI’s current flagship. Strong at tool use, live search, and image generation. Native swarming is not a product — you still write the loop.",
		origin: "Colossus supercluster, Memphis, United States",
		defaultEnv: "grok-api",
		environments: [{
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
				on_device: "no"
			},
			notes: "Single-assistant product. Image and search are first-class. There is no worker pool or swarm UI.",
			data: {
				leavesDevice: true,
				training: "opt_out",
				retention: "Conversation history on the account; API logs shorter",
				subprocessors: ["xAI", "cloud edge (US)"],
				honesty: 78,
				honestyWhy: "Traffic is US-routed to Colossus. Consumer chats may be used to improve the product unless you opt out where offered."
			}
		}, {
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
				on_device: "no"
			},
			notes: "You can fan out multiple completions yourself. xAI does not ship a hosted swarm orchestrator.",
			data: {
				leavesDevice: true,
				training: "never",
				retention: "API payloads retained for abuse review, not training by default",
				subprocessors: ["xAI"],
				honesty: 84,
				honestyWhy: "API traffic stays on xAI infrastructure in the US. Confirm the current zero-training clause in the API terms — ALGM does not re-read the PDF for you."
			}
		}]
	},
	{
		id: "claude-opus-4",
		name: "Claude Opus 4",
		short: "Opus 4",
		family: "claude",
		provider: "Anthropic",
		aliases: [
			"claude",
			"opus",
			"claude opus",
			"anthropic"
		],
		summary: "Anthropic’s heavy reasoning model. Excellent tools and computer use on the API. claude.ai will not run a swarm.",
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
					on_device: "no"
				},
				notes: "One assistant, Projects, Artifacts. No coordinator, no worker agents, no computer-use desktop.",
				data: {
					leavesDevice: true,
					training: "opt_out",
					retention: "Consumer chats retained per plan; privacy controls in settings",
					subprocessors: [
						"AWS",
						"Google Cloud",
						"Anthropic"
					],
					honesty: 74,
					honestyWhy: "Prompts leave the device for US cloud regions Anthropic uses. Consumer terms can allow improvement use unless you turn it off."
				}
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
					on_device: "no"
				},
				notes: "Computer use and tools are real. A swarm is still your orchestrator making many API calls.",
				data: {
					leavesDevice: true,
					training: "never",
					retention: "Zero training on API by default; limited operational logs",
					subprocessors: ["AWS", "Anthropic"],
					honesty: 86,
					honestyWhy: "API is the honest Claude path for sensitive work: no training by default, US regions, documented retention."
				}
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
					on_device: "no"
				},
				notes: "Data residency follows the AWS region you pick. Still one model per invoke.",
				data: {
					leavesDevice: true,
					training: "never",
					retention: "Stays in your AWS account boundary",
					subprocessors: ["AWS"],
					honesty: 90,
					honestyWhy: "Enterprise path. Anthropic does not train on Bedrock customer content. Region is the one you configured — verify it."
				}
			}
		]
	},
	{
		id: "claude-sonnet-4",
		name: "Claude Sonnet 4",
		short: "Sonnet 4",
		family: "claude",
		provider: "Anthropic",
		aliases: ["sonnet", "claude sonnet"],
		summary: "Faster, cheaper Claude. Same environment rules as Opus: no swarm on claude.ai, computer use on the API.",
		origin: "AWS / GCP, United States",
		defaultEnv: "sonnet-api",
		environments: [{
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
				on_device: "no"
			},
			notes: "Same product constraints as Opus on the website.",
			data: {
				leavesDevice: true,
				training: "opt_out",
				retention: "Per claude.ai plan",
				subprocessors: [
					"AWS",
					"Google Cloud",
					"Anthropic"
				],
				honesty: 74,
				honestyWhy: "Same consumer path as Opus on claude.ai."
			}
		}, {
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
				on_device: "no"
			},
			notes: "Best default when you want Claude speed plus tools.",
			data: {
				leavesDevice: true,
				training: "never",
				retention: "API zero-training default",
				subprocessors: ["AWS", "Anthropic"],
				honesty: 86,
				honestyWhy: "Same API data path as Opus."
			}
		}]
	},
	{
		id: "gpt-5",
		name: "GPT-5",
		short: "GPT-5",
		family: "gpt",
		provider: "OpenAI",
		aliases: [
			"gpt",
			"gpt-5",
			"gpt5",
			"chatgpt",
			"openai"
		],
		summary: "OpenAI flagship. ChatGPT Agent can drive a browser on some plans. A true swarm is still your code against the API.",
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
					on_device: "no"
				},
				notes: "GPTs and Agent mode are not a swarm. Agent can use a computer on qualifying plans, with a visible session.",
				data: {
					leavesDevice: true,
					training: "opt_out",
					retention: "Account history; training depends on plan and toggles",
					subprocessors: ["OpenAI", "Microsoft Azure"],
					honesty: 62,
					honestyWhy: "Consumer ChatGPT may use chats to improve models unless you disable it. Routing can include Azure regions outside the one you assume."
				}
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
					on_device: "no"
				},
				notes: "Fine-tunes and tool loops are API features. Orchestrate swarms on your side.",
				data: {
					leavesDevice: true,
					training: "never",
					retention: "API data not used for training by default",
					subprocessors: ["OpenAI", "Microsoft Azure"],
					honesty: 80,
					honestyWhy: "API is the cleaner OpenAI path. Still leaves the device; still Azure in the chain."
				}
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
					on_device: "no"
				},
				notes: "Enterprise network, VNet, and region locks. Feature lag vs public API.",
				data: {
					leavesDevice: true,
					training: "never",
					retention: "Your Azure tenant",
					subprocessors: ["Microsoft Azure"],
					honesty: 88,
					honestyWhy: "Data stays in the Azure resource you provisioned. Confirm the region — it is not always US."
				}
			}
		]
	},
	{
		id: "gemini-2.5",
		name: "Gemini 2.5 Pro",
		short: "Gemini 2.5",
		family: "gemini",
		provider: "Google",
		aliases: [
			"gemini",
			"bard",
			"google"
		],
		summary: "Long-context specialist with Google Search baked in. Workspace vs Vertex is the honesty fork.",
		origin: "Google Cloud, multi-region",
		defaultEnv: "gemini-app",
		environments: [{
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
				on_device: "no"
			},
			notes: "Consumer Gemini. Huge context, no swarm, Google-account gravity.",
			data: {
				leavesDevice: true,
				training: "opt_out",
				retention: "Tied to Google account activity",
				subprocessors: ["Google"],
				honesty: 58,
				honestyWhy: "Consumer Gemini sits on a Google account. Activity controls decide training. Region is Google’s, not yours."
			}
		}, {
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
				on_device: "no"
			},
			notes: "The honest Google path for company data. You pick the region.",
			data: {
				leavesDevice: true,
				training: "never",
				retention: "Your GCP project",
				subprocessors: ["Google Cloud"],
				honesty: 85,
				honestyWhy: "Vertex does not train on your prompts by default. Residency is the region on the endpoint."
			}
		}]
	},
	{
		id: "llama-70b-local",
		name: "Llama 3.3 70B (local)",
		short: "Llama 70B",
		family: "llama",
		provider: "Meta (weights) · you (runtime)",
		aliases: [
			"llama",
			"llama 3",
			"ollama",
			"local llama",
			"meta"
		],
		summary: "You run the weights. Swarm, tools, and air-gap are all possible because you own the loop. Quality depends on your machine.",
		origin: "This device (weights from Meta)",
		defaultEnv: "ollama",
		environments: [{
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
				on_device: "yes"
			},
			notes: "Swarms work if you run a coordinator (your script, Open WebUI, Crew-style loop). The model will not invent one.",
			data: {
				leavesDevice: false,
				training: "never",
				retention: "Nothing leaves unless you add a tool that calls out",
				subprocessors: [],
				honesty: 97,
				honestyWhy: "Inference is on-device. The only leak is a tool you attach (search, browser, cloud fallback)."
			}
		}]
	},
	{
		id: "qwen-local",
		name: "Qwen 2.5 72B (local)",
		short: "Qwen local",
		family: "qwen",
		provider: "Alibaba (weights) · you (runtime)",
		aliases: [
			"qwen",
			"qwen2",
			"qwen local"
		],
		summary: "Strong local coder. Same honesty profile as any local runtime — as long as you do not point it at a hosted Qwen endpoint.",
		origin: "This device (weights from Alibaba)",
		defaultEnv: "qwen-local",
		environments: [{
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
				on_device: "yes"
			},
			notes: "Do not confuse with Qwen Chat online — that is a different data path.",
			data: {
				leavesDevice: false,
				training: "never",
				retention: "On-device only",
				subprocessors: [],
				honesty: 96,
				honestyWhy: "Local weights. Hosted Qwen Chat is a different product and is not this environment."
			}
		}]
	},
	{
		id: "mistral-large",
		name: "Mistral Large",
		short: "Mistral",
		family: "mistral",
		provider: "Mistral",
		aliases: ["mistral", "le chat"],
		summary: "EU-native option. le Chat vs La Plateforme vs Azure/AWS is the residency choice.",
		origin: "European Union (default) / chosen cloud",
		defaultEnv: "mistral-api",
		environments: [{
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
				on_device: "no"
			},
			notes: "Consumer EU chat. No swarm.",
			data: {
				leavesDevice: true,
				training: "opt_out",
				retention: "Mistral account, EU default",
				subprocessors: ["Mistral", "EU cloud"],
				honesty: 76,
				honestyWhy: "Default residency is EU, which is the point. Still leaves the device. Check whether a CDN hop exits the Union."
			}
		}, {
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
				on_device: "no"
			},
			notes: "Fine-tunes and tools. Swarm is your orchestrator.",
			data: {
				leavesDevice: true,
				training: "never",
				retention: "API terms, EU default",
				subprocessors: ["Mistral"],
				honesty: 87,
				honestyWhy: "EU API with no-training default. Rare among frontier hosts."
			}
		}]
	},
	{
		id: "deepseek-v3",
		name: "DeepSeek V3",
		short: "DeepSeek",
		family: "deepseek",
		provider: "DeepSeek",
		aliases: ["deepseek", "deep seek"],
		summary: "Very capable, very cheap hosted — and a sharp honesty drop. Run the open weights locally if the work is sensitive.",
		origin: "People’s Republic of China (hosted) / this device (local weights)",
		defaultEnv: "deepseek-chat",
		environments: [{
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
				on_device: "no"
			},
			notes: "Hosted DeepSeek is not a US/EU data path. ALGM will not pretend otherwise.",
			data: {
				leavesDevice: true,
				training: "unknown",
				retention: "Not independently auditable from here",
				subprocessors: ["DeepSeek"],
				honesty: 28,
				honestyWhy: "Prompts go to infrastructure in the PRC. Retention and training are not transparent enough to score higher. Use local weights instead."
			}
		}, {
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
				on_device: "yes"
			},
			notes: "Same family, opposite data path. This is the DeepSeek ALGM will recommend for private work.",
			data: {
				leavesDevice: false,
				training: "never",
				retention: "On-device only",
				subprocessors: [],
				honesty: 95,
				honestyWhy: "You host it. The hosted chat product is not this environment."
			}
		}]
	}
];
var ALL_MODEL_IDS = MODELS.map((m) => m.id);
function getModel(id) {
	return MODELS.find((m) => m.id === id);
}
function getEnv(modelId, envId) {
	return getModel(modelId)?.environments.find((e) => e.id === envId);
}
function capOf(modelId, envId, cap) {
	return getEnv(modelId, envId)?.capabilities[cap] ?? "no";
}
function trainingLabel(t) {
	switch (t) {
		case "never": return "Not used for training";
		case "opt_out": return "May train unless you opt out";
		case "opt_in": return "Trains only if you opt in";
		case "default_on": return "Used for training by default";
		default: return "Training policy unclear";
	}
}
var PRIVACY_RE = /\b(train|training|retain|retention|privacy|data center|datacenter|origin|honest|subprocessor|where does|where is my data|gdpr|china|prc|leaves? the device|on-?device)\b/i;
function norm(s) {
	return s.toLowerCase().replace(/[_/]+/g, " ").trim();
}
function hit(hay, needles) {
	const h = norm(hay);
	return needles.some((n) => h.includes(n));
}
function detectCapability(query) {
	const q = norm(query);
	let best;
	for (const [id, meta] of Object.entries(CAPABILITIES)) {
		const n = meta.aliases.filter((a) => q.includes(a)).length;
		if (n && (!best || n > best.n)) best = {
			id,
			n
		};
	}
	return best?.id;
}
function detectModels(query) {
	const q = norm(query);
	return MODELS.map((m) => ({
		m,
		n: m.aliases.filter((a) => q.includes(a)).length
	})).filter((x) => x.n > 0).sort((a, b) => b.n - a.n).map((x) => x.m);
}
function detectKind(query) {
	const q = norm(query);
	if (hit(q, [
		"bedrock",
		"azure",
		"vertex",
		"enterprise",
		"vpc"
	])) return "enterprise";
	if (hit(q, [
		"api",
		"sdk",
		"endpoint"
	])) return "api";
	if (hit(q, [
		"ollama",
		"lm studio",
		"local",
		"on device",
		"on-device"
	])) return "local";
	if (hit(q, [
		"claude.ai",
		"chatgpt",
		"grok.com",
		"website",
		"web ui",
		"in the app"
	])) return "web";
}
function pickEnv(modelId, preferred, query) {
	const model = getModel(modelId);
	if (!model) return void 0;
	const q = query ? norm(query) : "";
	const named = model.environments.find((e) => q && q.includes(norm(e.label)));
	if (named) return named;
	if (preferred) {
		const match = model.environments.find((e) => e.kind === preferred);
		if (match) return match;
	}
	return model.environments.find((e) => e.id === model.defaultEnv) ?? model.environments[0];
}
function levelToKind(level) {
	if (level === "yes") return "allowed";
	if (level === "limited") return "limited";
	return "blocked";
}
function alternatives(cap, skip) {
	const out = [];
	for (const model of MODELS) for (const env of model.environments) {
		if (skip && skip.modelId === model.id && skip.envId === env.id) continue;
		const level = env.capabilities[cap] ?? "no";
		if (level === "no") continue;
		out.push({
			modelId: model.id,
			envId: env.id,
			level,
			why: level === "yes" ? `${model.short} in ${env.label} can do this.` : `${model.short} in ${env.label} can do a limited version — you still run the missing piece.`
		});
	}
	out.sort((a, b) => {
		const rank = (l) => l === "yes" ? 0 : 1;
		return rank(a.level) - rank(b.level);
	});
	const seen = /* @__PURE__ */ new Set();
	return out.filter((a) => {
		const k = a.modelId;
		if (seen.has(k)) return false;
		seen.add(k);
		return true;
	}).slice(0, 4);
}
function teachFor(cap) {
	switch (cap) {
		case "swarm": return "A swarm is your loop, not the model's personality. Consumer chat sites run one assistant. To swarm, you call an API or a local runtime many times from a coordinator you control.";
		case "computer_use": return "Computer use means the model is driving a GUI. That is a special environment with a virtual desktop, not a normal chat box. If the vendor does not expose that environment, the model cannot click for you.";
		case "on_device":
		case "offline": return "On-device means the weights sit on hardware you control. A 'private' cloud tab is still someone else's computer. If the work cannot leave the room, only a local runtime qualifies.";
		case "fine_tune": return "Fine-tuning is a separate product surface — usually API-only, often paid, never the chat homepage.";
		default: return "Capabilities are per environment, not per brand name. Claude on claude.ai is not Claude on Bedrock. Always name the door you are walking through.";
	}
}
function blockedCopy(name, envLabel, capLabel, notes) {
	return `This version of ${name} in ${envLabel} does not allow ${capLabel.toLowerCase()}. ${notes}`;
}
function privacyVerdict(query) {
	const target = detectModels(query)[0] ?? MODELS[0];
	const env = target ? pickEnv(target.id, detectKind(query), query) : void 0;
	const data = env?.data;
	const headline = data ? `${target.short} · ${env.label} — honesty ${data.honesty}` : "Name the environment to score the path";
	const body = data ? `${data.honestyWhy} Training: ${data.training === "never" ? "not used for training by default." : data.training === "opt_out" ? "may be used to improve the product unless you opt out." : data.training === "unknown" ? "the vendor does not make training/retention clear enough to trust." : "check the current terms."} Retention: ${data.retention}. ${data.leavesDevice ? "This path leaves the device." : "This path stays on the device."}` : "ALGM can only be honest about a path you name. Type who you are about to talk to, or pick a door in Stack.";
	return {
		id: crypto.randomUUID(),
		at: Date.now(),
		query,
		kind: "privacy",
		headline,
		body,
		teach: "ALGM does not encrypt, tunnel, or block traffic. It tells you the path so you can choose a different door. That is the whole honesty contract.",
		modelId: target?.id,
		envId: env?.id,
		alternatives: [],
		honestyNote: data?.honestyWhy ?? "No path selected.",
		steps: data ? [
			data.leavesDevice ? "If the work is sensitive, switch to a local runtime." : "Keep tools that call the network off, or the on-device claim is void.",
			"Read the training control on that product before you paste anything you would not email to the vendor.",
			"Re-check after updates — policies move, and ALGM will hold a failed update for inspection instead of silently applying it."
		] : ["Open Stack and name the door you are about to use."]
	};
}
function advise(query) {
	const q = query.trim();
	if (!q) return {
		id: crypto.randomUUID(),
		at: Date.now(),
		query: q,
		kind: "unknown",
		headline: "Tell ALGM what you want to do",
		body: "Example: “swarm with Claude”, “computer use on GPT in ChatGPT”, “keep this on-device”.",
		teach: teachFor("swarm"),
		alternatives: [],
		honestyNote: "No request yet.",
		steps: []
	};
	const cap = detectCapability(q);
	if (PRIVACY_RE.test(q) && !cap) return privacyVerdict(q);
	if (!cap) {
		if (detectModels(q).length) return privacyVerdict(q);
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
			steps: ["Use the chips below if you would rather pick than type."]
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
			body: alts.length > 0 ? `You did not name a model. ${capLabel} is available through these doors:` : `Nothing in the catalog can do ${capLabel.toLowerCase()} as a native product feature.`,
			teach: teachFor(cap),
			capability: cap,
			alternatives: alts,
			honestyNote: "Advice covers every environment ALGM knows. There is no hidden list and no enable-gate.",
			steps: alts.length ? alts.map((a) => `Use ${getModel(a.modelId)?.short} via ${getEnv(a.modelId, a.envId)?.label}.`) : ["Open Stack — the atlas of every door ALGM knows."]
		};
	}
	const env = pickEnv(target.id, kind, q);
	const level = capOf(target.id, env.id, cap);
	const capMeta = CAPABILITIES[cap];
	const alts = alternatives(cap, {
		modelId: target.id,
		envId: env.id
	});
	const kindV = levelToKind(level);
	const headline = kindV === "allowed" ? `${target.short} in ${env.label} can do ${capMeta.label.toLowerCase()}` : kindV === "limited" ? `${target.short} in ${env.label} only partly supports ${capMeta.label.toLowerCase()}` : `This version of ${target.short} in ${env.label} does not allow ${capMeta.label.toLowerCase()}`;
	const body = kindV === "blocked" ? blockedCopy(target.short, env.label, capMeta.label, env.notes) : kindV === "limited" ? `${env.notes} ${capMeta.blurb} You will still own the missing piece (usually the coordinator, the desktop, or the fine-tune job).` : `${env.notes} Go ahead — and still watch the data path below. Being able to do it is not the same as it being the right door.`;
	const steps = kindV === "allowed" ? [`Stay in ${env.label}. Switching to the consumer website may silently drop this capability.`, env.data.leavesDevice ? "This path leaves the device. If that is unacceptable, use a local runtime from the alternatives." : "Keep outbound tools off if you need the on-device guarantee to hold."] : kindV === "limited" ? [`Keep ${target.short} for generation, but run a coordinator or desktop outside the chat box.`, alts[0] ? `If you want it native, switch to ${getModel(alts[0].modelId)?.short} · ${getEnv(alts[0].modelId, alts[0].envId)?.label}.` : "A local runtime is the native path for swarm or air-gap."] : [alts[0] ? `Use ${getModel(alts[0].modelId)?.short} in ${getEnv(alts[0].modelId, alts[0].envId)?.label} instead. ALGM will not stop you from opening ${env.label} — it just will not work there.` : "Open Stack for a local Llama or Qwen runtime — those can swarm because you own the loop.", `Do not keep retrying ${env.label}. The product cannot grow a swarm because you asked nicely.`];
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
		steps
	};
}
function adviseStructured(modelId, envId, cap) {
	const model = getModel(modelId);
	const env = getEnv(modelId, envId);
	return advise(`${CAPABILITIES[cap].label} with ${model?.short ?? modelId} in ${env?.label ?? envId}`);
}
function seedInvestigations(now = Date.now()) {
	return [
		{
			id: "inv-claude-swarm-flag",
			title: "Capability flag: swarm=true on claude.ai",
			source: "Claude Opus 4 · claude.ai",
			kind: "update",
			failedAt: now - 222e4,
			bytesHeld: 18432,
			status: "held",
			stage: "schema.contradiction"
		},
		{
			id: "inv-deepseek-policy",
			title: "Policy PDF truncated at 24 KB",
			source: "DeepSeek V3 · hosted",
			kind: "policy",
			failedAt: now - 18e6,
			bytesHeld: 24576,
			status: "held",
			stage: "fetch.truncated"
		},
		{
			id: "inv-grok-card",
			title: "Model card upload — signature mismatch",
			source: "Grok 4.5 · xAI API",
			kind: "upload",
			failedAt: now - 72e4,
			bytesHeld: 9021,
			status: "held",
			stage: "verify.signature"
		}
	];
}
var PAYLOADS = {
	"inv-claude-swarm-flag": {
		checksum: "sha256:9c2e…a71b",
		error: "Environment claude.ai claimed swarm=yes. Catalog and product surface both say single-assistant. Update rejected so a false 'allowed' would not land.",
		excerpt: "{ \"env\": \"claude.ai\", \"capabilities\": { \"swarm\": true, \"computer_use\": false } }",
		recommendation: "Quarantine. A swarm flag on the website is almost certainly a scraper error or a marketing page bleed. Keep the blocked verdict.",
		honestyNote: "Applying this would have told you Claude can swarm in the chat box. That is the lie ALGM exists to stop."
	},
	"inv-deepseek-policy": {
		checksum: "sha256:40aa…12f0",
		error: "Policy document ended mid-sentence in the retention section. Lazy-load refused to parse a partial legal file.",
		excerpt: "…customer content may be stored in accordance with applicable law and DeepSeek’s…",
		recommendation: "Retry when the full PDF is available. Until then, hosted DeepSeek stays at honesty 28 and is not recommended for private work.",
		honestyNote: "A truncated policy is worse than a harsh one. ALGM will not guess the missing clause."
	},
	"inv-grok-card": {
		checksum: "sha256:b77d…e4c2",
		error: "Detached signature did not match the model-card body. File was held, not applied.",
		excerpt: "x-card-signature: ed25519:…  (mismatch vs body hash)",
		recommendation: "Retry the upload from the vendor source. If you pasted this yourself, re-copy the file — it may have been truncated in transit.",
		honestyNote: "Grok’s current API path is unchanged. A bad card does not lower or raise the score."
	}
};
function parseUpload(text) {
	const raw = text.trim();
	if (raw.length < 12) return {
		ok: false,
		title: "Upload too small",
		error: "Nothing to inspect. Paste a model card, changelog, or policy excerpt."
	};
	const lower = raw.toLowerCase();
	const claimsSwarmOnWeb = /\bswarm\b/.test(lower) && /\b(true|yes|enabled)\b/.test(lower) && /(claude\.ai|chatgpt|grok\.com|gemini app|le chat)/.test(lower);
	const truncated = raw.endsWith("…") || raw.endsWith("...") || /\b(tbd|lorem|TODO)\b/.test(raw) || raw.length < 80;
	if (claimsSwarmOnWeb) return {
		ok: false,
		title: "Rejected: swarm claimed on a consumer website",
		error: "Consumer chat UIs do not grow a swarm because a file says so.",
		payload: {
			checksum: `sha256:local-${raw.length.toString(16)}`,
			error: "The upload asserts swarming on a single-assistant website. ALGM will not apply that flag.",
			excerpt: raw.slice(0, 220),
			recommendation: "Quarantine. If this came from a vendor, treat it as marketing bleed.",
			honestyNote: "Capability honesty: the environment, not the filename, decides what is possible."
		}
	};
	if (truncated) return {
		ok: false,
		title: "Held: upload looks truncated",
		error: "File is too short or ends as a stub. Lazy-loaded for inspection, not applied.",
		payload: {
			checksum: `sha256:local-${raw.length.toString(16)}`,
			error: "Truncated or placeholder upload.",
			excerpt: raw.slice(0, 220),
			recommendation: "Retry with the full document, or quarantine and keep current scores.",
			honestyNote: "Partial files do not get to rewrite the catalog."
		}
	};
	return {
		ok: true,
		title: "Upload accepted as a note",
		payload: {
			checksum: `sha256:local-${raw.length.toString(16)}`,
			error: "No contradiction detected. Stored as an inspected note — catalog not auto-patched.",
			excerpt: raw.slice(0, 220),
			recommendation: "Clear it if it was just a note. ALGM still will not hot-patch capabilities from a paste.",
			honestyNote: "Human review stays in the loop. That is intentional."
		}
	};
}
var TEMPLATES = [
	{
		modelId: "claude-opus-4",
		envId: "claude-web",
		claimedOrigin: "Anthropic · United States",
		observedPath: [
			"This device",
			"Edge US-East",
			"AWS us-east-1",
			"Anthropic control plane"
		],
		honesty: 74,
		note: "Path matches the consumer website. Training opt-out is on you.",
		drift: false
	},
	{
		modelId: "grok-4.5",
		envId: "grok-api",
		claimedOrigin: "Colossus · Memphis",
		observedPath: [
			"This device",
			"xAI API edge",
			"Colossus Memphis"
		],
		honesty: 84,
		note: "API path is the one you configured. No unexpected hop.",
		drift: false
	},
	{
		modelId: "gpt-5",
		envId: "chatgpt",
		claimedOrigin: "OpenAI · US",
		observedPath: [
			"This device",
			"ChatGPT edge",
			"Azure mixed region",
			"OpenAI"
		],
		honesty: 62,
		note: "Observed Azure hop is allowed by the product, not disclosed in the tab UI.",
		drift: true
	},
	{
		modelId: "llama-70b-local",
		envId: "ollama",
		claimedOrigin: "This device",
		observedPath: ["This device"],
		honesty: 97,
		note: "No outbound inference. Tools are idle.",
		drift: false
	},
	{
		modelId: "deepseek-v3",
		envId: "deepseek-chat",
		claimedOrigin: "DeepSeek (unspecified region on the site)",
		observedPath: [
			"This device",
			"Public edge",
			"Hosted PRC infrastructure"
		],
		honesty: 28,
		note: "Claimed origin was vague. Observed path is hosted PRC. Drift flagged.",
		drift: true
	},
	{
		modelId: "gemini-2.5",
		envId: "gemini-app",
		claimedOrigin: "Google",
		observedPath: [
			"This device",
			"Google front door",
			"Multi-region"
		],
		honesty: 58,
		note: "Region is Google’s choice, not yours. Vertex would pin it.",
		drift: true
	},
	{
		modelId: "mistral-large",
		envId: "mistral-api",
		claimedOrigin: "Mistral · EU",
		observedPath: [
			"This device",
			"Mistral EU edge",
			"La Plateforme"
		],
		honesty: 87,
		note: "Default residency is EU. No unexpected hop off-continent.",
		drift: false
	},
	{
		modelId: "qwen-local",
		envId: "qwen-local",
		claimedOrigin: "This device",
		observedPath: ["This device"],
		honesty: 96,
		note: "Local weights. Hosted Qwen Chat is a different product.",
		drift: false
	},
	{
		modelId: "claude-sonnet-4",
		envId: "sonnet-api",
		claimedOrigin: "Anthropic API · United States",
		observedPath: [
			"This device",
			"Anthropic API edge",
			"AWS us-east-1"
		],
		honesty: 86,
		note: "API path. Zero-training default holds.",
		drift: false
	}
];
function seedSessions(now = Date.now()) {
	return TEMPLATES.map((t, i) => {
		const model = getModel(t.modelId);
		const env = getEnv(t.modelId, t.envId);
		return {
			...t,
			claimedOrigin: t.claimedOrigin || model?.origin || "Unknown",
			id: `sess-${t.modelId}-${i}`,
			at: now - (i * 7 + 3) * 60 * 1e3,
			honesty: env?.data.honesty ?? t.honesty
		};
	});
}
function liveAgents() {
	return ALL_MODEL_IDS.map((id) => {
		const model = getModel(id);
		if (!model) return null;
		return {
			model,
			env: model.environments.find((e) => e.id === model.defaultEnv) ?? model.environments[0]
		};
	}).filter((x) => Boolean(x));
}
function fresh() {
	return {
		verdicts: [],
		lastVerdictId: void 0,
		investigations: seedInvestigations(DEMO_NOW),
		payloads: {},
		sessions: seedSessions(DEMO_NOW),
		progress: {}
	};
}
var useAlgm = create()(persist((set, get) => ({
	hydrated: false,
	...fresh(),
	runAdvise: (query) => {
		const v = advise(query);
		set((s) => ({
			verdicts: [v, ...s.verdicts].slice(0, 24),
			lastVerdictId: v.id
		}));
		return v;
	},
	rememberVerdict: (v) => set((s) => ({
		verdicts: [v, ...s.verdicts.filter((x) => x.id !== v.id)].slice(0, 24),
		lastVerdictId: v.id
	})),
	inspect: async (id) => {
		set((s) => ({ investigations: s.investigations.map((i) => i.id === id ? {
			...i,
			status: "inspecting"
		} : i) }));
		await new Promise((r) => setTimeout(r, 700));
		const existing = get().payloads[id] ?? PAYLOADS[id];
		if (!existing) {
			set((s) => ({ investigations: s.investigations.map((i) => i.id === id ? {
				...i,
				status: "held"
			} : i) }));
			return;
		}
		set((s) => ({
			payloads: {
				...s.payloads,
				[id]: existing
			},
			investigations: s.investigations.map((i) => i.id === id ? {
				...i,
				status: "inspected"
			} : i)
		}));
		return existing;
	},
	resolveInv: (id, status) => set((s) => ({ investigations: s.investigations.map((i) => i.id === id ? {
		...i,
		status
	} : i) })),
	ingestUpload: (text) => {
		const parsed = parseUpload(text);
		const inv = {
			id: crypto.randomUUID(),
			title: parsed.title,
			source: "Manual upload",
			kind: "upload",
			failedAt: Date.now(),
			bytesHeld: new TextEncoder().encode(text).length,
			status: parsed.ok ? "inspected" : "held",
			stage: parsed.ok ? "note.accepted" : "lazyload.held"
		};
		set((s) => ({
			investigations: [inv, ...s.investigations],
			payloads: parsed.payload ? {
				...s.payloads,
				[inv.id]: parsed.payload
			} : s.payloads
		}));
		return inv;
	},
	markLesson: (slug, status) => set((s) => ({ progress: {
		...s.progress,
		[slug]: status
	} })),
	resetDemo: () => set({
		...fresh(),
		hydrated: true
	})
}), {
	name: "algm-v2",
	skipHydration: true,
	partialize: (s) => ({
		verdicts: s.verdicts,
		lastVerdictId: s.lastVerdictId,
		investigations: s.investigations,
		payloads: s.payloads,
		sessions: s.sessions,
		progress: s.progress
	}),
	onRehydrateStorage: () => (state) => {
		if (state) state.hydrated = true;
	}
}));
var PRIMARY = [
	{
		to: "/",
		label: "Command",
		icon: LayoutGrid
	},
	{
		to: "/advisor",
		label: "Advisor",
		icon: Compass
	},
	{
		to: "/honesty",
		label: "Honesty",
		icon: Shield
	},
	{
		to: "/learn",
		label: "Learn",
		icon: BookOpen
	}
];
var MORE = [
	{
		to: "/rules",
		label: "Rules",
		icon: Scale
	},
	{
		to: "/stack",
		label: "Stack",
		icon: Layers
	},
	{
		to: "/watch",
		label: "Watch",
		icon: Radar
	}
];
function usePath() {
	return useRouterState({ select: (s) => s.location.pathname });
}
function NavLink({ to, label, icon: Icon, rail }) {
	const path = usePath();
	const active = to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-3 rounded-lg transition-colors duration-150", rail ? "h-11 px-3 text-sm" : "h-12 min-w-0 flex-1 flex-col justify-center gap-0.5 px-1 text-xs tracking-wide", active ? "bg-raised text-fg" : "text-muted hover:bg-raised/70 hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			strokeWidth: 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn(!rail && "truncate"),
			children: label
		})]
	});
}
function AppShell({ children }) {
	const held = useAlgm((s) => s.investigations.filter((i) => i.status === "held" || i.status === "inspecting").length);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const path = usePath();
	(0, import_react.useEffect)(() => {
		useAlgm.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setMenu(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-52 flex-col border-r border-line bg-bg/80 px-3 py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-2.5 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatticeMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none tracking-tight",
							children: "ALGM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs tracking-[0.14em] text-muted uppercase",
							children: "On-device"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: [
							PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								rail: true,
								...item
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-line" }),
							MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								rail: true,
								...item
							}, item.to))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesLine, { className: "px-2" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-sm md:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatticeMark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg leading-none",
							children: "ALGM"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/rules",
						className: "ml-auto text-[0.625rem] tracking-[0.08em] text-muted uppercase",
						children: "No gates"
					}),
					held > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/watch",
						className: "rounded-full bg-warn/15 px-2 py-1 text-xs text-warn tabular-nums",
						children: [held, " held"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:pl-52",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-6xl px-4 pt-5 pb-28 md:px-8 md:pt-8 md:pb-12",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-bg/95 px-1 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] md:hidden",
				children: [PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...item }, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open: menu,
					onOpenChange: setMenu,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 text-xs tracking-wide text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" }), "More"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "bottom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "pr-10",
							children: "More"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-2",
							children: [MORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "flex h-12 items-center gap-3 rounded-xl bg-raised px-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 text-accent" }),
									item.label,
									item.to === "/watch" && held > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto text-warn tabular-nums",
										children: [held, " held"]
									})
								]
							}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "mt-2",
								onClick: () => useAlgm.getState().resetDemo(),
								children: "Reset on-device state"
							})]
						})]
					})]
				})]
			})
		]
	});
}
function PageHeader({ kicker, title, lede, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "rise mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl",
					children: title
				}),
				lede && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
					children: lede
				})
			]
		}), action]
	});
}
//#endregion
export { trainingLabel as _, LivePip as a, RULES_LINE as c, cn as d, formatBytes as f, timeAgo as g, liveAgents as h, HonestyBar as i, RulesGrid as l, getModel as m, Button as n, MODELS as o, getEnv as p, CAPABILITIES as r, PageHeader as s, AppShell as t, adviseStructured as u, useAlgm as v };
