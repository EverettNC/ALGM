import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { HonestyBar } from "@/components/marks";
import { Badge } from "@/components/ui/badge";
import { CAPABILITIES, MODELS, trainingLabel } from "@/lib/catalog";
import type { CapLevel, CapabilityId } from "@/lib/types";

export const Route = createFileRoute("/stack")({ component: StackPage });

const CAP_ORDER = Object.keys(CAPABILITIES) as CapabilityId[];

function StackPage() {
  const envCount = MODELS.reduce((n, m) => n + m.environments.length, 0);

  return (
    <AppShell>
      <PageHeader
        kicker="Stack"
        title="Every door ALGM knows."
        lede="There is no off switch. Capabilities are per environment — the website and the API are different doors. ALGM will score all of them, whether you use them or not."
        action={
          <p className="text-xs text-muted tabular-nums">
            {MODELS.length} models · {envCount} environments
          </p>
        }
      />

      <div className="grid gap-5">
        {MODELS.map((model) => (
          <article
            key={model.id}
            className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl tracking-tight">{model.name}</h2>
                <Badge>{model.provider}</Badge>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {model.summary}
              </p>
              <p className="mt-2 font-mono text-[0.6875rem] text-faint">{model.origin}</p>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {model.environments.map((env) => (
                <div key={env.id} className="rounded-xl bg-raised p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{env.label}</p>
                    <Badge
                      tone={
                        env.data.honesty >= 80
                          ? "good"
                          : env.data.honesty >= 60
                            ? "warn"
                            : "bad"
                      }
                    >
                      Honesty {env.data.honesty}
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-[0.6875rem] text-faint">
                    {env.kind} · {env.facility}
                  </p>
                  <HonestyBar className="mt-3" value={env.data.honesty} />
                  <p className="mt-2 text-xs leading-relaxed text-muted">{env.notes}</p>
                  <p className="mt-2 text-xs text-faint">
                    {trainingLabel(env.data.training)} · {env.data.retention}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {CAP_ORDER.map((cap) => {
                      const level: CapLevel = env.capabilities[cap] ?? "no";
                      if (level === "no") return null;
                      return (
                        <li key={cap}>
                          <Badge tone={level === "yes" ? "good" : "warn"}>
                            {CAPABILITIES[cap].label}
                            {level === "limited" ? " · limited" : ""}
                          </Badge>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Ready to test a path? Open the{" "}
        <Link to="/advisor" className="text-accent hover:underline">
          advisor
        </Link>
        .
      </p>
    </AppShell>
  );
}
