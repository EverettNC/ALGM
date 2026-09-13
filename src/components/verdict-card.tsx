import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CAPABILITIES, getEnv, getModel } from "@/lib/catalog";
import { explainVerdict } from "@/lib/guide";
import type { Verdict, VerdictKind } from "@/lib/types";
import { HonestyBar } from "@/components/marks";

const KIND: Record<
  VerdictKind,
  { label: string; tone: "good" | "warn" | "bad" | "mute" | "accent" }
> = {
  allowed: { label: "Allowed", tone: "good" },
  limited: { label: "Limited", tone: "warn" },
  blocked: { label: "Not this door", tone: "bad" },
  privacy: { label: "Path", tone: "accent" },
  unknown: { label: "Unmapped", tone: "mute" },
};

export function VerdictCard({
  verdict,
  explain,
}: {
  verdict: Verdict;
  explain?: boolean;
}) {
  const meta = KIND[verdict.kind];
  const model = verdict.modelId ? getModel(verdict.modelId) : undefined;
  const env =
    verdict.modelId && verdict.envId ? getEnv(verdict.modelId, verdict.envId) : undefined;
  const [note, setNote] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>();

  async function ask() {
    setBusy(true);
    setErr(undefined);
    const res = await explainVerdict({
      data: {
        query: verdict.query,
        headline: verdict.headline,
        body: verdict.body,
        teach: verdict.teach,
      },
    });
    setBusy(false);
    if (!res.ok) setErr(res.error);
    else setNote(res.text);
  }

  return (
    <article className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={meta.tone}>{meta.label}</Badge>
        {verdict.capability && <Badge>{CAPABILITIES[verdict.capability].label}</Badge>}
        {model && (
          <span className="text-xs text-muted">
            {model.short}
            {env ? ` · ${env.label}` : ""}
          </span>
        )}
      </div>
      <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight">{verdict.headline}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{verdict.body}</p>
      <p className="mt-4 border-l-2 border-accent/40 pl-3 text-sm leading-relaxed text-fg">
        {verdict.teach}
      </p>

      {verdict.alternatives.length > 0 && (
        <div className="mt-5">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Other doors</p>
          <ul className="mt-2 grid gap-2">
            {verdict.alternatives.map((a) => {
              const m = getModel(a.modelId);
              const e = getEnv(a.modelId, a.envId);
              return (
                <li key={`${a.modelId}-${a.envId}`} className="rounded-xl bg-raised px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {m?.short} · {e?.label}
                    </p>
                    <Badge tone={a.level === "yes" ? "good" : "warn"}>
                      {a.level === "yes" ? "Ready" : "Partial"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{a.why}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {verdict.steps.length > 0 && (
        <ol className="mt-5 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-muted">
          {verdict.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      )}

      {env && (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs text-muted">
            <span>Honesty {env.data.honesty}</span>
            <Link to="/honesty" className="text-accent hover:underline">
              Full path
            </Link>
          </div>
          <HonestyBar value={env.data.honesty} />
          <p className="mt-2 text-xs leading-relaxed text-faint">{verdict.honestyNote}</p>
        </div>
      )}

      {explain && (
        <div className="mt-5 border-t border-line pt-4">
          <Button variant="secondary" onClick={ask} disabled={busy}>
            {busy ? "Asking Grok…" : "Explain with Grok"}
          </Button>
          <p className="mt-2 text-xs text-faint">
            This one step leaves the device — it sends the verdict to xAI. Everything else in ALGM
            stays local.
          </p>
          {err && <p className="mt-2 text-sm text-bad">{err}</p>}
          {note && (
            <p className="mt-3 text-sm leading-relaxed text-muted whitespace-pre-wrap">{note}</p>
          )}
        </div>
      )}
    </article>
  );
}
