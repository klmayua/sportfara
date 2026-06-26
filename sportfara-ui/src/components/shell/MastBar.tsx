"use client";
import { useSportStore, SPORT_PILLS } from "@/lib/stores/sportStore";

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function MastBar() {
  const { activeSport, setSport } = useSportStore();

  const now = new Date();
  const dateStr = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div
      style={{
        position: "sticky",
        top: "96px",
        zIndex: 40,
        minHeight: "44px",
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backgroundColor: "#262938",
        borderBottom: "0.5px solid #374151",
      }}
    >
      {/* Left — tagline + date */}
      <div style={{ flexShrink: 0 }}>
        <p
          className="font-mono uppercase"
          style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#6B7280", lineHeight: 1.2 }}
        >
          Global sports intelligence · African in origin
        </p>
        <p className="text-sm font-medium text-white" style={{ lineHeight: 1.3 }}>
          Today&apos;s intelligence — {dateStr}
        </p>
      </div>

      {/* Right — SportPills */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          maxWidth: "500px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {SPORT_PILLS.map(({ key, label }) => {
          const isActive = activeSport === key;
          return (
            <button
              key={key}
              onClick={() => setSport(key)}
              style={{
                padding: "3px 9px",
                borderRadius: "9999px",
                border: isActive ? "1px solid #F97316" : "1px solid #374151",
                color: isActive ? "#F97316" : "#9CA3AF",
                fontSize: "11px",
                fontWeight: 500,
                cursor: "pointer",
                background: "transparent",
                whiteSpace: "nowrap",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
