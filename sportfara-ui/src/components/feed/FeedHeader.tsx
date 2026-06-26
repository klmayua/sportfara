"use client";
import { useSportStore, SPORT_LABELS } from "@/lib/stores/sportStore";

export default function FeedHeader() {
  const { activeSport } = useSportStore();
  const sportLabel = SPORT_LABELS[activeSport];

  return (
    <div
      style={{
        padding: "9px 14px",
        borderBottom: "0.5px solid #374151",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        id="feed-label"
        className="font-mono uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.08em", color: "#6B7280" }}
      >
        {sportLabel} · Today&apos;s briefings
      </span>

      <div className="flex items-center gap-1.5">
        <span
          className="rounded-full"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#00C853",
            display: "inline-block",
            boxShadow: "0 0 0 2px rgba(0,200,83,0.2)",
          }}
          aria-hidden="true"
        />
        <span style={{ fontSize: "10px", fontWeight: 500, color: "#00C853" }}>Live</span>
      </div>
    </div>
  );
}
