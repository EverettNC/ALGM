import { create } from "zustand";
import { persist } from "zustand/middleware";
import { advise } from "./advisor";
import { DEMO_NOW } from "./clock";
import { parseUpload, PAYLOADS, seedInvestigations } from "./investigations";
import { seedSessions } from "./sessions";
import type { HonestySession, Investigation, Payload, Verdict } from "./types";

type AlgmState = {
  hydrated: boolean;
  verdicts: Verdict[];
  lastVerdictId?: string;
  investigations: Investigation[];
  payloads: Record<string, Payload>;
  sessions: HonestySession[];
  progress: Record<string, "started" | "done">;
  runAdvise: (query: string) => Verdict;
  rememberVerdict: (v: Verdict) => void;
  inspect: (id: string) => Promise<Payload | undefined>;
  resolveInv: (id: string, status: "cleared" | "quarantined") => void;
  ingestUpload: (text: string) => Investigation;
  markLesson: (slug: string, status: "started" | "done") => void;
  resetDemo: () => void;
};

function fresh() {
  return {
    verdicts: [] as Verdict[],
    lastVerdictId: undefined as string | undefined,
    investigations: seedInvestigations(DEMO_NOW),
    payloads: {} as Record<string, Payload>,
    sessions: seedSessions(DEMO_NOW),
    progress: {} as Record<string, "started" | "done">,
  };
}

export const useAlgm = create<AlgmState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...fresh(),
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
      inspect: async (id) => {
        set((s) => ({
          investigations: s.investigations.map((i) =>
            i.id === id ? { ...i, status: "inspecting" } : i,
          ),
        }));
        await new Promise((r) => setTimeout(r, 700));
        const existing = get().payloads[id] ?? PAYLOADS[id];
        if (!existing) {
          set((s) => ({
            investigations: s.investigations.map((i) =>
              i.id === id ? { ...i, status: "held" } : i,
            ),
          }));
          return undefined;
        }
        set((s) => ({
          payloads: { ...s.payloads, [id]: existing },
          investigations: s.investigations.map((i) =>
            i.id === id ? { ...i, status: "inspected" } : i,
          ),
        }));
        return existing;
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
      markLesson: (slug, status) =>
        set((s) => ({ progress: { ...s.progress, [slug]: status } })),
      resetDemo: () => set({ ...fresh(), hydrated: true }),
    }),
    {
      name: "algm-v2",
      skipHydration: true,
      partialize: (s) => ({
        verdicts: s.verdicts,
        lastVerdictId: s.lastVerdictId,
        investigations: s.investigations,
        payloads: s.payloads,
        sessions: s.sessions,
        progress: s.progress,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
