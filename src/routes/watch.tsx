import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAlgm } from "@/lib/store";
import type { InvestigationStatus } from "@/lib/types";
import { formatBytes, timeAgo } from "@/lib/utils";

export const Route = createFileRoute("/watch")({ component: Watch });

const TONE: Record<InvestigationStatus, "mute" | "warn" | "accent" | "good" | "bad"> = {
  held: "warn",
  inspecting: "accent",
  inspected: "mute",
  cleared: "good",
  quarantined: "bad",
};

function Watch() {
  const items = useAlgm((s) => s.investigations);
  const payloads = useAlgm((s) => s.payloads);
  const inspect = useAlgm((s) => s.inspect);
  const resolve = useAlgm((s) => s.resolveInv);
  const ingest = useAlgm((s) => s.ingestUpload);
  const [paste, setPaste] = useState("");
  const [notice, setNotice] = useState<string>();

  const held = items.filter((i) => i.status === "held" || i.status === "inspecting").length;

  return (
    <AppShell>
      <PageHeader
        kicker="Watch"
        title="Failed updates stay lazy. You open them."
        lede="If a model card, policy PDF, or capability flag arrives broken — truncated, unsigned, or claiming Claude can swarm on the website — ALGM holds the stub. The payload is not parsed until you investigate."
        action={
          <p className="text-xs text-muted tabular-nums">{held} on the pad</p>
        }
      />

      <section className="mb-8 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5">
        <h2 className="font-display text-xl">Manual upload</h2>
        <p className="mt-1 text-sm text-muted">
          Paste a changelog, model card, or policy excerpt. Contradictions and stubs are held.
        </p>
        <Textarea
          className="mt-3"
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          placeholder='{"env":"claude.ai","capabilities":{"swarm":true}}'
        />
        <Button
          className="mt-3"
          variant="secondary"
          onClick={() => {
            if (!paste.trim()) return;
            const inv = ingest(paste);
            setNotice(inv.title);
            setPaste("");
          }}
        >
          Ingest on-device
        </Button>
        {notice && <p className="mt-2 text-sm text-accent">{notice}</p>}
      </section>

      <ul className="grid gap-4">
        {items.map((item) => {
          const payload = payloads[item.id];
          return (
            <li
              key={item.id}
              className="rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)] sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={TONE[item.status]}>{item.status}</Badge>
                <Badge>{item.kind}</Badge>
                <span className="text-[0.6875rem] text-faint tabular-nums">
                  {formatBytes(item.bytesHeld)} · {timeAgo(item.failedAt)}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug">{item.title}</h3>
              <p className="mt-1 font-mono text-[0.6875rem] text-muted">
                {item.source} · {item.stage}
              </p>

              {payload ? (
                <div className="mt-4 rounded-xl bg-raised p-3">
                  <p className="font-mono text-[0.6875rem] text-faint">{payload.checksum}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg">{payload.error}</p>
                  <pre className="mt-3 overflow-x-auto text-[0.6875rem] leading-relaxed text-muted whitespace-pre-wrap">
                    {payload.excerpt}
                  </pre>
                  <p className="mt-3 text-sm text-muted">{payload.recommendation}</p>
                  <p className="mt-2 text-xs text-faint">{payload.honestyNote}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  Payload not loaded. Investigate to lazy-read the held file.
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {item.status === "held" && (
                  <Button onClick={() => inspect(item.id)}>Investigate</Button>
                )}
                {item.status === "inspecting" && (
                  <Button disabled variant="secondary">
                    Loading payload…
                  </Button>
                )}
                {(item.status === "inspected" || item.status === "held") && (
                  <>
                    <Button variant="secondary" onClick={() => resolve(item.id, "cleared")}>
                      Clear
                    </Button>
                    <Button variant="danger" onClick={() => resolve(item.id, "quarantined")}>
                      Quarantine
                    </Button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
