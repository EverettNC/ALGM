import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { HonestyBar, LivePip } from "@/components/marks";
import { Badge } from "@/components/ui/badge";
import { getEnv, getModel, trainingLabel } from "@/lib/catalog";
import { liveAgents } from "@/lib/sessions";
import { useAlgm } from "@/lib/store";
import { timeAgo } from "@/lib/utils";

export const Route = createFileRoute("/honesty")({ component: Honesty });

function Honesty() {
  const sessions = useAlgm((s) => s.sessions);
  const agents = liveAgents();
  const drift = sessions.filter((s) => s.drift);

  return (
    <AppShell>
      <PageHeader
        kicker="Honesty"
        title="Where the agent is — and where the words go."
        lede="ALGM does not protect the data. It tells you the path: claimed origin, observed hops, training posture, and whether that matches the tab you opened. The ledger stays on. There is no pause."
      />

      <section className="rise-2 mb-8 overflow-x-auto rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
        <p className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
          Origin lattice
        </p>
        <div className="mt-5 flex min-w-[36rem] items-stretch gap-0">
          <Node title="This device" sub="ALGM · localStorage" live />
          <Rail />
          <Node title="Edge" sub="CDN / API front door" />
          <Rail />
          <div className="grid flex-1 grid-cols-2 gap-2">
            {agents.map(({ model, env }) => (
              <div key={model.id} className="rounded-xl bg-raised px-3 py-2">
                <p className="text-xs font-medium">{model.short}</p>
                <p className="font-mono text-[0.625rem] text-faint">{env.facility}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-faint">
          Geometric, not a map. Every door in the atlas — none of them can be switched off.
        </p>
      </section>

      {drift.length > 0 && (
        <section className="mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
          <h2 className="font-display text-xl">Drift</h2>
          <p className="mt-1 text-sm text-muted">
            Claimed origin does not match the observed path.
          </p>
          <ul className="mt-4 grid gap-3">
            {drift.map((s) => {
              const model = getModel(s.modelId);
              return (
                <li key={s.id} className="rounded-xl bg-raised p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{model?.short}</p>
                    <Badge tone="bad">Honesty {s.honesty}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{s.note}</p>
                  <Path claimed={s.claimedOrigin} hops={s.observedPath} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="grid gap-4">
        <h2 className="font-display text-xl">Session ledger</h2>
        {sessions.map((s) => {
          const model = getModel(s.modelId);
          const env = getEnv(s.modelId, s.envId);
          return (
            <article
              key={s.id}
              className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium">
                  {model?.short} · {env?.label}
                </h3>
                {s.drift ? (
                  <Badge tone="bad">Drift</Badge>
                ) : (
                  <Badge tone="good">Match</Badge>
                )}
                <span className="ml-auto text-[0.6875rem] text-faint tabular-nums">
                  {timeAgo(s.at)}
                </span>
              </div>
              <Path claimed={s.claimedOrigin} hops={s.observedPath} />
              <HonestyBar className="mt-3" value={s.honesty} />
              <p className="mt-2 text-xs leading-relaxed text-muted">{s.note}</p>
              {env && (
                <p className="mt-2 text-[0.6875rem] text-faint">
                  {trainingLabel(env.data.training)}
                  {env.data.subprocessors.length
                    ? ` · ${env.data.subprocessors.join(" · ")}`
                    : " · no subprocessors"}
                </p>
              )}
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}

function Node({
  title,
  sub,
  live,
}: {
  title: string;
  sub: string;
  live?: boolean;
}) {
  return (
    <div className="w-36 shrink-0 rounded-xl bg-raised px-3 py-3">
      <p className="flex items-center gap-2 text-xs font-medium">
        {live && <LivePip />}
        {title}
      </p>
      <p className="mt-1 text-[0.625rem] text-faint">{sub}</p>
    </div>
  );
}

function Rail() {
  return (
    <div className="flex w-8 shrink-0 items-center" aria-hidden="true">
      <div className="h-px w-full bg-line-strong" />
    </div>
  );
}

function Path({ claimed, hops }: { claimed: string; hops: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[0.625rem] tracking-[0.12em] text-faint uppercase">
        Claimed · {claimed}
      </p>
      <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted">
        {hops.join(" → ")}
      </p>
    </div>
  );
}
