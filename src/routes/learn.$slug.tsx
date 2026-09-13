import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLesson, LESSONS } from "@/lib/lessons";
import { useAlgm } from "@/lib/store";

export const Route = createFileRoute("/learn/$slug")({
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  const mark = useAlgm((s) => s.markLesson);
  const progress = useAlgm((s) => s.progress[slug]);

  useEffect(() => {
    if (lesson && progress !== "done") mark(lesson.slug, "started");
  }, [lesson, mark, progress]);

  if (!lesson) {
    return (
      <AppShell>
        <h1 className="font-display text-3xl">No briefing with that name.</h1>
        <Button className="mt-6" asChild>
          <Link to="/learn">All briefings</Link>
        </Button>
      </AppShell>
    );
  }

  const idx = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const next = LESSONS[idx + 1];

  return (
    <AppShell>
      <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
        Learn · {lesson.kicker}
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        {lesson.title}
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <Badge>{lesson.minutes} min</Badge>
        {progress === "done" && <Badge tone="good">Complete</Badge>}
      </div>

      <div className="mt-8 max-w-2xl space-y-5">
        {lesson.body.map((p) => (
          <p key={p.slice(0, 48)} className="text-base leading-relaxed text-muted">
            {p}
          </p>
        ))}
        <blockquote className="rounded-2xl bg-surface px-4 py-4 shadow-[0_0_0_1px_var(--color-line)]">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Takeaway</p>
          <p className="mt-2 font-display text-xl leading-snug text-fg">{lesson.takeaway}</p>
        </blockquote>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => mark(lesson.slug, "done")}>Mark complete</Button>
        <Button variant="secondary" asChild>
          <Link to="/learn">All briefings</Link>
        </Button>
        {next && (
          <Button variant="outline" asChild>
            <Link to="/learn/$slug" params={{ slug: next.slug }}>
              Next: {next.title}
            </Link>
          </Button>
        )}
      </div>
    </AppShell>
  );
}
