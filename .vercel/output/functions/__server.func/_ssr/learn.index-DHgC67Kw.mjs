import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as getModel, s as PageHeader, t as AppShell, v as useAlgm } from "./app-shell-CVvpu2kp.mjs";
import { t as Badge } from "./badge-c9OtsAPA.mjs";
import { t as LESSONS } from "./lessons-DfJKw1T5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn.index-DHgC67Kw.js
var import_jsx_runtime = require_jsx_runtime();
function Learn() {
	const progress = useAlgm((s) => s.progress);
	const done = LESSONS.filter((l) => progress[l.slug] === "done").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Learn",
		title: "Get more out of the stack. Leak less while you do it.",
		lede: "Short briefings against every door in the atlas. ALGM is a teacher with a catalog — not a cop, not a VPN, not a gate.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted tabular-nums",
			children: [
				done,
				"/",
				LESSONS.length,
				" complete"
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: LESSONS.map((lesson) => {
			const status = progress[lesson.slug];
			const applies = lesson.applies;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/learn/$slug",
				params: { slug: lesson.slug },
				className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] transition-colors duration-150 hover:bg-raised",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: lesson.kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-faint tabular-nums",
								children: [lesson.minutes, " min"]
							}),
							status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "good",
								children: "Read"
							}),
							status === "started" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warn",
								children: "Opened"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl leading-tight tracking-tight",
						children: lesson.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["Applies to ", applies.map((id) => getModel(id)?.short ?? id).join(", ")]
					})
				]
			}, lesson.slug);
		})
	})] });
}
//#endregion
export { Learn as component };
