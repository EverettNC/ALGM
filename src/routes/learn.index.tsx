import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { getModel } from "@/lib/catalog";
import { LESSONS } from "@/lib/lessons";
import { useAlgm } from "@/lib/store";

export const Route = createFileRoute("/learn/")({ component: Learn });

function Learn() {
  const progress = useAlgm((s) => s.progress);
  const done = LESSONS.filter((l) => progress[l.slug] === "done").length;

  return (
    <AppShell>
      <PageHeader
        kicker="Learn"
        title="Get more out of the stack. Leak less while you do it."
        lede="Short briefings against every door in the atlas. ALGM is a teacher with a catalog — not a cop, not a VPN, not a gate."
        action={
          <p className="text-xs text-muted tabular-nums">
            {done}/{LESSONS.length} complete
          </p>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {LESSONS.map((lesson) => {
          const status = progress[lesson.slug];
          const applies = lesson.applies;
          return (
            <Link
              key={lesson.slug}
              to="/learn/$slug"
              params={{ slug: lesson.slug }}
              className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] transition-colors duration-150 hover:bg-raised"
            >
              <div className="flex items-center gap-2">
                <Badge tone="accent">{lesson.kicker}</Badge>
                <span className="text-xs text-faint tabular-nums">{lesson.minutes} min</span>
                {status === "done" && <Badge tone="good">Read</Badge>}
                {status === "started" && <Badge tone="warn">Opened</Badge>}
              </div>
              <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight">
                {lesson.title}
              </h2>
              <p className="mt-2 text-xs text-muted">
                Applies to {applies.map((id) => getModel(id)?.short ?? id).join(", ")}
              </p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
