"use client";
import { useSportStore, SPORT_PILLS } from "@/lib/stores/sportStore";
import { cn } from "@/lib/utils/cn";

export default function Masthead() {
  const { activeSport, setSport } = useSportStore();

  return (
    <div style={{ borderBottom: "0.5px solid #374151" }}>
      {/* Brand statement */}
      <div className="text-center" style={{ padding: "20px 24px 16px" }}>
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#6B7280", marginBottom: "8px" }}>
          The sports intelligence platform
        </p>
        <h1
          className="font-semibold text-white"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em", lineHeight: 1.15, whiteSpace: "pre-line" }}
        >
          {"Global sports intelligence.\nAfrican in origin."}
        </h1>
        <p className="text-sm italic" style={{ color: "#9CA3AF", marginTop: "10px", lineHeight: 1.6 }}>
          Signal · Intel · Origin — one platform, three ways to know more than everyone else in the room.
        </p>
      </div>

      {/* Sport pills */}
      <div
        style={{
          padding: "0 24px 14px",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="flex gap-2" style={{ width: "max-content" }}>
          {SPORT_PILLS.map(({ key, label }) => {
            const isActive = activeSport === key;
            return (
              <button
                key={key}
                onClick={() => setSport(key)}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-premium-orange whitespace-nowrap"
                )}
                style={
                  isActive
                    ? { border: "1px solid #F97316", color: "#F97316", backgroundColor: "transparent" }
                    : { border: "1px solid #374151", color: "#9CA3AF", backgroundColor: "transparent" }
                }
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
