import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as trainingLabel, i as HonestyBar, o as MODELS, r as CAPABILITIES, s as PageHeader, t as AppShell } from "./app-shell-RnS5hGb-.mjs";
import { t as Badge } from "./badge-D0dzi41b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stack-CZX-f0gM.js
var import_jsx_runtime = require_jsx_runtime();
var CAP_ORDER = Object.keys(CAPABILITIES);
function StackPage() {
	const envCount = MODELS.reduce((n, m) => n + m.environments.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Stack",
			title: "Every door ALGM knows.",
			lede: "There is no off switch. Capabilities are per environment — the website and the API are different doors. ALGM will score all of them, whether you use them or not.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted tabular-nums",
				children: [
					MODELS.length,
					" models · ",
					envCount,
					" environments"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5",
			children: MODELS.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight",
							children: model.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: model.provider })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
						children: model.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-[0.6875rem] text-faint",
						children: model.origin
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 lg:grid-cols-2",
					children: model.environments.map((env) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-raised p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: env.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: env.data.honesty >= 80 ? "good" : env.data.honesty >= 60 ? "warn" : "bad",
									children: ["Honesty ", env.data.honesty]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[0.6875rem] text-faint",
								children: [
									env.kind,
									" · ",
									env.facility
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HonestyBar, {
								className: "mt-3",
								value: env.data.honesty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted",
								children: env.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-faint",
								children: [
									trainingLabel(env.data.training),
									" · ",
									env.data.retention
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: CAP_ORDER.map((cap) => {
									const level = env.capabilities[cap] ?? "no";
									if (level === "no") return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: level === "yes" ? "good" : "warn",
										children: [CAPABILITIES[cap].label, level === "limited" ? " · limited" : ""]
									}) }, cap);
								})
							})
						]
					}, env.id))
				})]
			}, model.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-sm text-muted",
			children: [
				"Ready to test a path? Open the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/advisor",
					className: "text-accent hover:underline",
					children: "advisor"
				}),
				"."
			]
		})
	] });
}
//#endregion
export { StackPage as component };
