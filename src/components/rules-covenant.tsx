import { Link } from "@tanstack/react-router";
import { RULES, RULES_LINE } from "@/lib/rules";
import { cn } from "@/lib/utils";

export function RulesLine({ className }: { className?: string }) {
  return (
    <Link
      to="/rules"
      className={cn(
        "text-xs leading-relaxed tracking-[0.04em] text-faint hover:text-muted",
        className,
      )}
    >
      {RULES_LINE}
    </Link>
  );
}

export function RulesGrid({ compact }: { compact?: boolean }) {
  return (
    <section
      className={cn("grid gap-3", compact ? "sm:grid-cols-3" : "lg:grid-cols-3")}
      aria-label="The three rules"
    >
      {RULES.map((rule) => (
        <article
          key={rule.id}
          className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5"
        >
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint">
            {rule.numeral}
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight">{rule.title}</h2>
          <p className="mt-2 text-sm font-medium text-fg">{rule.short}</p>
          {!compact && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{rule.body}</p>
          )}
        </article>
      ))}
    </section>
  );
}
