import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { HonestyBar, LivePip } from "@/components/marks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEnv, getModel, trainingLabel } from "@/lib/catalog";
import { HONESTY_LOCAL_URL } from "@/lib/honesty-local";
import { useAlgm } from "@/lib/store";
import { timeAgo } from "@/lib/utils";

export const Route = createFileRoute("/honesty")({ component: Honesty });

const REFRESH_MS = 15_000;

function Honesty() {
  const sessions = useAlgm((s) => s.sessions);
  const feed = useAlgm((s) => s.feed);
  const refresh = useAlgm((s) => s.refreshSessions);
  const drift = sessions.filter((s) => s.drift);

  useEffect(() => {
    void refresh();
    const t = setInterval(() => void refresh(), REFRESH_MS);
    return () => clearInterval(t);
  }, [refresh]);

  return (
    <AppShell>
      <PageHeader
        kicker="Honesty"
        title="Where the agent is — and where the words go."
        lede="Every session here was observed by Honesty Local, the watcher on this computer. The claim comes from the atlas; the path comes from the wire. ALGM invents nothing: when the watcher is not running, this page is empty and says so."
        action={
          <Button variant="secondary" onClick={() => void refresh()}>
            Refresh
          </Button>
        }
      />

      <section className="rise-2 mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
        <p className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Honesty Local</p>
        {feed.state === "ok" && (
          <p className="mt-2 flex items-center gap-2 text-sm">
            <LivePip />
            Connected at {HONESTY_LOCAL_URL}
            {feed.machine ? ` · ${feed.machine}` : ""}
            {feed.lastScan ? ` · last scan ${timeAgo(Date.parse(feed.lastScan))}` : ""}
          </p>
        )}
        {feed.state === "offline" && (
          <p className="mt-2 text-sm text-warn">
            Not connected. Honesty Local is not answering at {HONESTY_LOCAL_URL} ({feed.error}).
            Start honesty.py on this computer and refresh. Nothing is shown until it does.
          </p>
        )}
        {feed.state === "idle" && <p className="mt-2 text-sm text-muted">Checking…</p>}
      </section>

      {drift.length > 0 && (
        <section className="mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
          <h2 className="font-display text-xl">Drift</h2>
          <p className="mt-1 text-sm text-muted">
            The atlas claim and the observed path do not agree.
          </p>
          <ul className="mt-4 grid gap-3">
            {drift.map((s) => {
              const model = getModel(s.modelId);
              return (
                <li key={s.id} className="rounded-xl bg-raised p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{model?.short ?? s.modelId}</p>
                    <Badge tone="bad">Drift</Badge>
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
        {feed.state === "ok" && sessions.length === 0 && (
          <p className="text-sm text-muted">
            Honesty Local is connected and reports no model in use or configured right now.
          </p>
        )}
        {sessions.map((s) => {
          const model = getModel(s.modelId);
          const env = s.envId ? getEnv(s.modelId, s.envId) : undefined;
          return (
            <article
              key={s.id}
              className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium">
                  {model?.short ?? s.modelId}
                  {env ? ` · ${env.label}` : " · not in the atlas"}
                </h3>
                {s.drift ? (
                  <Badge tone="bad">Drift</Badge>
                ) : s.scored ? (
                  <Badge tone="good">Match</Badge>
                ) : (
                  <Badge>Unscored</Badge>
                )}
                <span className="ml-auto text-[0.6875rem] text-faint tabular-nums">
                  {timeAgo(s.at)}
                </span>
              </div>
              <Path claimed={s.claimedOrigin} hops={s.observedPath} />
              {s.scored && <HonestyBar className="mt-3" value={s.honesty} />}
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

function Path({ claimed, hops }: { claimed: string; hops: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[0.625rem] tracking-[0.12em] text-faint uppercase">
        Claimed · {claimed}
      </p>
      <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-muted">
        Observed · {hops.join(" → ")}
      </p>
    </div>
  );
}
