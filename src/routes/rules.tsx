import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { RulesGrid } from "@/components/rules-covenant";
import { Button } from "@/components/ui/button";
import { RULES_LINE } from "@/lib/rules";

export const Route = createFileRoute("/rules")({ component: RulesPage });

function RulesPage() {
  return (
    <AppShell>
      <PageHeader
        kicker="Rules"
        title={RULES_LINE}
        lede="These are not settings. They are not a plan. They cannot be switched off. ALGM sits on this device and tells the truth about the doors you walk through."
      />

      <RulesGrid />

      <blockquote className="mt-8 max-w-2xl rounded-2xl bg-surface px-5 py-5 shadow-[0_0_0_1px_var(--color-line)]">
        <p className="text-xs tracking-[0.14em] text-muted uppercase">The contract</p>
        <p className="mt-2 font-display text-xl leading-snug text-fg">
          Guidance without a gate. Honesty without an off switch. No theater.
        </p>
      </blockquote>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/advisor">Ask the advisor</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/learn/$slug" params={{ slug: "the-rules" }}>
            Read the briefing
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
