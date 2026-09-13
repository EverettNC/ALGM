import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as trainingLabel, a as LivePip, g as timeAgo, h as liveAgents, i as HonestyBar, m as getModel, p as getEnv, s as PageHeader, t as AppShell, v as useAlgm } from "./app-shell-DO0gtrE1.mjs";
import { t as Badge } from "./badge-CZ-GmWbz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/honesty-DDh-H_Ou.js
var import_jsx_runtime = require_jsx_runtime();
function Honesty() {
	const sessions = useAlgm((s) => s.sessions);
	const agents = liveAgents();
	const drift = sessions.filter((s) => s.drift);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Honesty",
			title: "Where the agent is — and where the words go.",
			lede: "ALGM does not protect the data. It tells you the path: claimed origin, observed hops, training posture, and whether that matches the tab you opened. The ledger stays on. There is no pause."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-2 mb-8 overflow-x-auto rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.6875rem] tracking-[0.14em] text-muted uppercase",
					children: "Origin lattice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex min-w-[36rem] items-stretch gap-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
							title: "This device",
							sub: "ALGM · localStorage",
							live: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
							title: "Edge",
							sub: "CDN / API front door"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid flex-1 grid-cols-2 gap-2",
							children: agents.map(({ model, env }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-raised px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium",
									children: model.short
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[0.625rem] text-faint",
									children: env.facility
								})]
							}, model.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-faint",
					children: "Geometric, not a map. Every door in the atlas — none of them can be switched off."
				})
			]
		}),
		drift.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Drift"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Claimed origin does not match the observed path."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3",
					children: drift.map((s) => {
						const model = getModel(s.modelId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-raised p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: model?.short
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "bad",
										children: ["Honesty ", s.honesty]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-muted",
									children: s.note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Path, {
									claimed: s.claimedOrigin,
									hops: s.observedPath
								})
							]
						}, s.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: "Session ledger"
			}), sessions.map((s) => {
				const model = getModel(s.modelId);
				const env = getEnv(s.modelId, s.envId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-medium",
									children: [
										model?.short,
										" · ",
										env?.label
									]
								}),
								s.drift ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "bad",
									children: "Drift"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "good",
									children: "Match"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-[0.6875rem] text-faint tabular-nums",
									children: timeAgo(s.at)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Path, {
							claimed: s.claimedOrigin,
							hops: s.observedPath
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyBar, {
							className: "mt-3",
							value: s.honesty
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted",
							children: s.note
						}),
						env && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[0.6875rem] text-faint",
							children: [trainingLabel(env.data.training), env.data.subprocessors.length ? ` · ${env.data.subprocessors.join(" · ")}` : " · no subprocessors"]
						})
					]
				}, s.id);
			})]
		})
	] });
}
function Node({ title, sub, live }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-36 shrink-0 rounded-xl bg-raised px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-xs font-medium",
			children: [live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePip, {}), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[0.625rem] text-faint",
			children: sub
		})]
	});
}
function Rail() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-8 shrink-0 items-center",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-line-strong" })
	});
}
function Path({ claimed, hops }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[0.625rem] tracking-[0.12em] text-faint uppercase",
			children: ["Claimed · ", claimed]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted",
			children: hops.join(" → ")
		})]
	});
}
//#endregion
export { Honesty as component };
