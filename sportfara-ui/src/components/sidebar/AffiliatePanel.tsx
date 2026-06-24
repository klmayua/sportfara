"use client";
import { useModeStore } from "@/lib/stores/modeStore";

const BOOKMAKERS = [
  { name: "Bet9ja",  offer: "100% first deposit bonus",     url: "https://bet9ja.com/?ref=sportfara" },
  { name: "Betika",  offer: "Get 50% bonus on first bet",   url: "https://betika.com/?ref=sportfara" },
  { name: "1xBet",   offer: "Up to $130 welcome bonus",     url: "https://1xbet.com/?ref=sportfara" },
];

async function trackClick(bookmaker: string) {
  try {
    await fetch("/api/affiliate/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookmaker }),
    });
  } catch {
    // non-blocking
  }
}

export default function AffiliatePanel() {
  const { activeMode } = useModeStore();

  if (activeMode !== "signal") return null;

  return (
    <div className="glass-card p-4 space-y-3">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "#6B7280" }}>
        Best odds today
      </h3>
      {BOOKMAKERS.map((bm) => (
        <div
          key={bm.name}
          className="flex items-center justify-between rounded-lg"
          style={{
            backgroundColor: "#1A1C26",
            borderRadius: "8px",
            padding: "8px 10px",
          }}
        >
          <div>
            <p className="text-sm font-bold text-white">{bm.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{bm.offer}</p>
          </div>
          <button
            onClick={() => {
              trackClick(bm.name);
              window.open(bm.url, "_blank", "noopener,noreferrer");
            }}
            className="text-xs font-bold cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-premium-orange rounded shrink-0 ml-3"
            style={{ color: "#3B82F6" }}
          >
            View odds →
          </button>
        </div>
      ))}
    </div>
  );
}
