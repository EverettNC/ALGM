import { createServerFn } from "@tanstack/react-start";

/**
 * Explaining a verdict, without calling out to anybody.
 *
 * This used to POST the user's query to a vendor AI API from product code,
 * which the standing order forbids: no outside system assigned from the
 * product, and no vendor's name on the work.
 *
 * The call is gone. The contract is not — the handler already had a branch for
 * "no key, no guidance" returning `{ ok: false, error }`, and the caller in
 * verdict-card.tsx already renders it. So the shape every caller expects is
 * unchanged; only the network hop is removed.
 *
 * The verdict itself is produced on-device and is what the card shows. This
 * was only ever the optional prose on top of it.
 */
type Guidance = { ok: true; text: string } | { ok: false; error: string };

export const explainVerdict = createServerFn({ method: "POST" })
  .validator((input: { query: string; headline: string; body: string; teach: string }) => input)
  .handler(async (): Promise<Guidance> => {
    // The return type stays the union it always was. Narrowing it to the
    // failure case alone would be honest about today's behaviour and would
    // break every caller that handles the success branch, for no gain.
    return {
      ok: false,
      error: "Extended guidance is off. The verdict above is produced on this device.",
    };
  });
