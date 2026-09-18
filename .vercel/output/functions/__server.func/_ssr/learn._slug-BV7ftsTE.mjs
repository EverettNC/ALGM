import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Route } from "./router-Bb0aNJHb.mjs";
import { n as Button, t as AppShell, v as useAlgm } from "./app-shell-RnS5hGb-.mjs";
import { t as Badge } from "./badge-D0dzi41b.mjs";
import { n as getLesson, t as LESSONS } from "./lessons-DfJKw1T5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn._slug-BV7ftsTE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonPage() {
	const { slug } = Route.useParams();
	const lesson = getLesson(slug);
	const mark = useAlgm((s) => s.markLesson);
	const progress = useAlgm((s) => s.progress[slug]);
	(0, import_react.useEffect)(() => {
		if (lesson && progress !== "done") mark(lesson.slug, "started");
	}, [
		lesson,
		mark,
		progress
	]);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "No briefing with that name."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "mt-6",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/learn",
			children: "All briefings"
		})
	})] });
	const idx = LESSONS.findIndex((l) => l.slug === lesson.slug);
	const next = LESSONS[idx + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
			children: ["Learn · ", lesson.kicker]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-3xl font-display text-3xl leading-tight tracking-tight sm:text-4xl",
			children: lesson.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [lesson.minutes, " min"] }), progress === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "good",
				children: "Complete"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 max-w-2xl space-y-5",
			children: [lesson.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-relaxed text-muted",
				children: p
			}, p.slice(0, 48))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "rounded-2xl bg-surface px-4 py-4 shadow-[0_0_0_1px_var(--color-line)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.14em] text-muted uppercase",
					children: "Takeaway"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl leading-snug text-fg",
					children: lesson.takeaway
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => mark(lesson.slug, "done"),
					children: "Mark complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						children: "All briefings"
					})
				}),
				next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn/$slug",
						params: { slug: next.slug },
						children: ["Next: ", next.title]
					})
				})
			]
		})
	] });
}
//#endregion
export { LessonPage as component };
