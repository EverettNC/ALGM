import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as RULES_LINE, l as RulesGrid, n as Button, s as PageHeader, t as AppShell } from "./app-shell-RnS5hGb-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-ClUcDi_j.js
var import_jsx_runtime = require_jsx_runtime();
function RulesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Rules",
			title: RULES_LINE,
			lede: "These are not settings. They are not a plan. They cannot be switched off. ALGM sits on this device and tells the truth about the doors you walk through."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesGrid, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
			className: "mt-8 max-w-2xl rounded-2xl bg-surface px-5 py-5 shadow-[0_0_0_1px_var(--color-line)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.14em] text-muted uppercase",
				children: "The contract"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-xl leading-snug text-fg",
				children: "Guidance without a gate. Honesty without an off switch. No theater."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/advisor",
					children: "Ask the advisor"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/learn/$slug",
					params: { slug: "the-rules" },
					children: "Read the briefing"
				})
			})]
		})
	] });
}
//#endregion
export { RulesPage as component };
