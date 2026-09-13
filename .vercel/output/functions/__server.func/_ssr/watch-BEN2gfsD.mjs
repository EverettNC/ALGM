import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as formatBytes, g as timeAgo, n as Button, s as PageHeader, t as AppShell, v as useAlgm } from "./app-shell-DO0gtrE1.mjs";
import { t as Badge } from "./badge-CZ-GmWbz.mjs";
import { t as Textarea } from "./textarea-Q1D2Cx1-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-BEN2gfsD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	held: "warn",
	inspecting: "accent",
	inspected: "mute",
	cleared: "good",
	quarantined: "bad"
};
function Watch() {
	const items = useAlgm((s) => s.investigations);
	const payloads = useAlgm((s) => s.payloads);
	const inspect = useAlgm((s) => s.inspect);
	const resolve = useAlgm((s) => s.resolveInv);
	const ingest = useAlgm((s) => s.ingestUpload);
	const [paste, setPaste] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)();
	const held = items.filter((i) => i.status === "held" || i.status === "inspecting").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Watch",
			title: "Failed updates stay lazy. You open them.",
			lede: "If a model card, policy PDF, or capability flag arrives broken — truncated, unsigned, or claiming Claude can swarm on the website — ALGM holds the stub. The payload is not parsed until you investigate.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted tabular-nums",
				children: [held, " on the pad"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Manual upload"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Paste a changelog, model card, or policy excerpt. Contradictions and stubs are held."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3",
					value: paste,
					onChange: (e) => setPaste(e.target.value),
					placeholder: "{\"env\":\"claude.ai\",\"capabilities\":{\"swarm\":true}}"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "secondary",
					onClick: () => {
						if (!paste.trim()) return;
						const inv = ingest(paste);
						setNotice(inv.title);
						setPaste("");
					},
					children: "Ingest on-device"
				}),
				notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-accent",
					children: notice
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-4",
			children: items.map((item) => {
				const payload = payloads[item.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: TONE[item.status],
									children: item.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: item.kind }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[0.6875rem] text-faint tabular-nums",
									children: [
										formatBytes(item.bytesHeld),
										" · ",
										timeAgo(item.failedAt)
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl leading-snug",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-[0.6875rem] text-muted",
							children: [
								item.source,
								" · ",
								item.stage
							]
						}),
						payload ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-raised p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[0.6875rem] text-faint",
									children: payload.checksum
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-fg",
									children: payload.error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "mt-3 overflow-x-auto text-[0.6875rem] leading-relaxed text-muted whitespace-pre-wrap",
									children: payload.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: payload.recommendation
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-faint",
									children: payload.honestyNote
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Payload not loaded. Investigate to lazy-read the held file."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								item.status === "held" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => inspect(item.id),
									children: "Investigate"
								}),
								item.status === "inspecting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									disabled: true,
									variant: "secondary",
									children: "Loading payload…"
								}),
								(item.status === "inspected" || item.status === "held") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => resolve(item.id, "cleared"),
									children: "Clear"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "danger",
									onClick: () => resolve(item.id, "quarantined"),
									children: "Quarantine"
								})] })
							]
						})
					]
				}, item.id);
			})
		})
	] });
}
//#endregion
export { Watch as component };
