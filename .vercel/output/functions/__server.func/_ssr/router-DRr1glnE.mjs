import { _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DRr1glnE.js
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
var styles_default = "/assets/styles-B9dLzJl2.css";
var APP_NAME = "Advanced Level Guidance Management";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0b0c0e"
			},
			{
				name: "description",
				content: "On-device guidance for the AI you actually use — agent origin, capability honesty, and where your data goes."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	})
});
var $$splitComponentImporter$8 = () => import("./routes-CMsAFQN0.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./advisor-CGpx-BiF.mjs");
var Route$7 = createFileRoute("/advisor")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./honesty-Czyuy5f0.mjs");
var Route$6 = createFileRoute("/honesty")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./learn-DvEeroQW.mjs");
var Route$5 = createFileRoute("/learn")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./rules-ClUcDi_j.mjs");
var Route$4 = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./stack-CZX-f0gM.mjs");
var Route$3 = createFileRoute("/stack")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./watch-xCBU12FZ.mjs");
var Route$2 = createFileRoute("/watch")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./learn.index-CC5GMmqH.mjs");
var Route$1 = createFileRoute("/learn/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./learn._slug-DkCaOr7t.mjs");
var Route = createFileRoute("/learn/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AdvisorRoute = Route$7.update({
	id: "/advisor",
	path: "/advisor",
	getParentRoute: () => Route$9
});
var HonestyRoute = Route$6.update({
	id: "/honesty",
	path: "/honesty",
	getParentRoute: () => Route$9
});
var LearnRoute = Route$5.update({
	id: "/learn",
	path: "/learn",
	getParentRoute: () => Route$9
});
var RulesRoute = Route$4.update({
	id: "/rules",
	path: "/rules",
	getParentRoute: () => Route$9
});
var StackRoute = Route$3.update({
	id: "/stack",
	path: "/stack",
	getParentRoute: () => Route$9
});
var WatchRoute = Route$2.update({
	id: "/watch",
	path: "/watch",
	getParentRoute: () => Route$9
});
var LearnIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => LearnRoute
});
var LearnRouteChildren = {
	LearnSlugRoute: Route.update({
		id: "/$slug",
		path: "/$slug",
		getParentRoute: () => LearnRoute
	}),
	LearnIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdvisorRoute,
	HonestyRoute,
	LearnRoute: LearnRoute._addFileChildren(LearnRouteChildren),
	RulesRoute,
	StackRoute,
	WatchRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route as n, Route$7 as r, router_exports as t };
