import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Radar, d as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as LivePip, d as cn, f as formatBytes, g as timeAgo, h as liveAgents, i as HonestyBar, l as RulesGrid, n as Button, s as PageHeader, t as AppShell, v as useAlgm } from "./app-shell-DO0gtrE1.mjs";
import { t as Badge } from "./badge-CZ-GmWbz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BECJBul2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md bg-raised px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", className),
		...props
	});
}
function Command() {
	const navigate = useNavigate();
	const investigations = useAlgm((s) => s.investigations);
	const sessions = useAlgm((s) => s.sessions);
	const verdicts = useAlgm((s) => s.verdicts);
	const [q, setQ] = (0, import_react.useState)("");
	const agents = liveAgents();
	const held = investigations.filter((i) => i.status === "held" || i.status === "inspecting");
	const drift = sessions.filter((s) => s.drift).length;
	function go(raw) {
		const query = (raw ?? q).trim() || "swarm with Claude";
		navigate({
			to: "/advisor",
			search: { q: query }
		});
	}
	function submit(e) {
		e.preventDefault();
		go();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Command",
			title: "Know the door before you walk through it.",
			lede: "ALGM sits on this device and watches every environment it knows — where the agent lives, what it can do, and where a prompt goes. It will not encrypt the path. It will not lock you out. It will not lie about Claude swarming."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesGrid, { compact: true }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "rise-2 mt-8 mb-8 flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "I want to swarm with Claude",
				"aria-label": "What do you want to do",
				className: "sm:flex-1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "sm:w-auto",
				onClick: () => go(),
				children: "Ask the advisor"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-3 mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Doors in the atlas",
					value: String(agents.length),
					hint: "Always on. No toggle."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Honesty drift",
					value: String(drift),
					hint: "Claimed origin ≠ observed path",
					warn: drift > 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Updates held",
					value: String(held.length),
					hint: "Lazy-loaded for inspection",
					warn: held.length > 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise-4 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5 lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Live origin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/honesty",
						className: "text-xs text-accent hover:underline",
						children: "Honesty"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: agents.map(({ model, env }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-raised p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePip, {}), model.short]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs text-muted",
									children: env.facility
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: env.data.honesty >= 80 ? "good" : env.data.honesty >= 60 ? "warn" : "bad",
									children: env.data.honesty
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs tracking-[0.12em] text-faint uppercase",
								children: [
									env.label,
									" · ",
									env.region
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyBar, {
								className: "mt-3",
								value: env.data.honesty
							})
						]
					}, model.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rise-4 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Held for inspection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/watch",
							className: "text-xs text-accent hover:underline",
							children: "Watch"
						})]
					}), held.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No failed updates on the pad."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: held.slice(0, 3).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/watch",
							className: "flex items-start gap-3 rounded-xl bg-raised px-3 py-3 hover:bg-raised/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "mt-0.5 size-4 text-warn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: i.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-faint",
								children: [
									i.source,
									" · ",
									formatBytes(i.bytesHeld),
									" · ",
									timeAgo(i.failedAt)
								]
							})] })]
						}) }, i.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "Last guidance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/advisor",
								className: "text-xs text-accent hover:underline",
								children: "Advisor"
							})]
						}),
						verdicts[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/advisor",
							className: "block rounded-xl bg-raised p-3 hover:bg-raised/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: verdicts[0].headline
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted",
								children: verdicts[0].body
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Try “swarm with Claude” — ALGM will tell you the website cannot, then point at a door that can. It will not lock you out."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/learn",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline",
							children: ["Learn the craft ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
						})
					]
				})]
			})]
		})
	] });
}
function Stat({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.14em] text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 font-display text-3xl tabular-nums ${warn ? "text-warn" : "text-fg"}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-faint",
				children: hint
			})
		]
	});
}
//#endregion
export { Command as component };
