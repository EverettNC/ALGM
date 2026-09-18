import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { r as Route$7 } from "./router-Bim0Ysaa.mjs";
import { d as cn, i as HonestyBar, m as getModel, n as Button, o as MODELS, p as getEnv, r as CAPABILITIES, s as PageHeader, t as AppShell, u as adviseStructured, v as useAlgm } from "./app-shell-DO0gtrE1.mjs";
import { t as Badge } from "./badge-CZ-GmWbz.mjs";
import { t as Textarea } from "./textarea-Q1D2Cx1-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advisor-CTuarhee.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var explainVerdict = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("93838782b6c372849ca0d33d3295d56e3be52f34cf350fd2be439d011a9bd3d9"));
var KIND = {
	allowed: {
		label: "Allowed",
		tone: "good"
	},
	limited: {
		label: "Limited",
		tone: "warn"
	},
	blocked: {
		label: "Not this door",
		tone: "bad"
	},
	privacy: {
		label: "Path",
		tone: "accent"
	},
	unknown: {
		label: "Unmapped",
		tone: "mute"
	}
};
function VerdictCard({ verdict, explain }) {
	const meta = KIND[verdict.kind];
	const model = verdict.modelId ? getModel(verdict.modelId) : void 0;
	const env = verdict.modelId && verdict.envId ? getEnv(verdict.modelId, verdict.envId) : void 0;
	const [note, setNote] = (0, import_react.useState)();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)();
	async function ask() {
		setBusy(true);
		setErr(void 0);
		const res = await explainVerdict({ data: {
			query: verdict.query,
			headline: verdict.headline,
			body: verdict.body,
			teach: verdict.teach
		} });
		setBusy(false);
		if (!res.ok) setErr(res.error);
		else setNote(res.text);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: meta.tone,
						children: meta.label
					}),
					verdict.capability && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: CAPABILITIES[verdict.capability].label }),
					model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [model.short, env ? ` · ${env.label}` : ""]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl leading-tight tracking-tight",
				children: verdict.headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: verdict.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-fg",
				children: verdict.teach
			}),
			verdict.alternatives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.14em] text-muted uppercase",
					children: "Other doors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-2",
					children: verdict.alternatives.map((a) => {
						const m = getModel(a.modelId);
						const e = getEnv(a.modelId, a.envId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										m?.short,
										" · ",
										e?.label
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: a.level === "yes" ? "good" : "warn",
									children: a.level === "yes" ? "Ready" : "Partial"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted",
								children: a.why
							})]
						}, `${a.modelId}-${a.envId}`);
					})
				})]
			}),
			verdict.steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-muted",
				children: verdict.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			}),
			env && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Honesty ", env.data.honesty] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/honesty",
							className: "text-accent hover:underline",
							children: "Full path"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyBar, { value: env.data.honesty }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-faint",
						children: verdict.honestyNote
					})
				]
			}),
			explain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-t border-line pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: ask,
						disabled: busy,
						children: busy ? "Asking Grok…" : "Explain with Grok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-faint",
						children: "This one step leaves the device — it sends the verdict to xAI. Everything else in ALGM stays local."
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-bad",
						children: err
					}),
					note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted whitespace-pre-wrap",
						children: note
					})
				]
			})
		]
	});
}
var EXAMPLES = [
	"swarm with Claude",
	"computer use on ChatGPT",
	"keep this on-device",
	"where does DeepSeek send my data",
	"fine-tune Grok"
];
function Advisor() {
	const { q: incoming } = Route$7.useSearch();
	const runAdvise = useAlgm((s) => s.runAdvise);
	const remember = useAlgm((s) => s.rememberVerdict);
	const verdicts = useAlgm((s) => s.verdicts);
	const lastId = useAlgm((s) => s.lastVerdictId);
	const [text, setText] = (0, import_react.useState)(incoming ?? "swarm with Claude");
	const [modelId, setModelId] = (0, import_react.useState)(MODELS[1]?.id ?? MODELS[0].id);
	const [envId, setEnvId] = (0, import_react.useState)(() => (MODELS[1] ?? MODELS[0]).defaultEnv);
	const [cap, setCap] = (0, import_react.useState)("swarm");
	const ran = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		if (incoming && ran.current !== incoming) {
			ran.current = incoming;
			setText(incoming);
			runAdvise(incoming);
		}
	}, [incoming, runAdvise]);
	const current = (0, import_react.useMemo)(() => verdicts.find((v) => v.id === lastId) ?? verdicts[0], [verdicts, lastId]);
	const envs = getModel(modelId)?.environments ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Advisor",
		title: "Ask before you burn a session.",
		lede: "Name the move and the model. If that version, in that environment, cannot do it — ALGM says so, then points at another door. It will not lock you out of the one that failed."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-2 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.14em] text-muted uppercase",
					children: "Freeform"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3",
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "swarm with Claude",
					"aria-label": "What do you want to do"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: EXAMPLES.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setText(ex);
							runAdvise(ex);
						},
						className: "h-11 rounded-full bg-raised px-3 text-xs text-muted hover:text-fg",
						children: ex
					}, ex))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full sm:w-auto",
					onClick: () => runAdvise(text),
					children: "Check this path"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border-t border-line pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-muted uppercase",
							children: "Or pick it"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
							label: "Model",
							items: MODELS.map((m) => ({
								id: m.id,
								label: m.short
							})),
							value: modelId,
							onChange: (id) => {
								setModelId(id);
								const m = getModel(id);
								setEnvId(m?.defaultEnv ?? m?.environments[0]?.id ?? "");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
							label: "Environment",
							items: envs.map((e) => ({
								id: e.id,
								label: e.label
							})),
							value: envId,
							onChange: setEnvId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipRow, {
							label: "Capability",
							items: Object.keys(CAPABILITIES).map((id) => ({
								id,
								label: CAPABILITIES[id].label
							})),
							value: cap,
							onChange: (id) => setCap(id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "mt-4",
							onClick: () => {
								if (!modelId || !envId) return;
								remember(adviseStructured(modelId, envId, cap));
							},
							children: "Run structured check"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rise-3",
			children: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictCard, {
				verdict: current,
				explain: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl bg-surface p-5 text-sm text-muted shadow-[0_0_0_1px_var(--color-line)]",
				children: "No verdict yet. Try “swarm with Claude”."
			})
		})]
	})] });
}
function ChipRow({ label, items, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(item.id),
				className: cn("h-11 rounded-full px-3 text-xs transition-colors duration-150", value === item.id ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: item.label
			}, item.id))
		})]
	});
}
//#endregion
export { Advisor as component };
