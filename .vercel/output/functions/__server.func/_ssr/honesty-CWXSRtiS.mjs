import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as trainingLabel, a as LivePip, g as timeAgo, h as getModel, i as HonestyBar, m as getEnv, n as Button, s as PageHeader, t as AppShell, v as useAlgm } from "./app-shell-CVvpu2kp.mjs";
import { t as Badge } from "./badge-c9OtsAPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/honesty-CWXSRtiS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REFRESH_MS = 15e3;
function Honesty() {
	const sessions = useAlgm((s) => s.sessions);
	const feed = useAlgm((s) => s.feed);
	const refresh = useAlgm((s) => s.refreshSessions);
	const drift = sessions.filter((s) => s.drift);
	(0, import_react.useEffect)(() => {
		refresh();
		const t = setInterval(() => void refresh(), REFRESH_MS);
		return () => clearInterval(t);
	}, [refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Honesty",
			title: "Where the agent is — and where the words go.",
			lede: "Every session here was observed by Honesty Local, the watcher on this computer. The claim comes from the atlas; the path comes from the wire. ALGM invents nothing: when the watcher is not running, this page is empty and says so.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => void refresh(),
				children: "Refresh"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-2 mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.6875rem] tracking-[0.14em] text-muted uppercase",
					children: "Honesty Local"
				}),
				feed.state === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePip, {}),
						"Connected at ",
						"http://127.0.0.1:8787",
						feed.machine ? ` · ${feed.machine}` : "",
						feed.lastScan ? ` · last scan ${timeAgo(Date.parse(feed.lastScan))}` : ""
					]
				}),
				feed.state === "offline" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-warn",
					children: [
						"Not connected. Honesty Local is not answering at ",
						"http://127.0.0.1:8787",
						" (",
						feed.error,
						"). Start honesty.py on this computer and refresh. Nothing is shown until it does."
					]
				}),
				feed.state === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Checking…"
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
					children: "The atlas claim and the observed path do not agree."
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
										children: model?.short ?? s.modelId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "bad",
										children: "Drift"
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Session ledger"
				}),
				feed.state === "ok" && sessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Honesty Local is connected and reports no model in use or configured right now."
				}),
				sessions.map((s) => {
					const model = getModel(s.modelId);
					const env = s.envId ? getEnv(s.modelId, s.envId) : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-medium",
										children: [model?.short ?? s.modelId, env ? ` · ${env.label}` : " · not in the atlas"]
									}),
									s.drift ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "bad",
										children: "Drift"
									}) : s.scored ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "good",
										children: "Match"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Unscored" }),
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
							s.scored && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyBar, {
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
				})
			]
		})
	] });
}
function Path({ claimed, hops }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[0.625rem] tracking-[0.12em] text-faint uppercase",
			children: ["Claimed · ", claimed]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted",
			children: ["Observed · ", hops.join(" → ")]
		})]
	});
}
//#endregion
export { Honesty as component };
