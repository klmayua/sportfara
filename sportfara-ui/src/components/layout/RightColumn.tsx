"use client";
import ScoresSidebar from "@/components/sidebar/ScoresSidebar";
import AnalystPanel, { type AnalystEntry } from "@/components/sidebar/AnalystPanel";
import AffiliatePanel from "@/components/sidebar/AffiliatePanel";

interface RightColumnProps {
  analysts: AnalystEntry[];
}

export default function RightColumn({ analysts }: RightColumnProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* Scores */}
      <ScoresSidebar />

      {/* Analysts */}
      <AnalystPanel analysts={analysts} />

      {/* Affiliate — signal mode only (handled inside AffiliatePanel) */}
      <AffiliatePanel />
    </div>
  );
}
