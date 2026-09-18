import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { f as cn } from "./app-shell-CVvpu2kp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-c9OtsAPA.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		mute: "bg-raised text-muted",
		good: "bg-good/15 text-good",
		warn: "bg-warn/15 text-warn",
		bad: "bg-bad/15 text-bad",
		accent: "bg-accent/15 text-accent"
	} },
	defaultVariants: { tone: "mute" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
//#endregion
export { Badge as t };
