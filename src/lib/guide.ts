import { createServerFn } from "@tanstack/react-start";

export const explainVerdict = createServerFn({ method: "POST" })
  .validator((input: { query: string; headline: string; body: string; teach: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Guidance from Grok is unavailable in this environment." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 420,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You are the educator inside Advanced Level Guidance Management, an on-device AI honesty and capability guide. Be direct. No fluff, no emoji. Explain why a capability is allowed, limited, or blocked in a specific environment, and how to use the user's actual stack instead. Never claim ALGM tunnels or encrypts traffic. Keep it under 180 words.",
          },
          {
            role: "user",
            content: `User asked: ${data.query}\nVerdict: ${data.headline}\n${data.body}\nTeaching point: ${data.teach}\nExplain like a patient senior engineer.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Grok could not explain this just now (${res.status}).` };
    }

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
