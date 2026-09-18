import { create } from "zustand";
import { persist } from "zustand/middleware";
import { advise } from "./advisor";
import { fetchHonestySessions, type HonestyFeed } from "./honesty-local";
import { parseUpload } from "./investigations";
import type { HonestySession, Investigation, Payload, Verdict } from "./types";

type AlgmState = {
  hydrated: boolean;
  verdicts: Verdict[];
  lastVerdictId?: string;
  investigations: Investigation[];
  payloads: Record<string, Payload>;
  /** Observed by Honesty Local on this computer. Never persisted, never seeded. */
  sessions: HonestySession[];
  feed: HonestyFeed;
  progress: Record<string, "started" | "done">;
  runAdvise: (query: string) => Verdict;
  rememberVerdict: (v: Verdict) => void;
  inspect: (id: string) => Payload | undefined;
  resolveInv: (id: string, status: "cleared" | "quarantined") => void;
  ingestUpload: (text: string) => Investigation;
  refreshSessions: () => Promise<void>;
  markLesson: (slug: string, status: "started" | "done") => void;
  clearDevice: () => void;
};

function empty() {
  return {
    verdicts: [] as Verdict[],
    lastVerdictId: undefined as string | undefined,
    investigations: [] as Investigation[],
    payloads: {} as Record<string, Payload>,
    sessions: [] as HonestySession[],
    feed: { state: "idle" } as HonestyFeed,
    progress: {} as Record<string, "started" | "done">,
  };
}

export const useAlgm = create<AlgmState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...empty(),
      runAdvise: (query) => {
        const v = advise(query);
        set((s) => ({
          verdicts: [v, ...s.verdicts].slice(0, 24),
          lastVerdictId: v.id,
        }));
        return v;
      },
      rememberVerdict: (v) =>
        set((s) => ({
          verdicts: [v, ...s.verdicts.filter((x) => x.id !== v.id)].slice(0, 24),
          lastVerdictId: v.id,
        })),
      // The payload was stored when the item was ingested. Inspecting reveals
      // it; it does not fetch, wait, or invent one.
      inspect: (id) => {
        const payload = get().payloads[id];
        set((s) => ({
          investigations: s.investigations.map((i) =>
            i.id === id ? { ...i, status: payload ? "inspected" : "held" } : i,
          ),
        }));
        return payload;
      },
      resolveInv: (id, status) =>
        set((s) => ({
          investigations: s.investigations.map((i) =>
            i.id === id ? { ...i, status } : i,
          ),
        })),
      ingestUpload: (text) => {
        const parsed = parseUpload(text);
        const inv: Investigation = {
          id: crypto.randomUUID(),
          title: parsed.title,
          source: "Manual upload",
          kind: "upload",
          failedAt: Date.now(),
          bytesHeld: new TextEncoder().encode(text).length,
          status: parsed.ok ? "inspected" : "held",
          stage: parsed.ok ? "note.accepted" : "lazyload.held",
        };
        set((s) => ({
          investigations: [inv, ...s.investigations],
          payloads: parsed.payload
            ? { ...s.payloads, [inv.id]: parsed.payload }
            : s.payloads,
        }));
        return inv;
      },
      refreshSessions: async () => {
        const { feed, sessions } = await fetchHonestySessions();
        set({ feed, sessions });
      },
      markLesson: (slug, status) =>
        set((s) => ({ progress: { ...s.progress, [slug]: status } })),
      clearDevice: () => set({ ...empty(), hydrated: true }),
    }),
    {
      name: "algm-v3",
      skipHydration: true,
      partialize: (s) => ({
        verdicts: s.verdicts,
        lastVerdictId: s.lastVerdictId,
        investigations: s.investigations,
        payloads: s.payloads,
        progress: s.progress,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
