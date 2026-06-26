"use client";
import { useSportStore, type ActiveSport } from "@/lib/stores/sportStore";

const BREAKING: Record<ActiveSport, string> = {
  all:        "Enyimba goalkeeper ruled out 2 hrs before kick-off — Edge score moves 6.1 → 8.4",
  football:   "Arsenal down to 10 men — Chelsea live odds shortening",
  athletics:  "Kipchoge confirmed for Diamond League tonight — race preview live",
  rugby:      "All Blacks missing Barrett — Springboks edge score moves to 8.5",
  basketball: "Embiid 38pts — 76ers win confirmed. BAL Lagos final Friday.",
  cricket:    "Afghanistan squad confirmed — 3 key spin bowlers in starting XI",
  cycling:    "Biniam Girmay wins Stage 3 — first Eritrean to win two consecutive Vuelta stages",
  handball:   "Morocco goalkeeper injury confirmed — Edge updated 6.8 → 7.6",
  boxing:     "Ajose WBC ranking officially updated — full analysis live",
};

export default function BreakingBanner() {
  const { activeSport } = useSportStore();
  const text = BREAKING[activeSport];
  if (!text) return null;

  return (
    <div style={{ margin: "10px 24px 0" }}>
      <div
        style={{
          borderLeft: "2px solid #F97316",
          borderRadius: "0 8px 8px 0",
          padding: "7px 12px",
          backgroundColor: "#1A1C26",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#F97316",
            fontWeight: 700,
            marginRight: "8px",
          }}
        >
          Breaking
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#FFFFFF",
            lineHeight: 1.35,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
