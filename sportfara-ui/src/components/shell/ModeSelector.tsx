"use client";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";
import { cn } from "@/lib/utils/cn";

const MODES: { key: ActiveMode; name: string; forLabel: string; price: string }[] = [
  { key: "signal", name: "Signal", forLabel: "The serious bettor",    price: "From $5 / month" },
  { key: "intel",  name: "Intel",  forLabel: "Analysts & journalists", price: "From $15 / month" },
  { key: "origin", name: "Origin", forLabel: "The diaspora fan",       price: "From $12 / month" },
];

export default function ModeSelector() {
  const { activeMode, setMode } = useModeStore();

  return (
    <div style={{ padding: "16px 24px 0" }}>
      <p
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "#6B7280", marginBottom: "10px" }}
      >
        Choose your mode
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {MODES.map(({ key, name, forLabel, price }) => {
          const isActive = activeMode === key;
          return (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={cn(
                "text-left rounded-xl transition-all duration-200 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-premium-orange",
              )}
              style={{
                padding: "12px 14px",
                backgroundColor: "#1A1C26",
                border: isActive
                  ? "1.5px solid white"
                  : "1px solid #374151",
              }}
              aria-pressed={isActive}
            >
              <p className="font-bold text-base text-white leading-tight">{name}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{forLabel}</p>
              <p
                className="text-xs font-medium mt-2"
                style={{ color: isActive ? "#F59E0B" : "#6B7280" }}
              >
                {price}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
