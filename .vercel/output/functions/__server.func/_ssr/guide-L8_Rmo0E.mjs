import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-L8_Rmo0E.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var explainVerdict_createServerFn_handler = createServerRpc({
	id: "93838782b6c372849ca0d33d3295d56e3be52f34cf350fd2be439d011a9bd3d9",
	name: "explainVerdict",
	filename: "src/lib/guide.ts"
}, (opts) => explainVerdict.__executeServer(opts));
var explainVerdict = createServerFn({ method: "POST" }).validator((input) => input).handler(explainVerdict_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Guidance from Grok is unavailable in this environment."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 420,
			temperature: .3,
			messages: [{
				role: "system",
				content: "You are the educator inside Advanced Level Guidance Management, an on-device AI honesty and capability guide. Be direct. No fluff, no emoji. Explain why a capability is allowed, limited, or blocked in a specific environment, and how to use the user's actual stack instead. Never claim ALGM tunnels or encrypts traffic. Keep it under 180 words."
			}, {
				role: "user",
				content: `User asked: ${data.query}\nVerdict: ${data.headline}\n${data.body}\nTeaching point: ${data.teach}\nExplain like a patient senior engineer.`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Grok could not explain this just now (${res.status}).`
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? ""
	};
});
//#endregion
export { explainVerdict_createServerFn_handler };
