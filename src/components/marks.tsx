import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LatticeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-accent", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="6" cy="16" r="2.2" fill="currentColor" />
      <circle cx="16" cy="8" r="2.2" fill="currentColor" />
      <circle cx="16" cy="24" r="2.2" fill="currentColor" />
      <circle cx="26" cy="16" r="2.2" fill="currentColor" />
      <path
        d="M8.1 16H13.7M18.3 16H23.9M16 10.2V13.4M16 18.6V21.8M7.6 14.4L13.8 9.6M18.2 9.6L24.4 14.4M7.6 17.6L13.8 22.4M18.2 22.4L24.4 17.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HonestyBar({ value, className }: { value: number; className?: string }) {
  const tone = value >= 80 ? "bg-good" : value >= 60 ? "bg-warn" : "bg-bad";
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-raised", className)}
      role="img"
      aria-label={`Honesty ${value}`}
    >
      <div
        className={cn("h-full rounded-full", tone)}
        style={{ width: `${Math.max(4, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function LivePip({ className }: { className?: string }) {
  return (
    <span
      className={cn("live-pip inline-block size-1.5 rounded-full bg-good", className)}
      aria-hidden="true"
    />
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">{children}</p>
  );
}
