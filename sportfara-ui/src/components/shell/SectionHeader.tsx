"use client";
import { useSportStore, SPORT_LABELS } from "@/lib/stores/sportStore";

export default function SectionHeader() {
  const { activeSport } = useSportStore();
  const sportLabel = SPORT_LABELS[activeSport];

  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: "10px 24px", borderBottom: "0.5px solid #374151" }}
    >
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#6B7280" }}>
        Today&apos;s intelligence · {sportLabel}
      </p>

      <div className="flex items-center gap-1.5">
        <span
          className="inline-block rounded-full shrink-0"
          style={{
            width: "5px", height: "5px",
            backgroundColor: "#00C853",
            animation: "tickerPulse 1.4s infinite",
          }}
          aria-hidden="true"
        />
        <span className="text-xs font-medium" style={{ color: "#00C853" }}>
          Live · Odds updated 3 mins ago
        </span>
      </div>
    </div>
  );
}
