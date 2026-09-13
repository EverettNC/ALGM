import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Radar } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { HonestyBar, LivePip } from "@/components/marks";
import { RulesGrid } from "@/components/rules-covenant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { liveAgents } from "@/lib/sessions";
import { useAlgm } from "@/lib/store";
import { formatBytes, timeAgo } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Command });

function Command() {
  const navigate = useNavigate();
  const investigations = useAlgm((s) => s.investigations);
  const sessions = useAlgm((s) => s.sessions);
  const verdicts = useAlgm((s) => s.verdicts);
  const [q, setQ] = useState("");
  const agents = liveAgents();
  const held = investigations.filter((i) => i.status === "held" || i.status === "inspecting");
  const drift = sessions.filter((s) => s.drift).length;

  function go(raw?: string) {
    const query = (raw ?? q).trim() || "swarm with Claude";
    void navigate({ to: "/advisor", search: { q: query } });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    go();
  }

  return (
    <AppShell>
      <PageHeader
        kicker="Command"
        title="Know the door before you walk through it."
        lede="ALGM sits on this device and watches every environment it knows — where the agent lives, what it can do, and where a prompt goes. It will not encrypt the path. It will not lock you out. It will not lie about Claude swarming."
      />

      <RulesGrid compact />

      <form onSubmit={submit} className="rise-2 mt-8 mb-8 flex flex-col gap-3 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="I want to swarm with Claude"
          aria-label="What do you want to do"
          className="sm:flex-1"
        />
        <Button type="button" className="sm:w-auto" onClick={() => go()}>
          Ask the advisor
        </Button>
      </form>

      <section className="rise-3 mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Doors in the atlas" value={String(agents.length)} hint="Always on. No toggle." />
        <Stat
          label="Honesty drift"
          value={String(drift)}
          hint="Claimed origin ≠ observed path"
          warn={drift > 0}
        />
        <Stat
          label="Updates held"
          value={String(held.length)}
          hint="Lazy-loaded for inspection"
          warn={held.length > 0}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rise-4 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl">Live origin</h2>
            <Link to="/honesty" className="text-xs text-accent hover:underline">
              Honesty
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {agents.map(({ model, env }) => (
              <li key={model.id} className="rounded-xl bg-raised p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <LivePip />
                      {model.short}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">{env.facility}</p>
                  </div>
                  <Badge
                    tone={env.data.honesty >= 80 ? "good" : env.data.honesty >= 60 ? "warn" : "bad"}
                  >
                    {env.data.honesty}
                  </Badge>
                </div>
                <p className="mt-2 text-xs tracking-[0.12em] text-faint uppercase">
                  {env.label} · {env.region}
                </p>
                <HonestyBar className="mt-3" value={env.data.honesty} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:col-span-2">
          <section className="rise-4 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Held for inspection</h2>
              <Link to="/watch" className="text-xs text-accent hover:underline">
                Watch
              </Link>
            </div>
            {held.length === 0 ? (
              <p className="text-sm text-muted">No failed updates on the pad.</p>
            ) : (
              <ul className="grid gap-2">
                {held.slice(0, 3).map((i) => (
                  <li key={i.id}>
                    <Link
                      to="/watch"
                      className="flex items-start gap-3 rounded-xl bg-raised px-3 py-3 hover:bg-raised/80"
                    >
                      <Radar className="mt-0.5 size-4 text-warn" />
                      <span>
                        <span className="block text-sm">{i.title}</span>
                        <span className="mt-1 block text-xs text-faint">
                          {i.source} · {formatBytes(i.bytesHeld)} · {timeAgo(i.failedAt)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Last guidance</h2>
              <Link to="/advisor" className="text-xs text-accent hover:underline">
                Advisor
              </Link>
            </div>
            {verdicts[0] ? (
              <Link to="/advisor" className="block rounded-xl bg-raised p-3 hover:bg-raised/80">
                <p className="text-sm font-medium">{verdicts[0].headline}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted">{verdicts[0].body}</p>
              </Link>
            ) : (
              <p className="text-sm text-muted">
                Try “swarm with Claude” — ALGM will tell you the website cannot, then point at a
                door that can. It will not lock you out.
              </p>
            )}
            <Link
              to="/learn"
              className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              Learn the craft <ArrowUpRight className="size-3" />
            </Link>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="text-xs tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className={`mt-2 font-display text-3xl tabular-nums ${warn ? "text-warn" : "text-fg"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-faint">{hint}</p>
    </div>
  );
}
