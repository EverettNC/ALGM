import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { VerdictCard } from "@/components/verdict-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adviseStructured } from "@/lib/advisor";
import { MODELS, CAPABILITIES, getModel } from "@/lib/catalog";
import { useAlgm } from "@/lib/store";
import type { CapabilityId } from "@/lib/types";
import { cn } from "@/lib/utils";

type Search = { q?: string };

export const Route = createFileRoute("/advisor")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: Advisor,
});

const EXAMPLES = [
  "swarm with Claude",
  "computer use on ChatGPT",
  "keep this on-device",
  "where does DeepSeek send my data",
  "fine-tune Grok",
];

function Advisor() {
  const { q: incoming } = Route.useSearch();
  const runAdvise = useAlgm((s) => s.runAdvise);
  const remember = useAlgm((s) => s.rememberVerdict);
  const verdicts = useAlgm((s) => s.verdicts);
  const lastId = useAlgm((s) => s.lastVerdictId);
  const [text, setText] = useState(incoming ?? "swarm with Claude");
  const [modelId, setModelId] = useState(MODELS[1]?.id ?? MODELS[0].id);
  const [envId, setEnvId] = useState(
    () => (MODELS[1] ?? MODELS[0]).defaultEnv,
  );
  const [cap, setCap] = useState<CapabilityId>("swarm");
  const ran = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (incoming && ran.current !== incoming) {
      ran.current = incoming;
      setText(incoming);
      runAdvise(incoming);
    }
  }, [incoming, runAdvise]);

  const current = useMemo(
    () => verdicts.find((v) => v.id === lastId) ?? verdicts[0],
    [verdicts, lastId],
  );

  const envs = getModel(modelId)?.environments ?? [];

  return (
    <AppShell>
      <PageHeader
        kicker="Advisor"
        title="Ask before you burn a session."
        lede="Name the move and the model. If that version, in that environment, cannot do it — ALGM says so, then points at another door. It will not lock you out of the one that failed."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rise-2 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Freeform</p>
          <Textarea
            className="mt-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="swarm with Claude"
            aria-label="What do you want to do"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setText(ex);
                  runAdvise(ex);
                }}
                className="h-11 rounded-full bg-raised px-3 text-xs text-muted hover:text-fg"
              >
                {ex}
              </button>
            ))}
          </div>
          <Button className="mt-4 w-full sm:w-auto" onClick={() => runAdvise(text)}>
            Check this path
          </Button>

          <div className="mt-8 border-t border-line pt-5">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">Or pick it</p>
            <ChipRow
              label="Model"
              items={MODELS.map((m) => ({
                id: m.id,
                label: m.short,
              }))}
              value={modelId}
              onChange={(id) => {
                setModelId(id);
                const m = getModel(id);
                setEnvId(m?.defaultEnv ?? m?.environments[0]?.id ?? "");
              }}
            />
            <ChipRow
              label="Environment"
              items={envs.map((e) => ({ id: e.id, label: e.label }))}
              value={envId}
              onChange={setEnvId}
            />
            <ChipRow
              label="Capability"
              items={(Object.keys(CAPABILITIES) as CapabilityId[]).map((id) => ({
                id,
                label: CAPABILITIES[id].label,
              }))}
              value={cap}
              onChange={(id) => setCap(id as CapabilityId)}
            />
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                if (!modelId || !envId) return;
                remember(adviseStructured(modelId, envId, cap));
              }}
            >
              Run structured check
            </Button>
          </div>
        </section>

        <div className="rise-3">
          {current ? (
            <VerdictCard verdict={current} explain />
          ) : (
            <div className="rounded-2xl bg-surface p-5 text-sm text-muted shadow-[0_0_0_1px_var(--color-line)]">
              No verdict yet. Try “swarm with Claude”.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function ChipRow({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs text-faint">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "h-11 rounded-full px-3 text-xs transition-colors duration-150",
              value === item.id
                ? "bg-accent text-accent-fg"
                : "bg-raised text-muted hover:text-fg",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
