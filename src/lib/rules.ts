export const RULES = [
  {
    id: "no-gates",
    numeral: "01",
    title: "No gates",
    short: "ALGM never locks a door.",
    body: "It will not hide a model, demand a toggle, or refuse to score a path. If this version of Claude on claude.ai cannot swarm, ALGM says so and names another door. You can still open the website. That is your call. ALGM is not a cop and not a paywall.",
  },
  {
    id: "no-off",
    numeral: "02",
    title: "No off",
    short: "Honesty cannot be switched off.",
    body: "Watch, the origin ledger, and the advisor stay on. There is no pause, no kill switch, no “don’t show this again.” Models cannot be toggled out of the atlas. If you do not want the score, close the app.",
  },
  {
    id: "no-craziness",
    numeral: "03",
    title: "No craziness",
    short: "No silent updates. No dark patterns. No pretend swarms.",
    body: "A consumer chat box is one assistant. A failed model card is held, not applied. ALGM does not encrypt, tunnel, or block traffic. It tells you the path in plain language. That is the whole of it.",
  },
] as const;

export const RULES_LINE = "No gates · No off · No craziness";
