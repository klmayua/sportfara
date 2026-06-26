"use client";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";

// ── Mode config ───────────────────────────────────────────────

const MODE_DOT: Record<ActiveMode, string> = {
  signal: "#F59E0B",
  intel:  "#3B82F6",
  origin: "#10B981",
};

const MODES: { key: ActiveMode; name: string; desc: string; price: string }[] = [
  { key: "signal", name: "Signal", desc: "Verified edge, every match",    price: "From $5 / mo" },
  { key: "intel",  name: "Intel",  desc: "Briefings for analysts",         price: "From $15 / mo" },
  { key: "origin", name: "Origin", desc: "Diaspora African sports",        price: "From $12 / mo" },
];

const TRIAL_COPY: Record<ActiveMode, string> = {
  signal: "Most bettors lose because they guess. See the edge before you pay for it.",
  intel:  "Be the journalist who already knows. Try your briefing desk free.",
  origin: "Stay connected to home for 7 days. Every sport. EN + FR.",
};

const TRIAL_CTA: Record<ActiveMode, string> = {
  signal: "Get 7 days of edge — free",
  intel:  "Start 7-day trial — free",
  origin: "Stay connected — 7 days free",
};

// ── Sub-components ────────────────────────────────────────────

function ModeNavItem({
  mode,
  isActive,
  onSelect,
}: {
  mode: (typeof MODES)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  const color = MODE_DOT[mode.key];

  return (
    <button
      onClick={onSelect}
      className="w-full text-left transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-premium-orange rounded-md"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        padding: "7px 9px",
        borderRadius: "6px",
        border: isActive ? "1px solid #374151" : "1px solid transparent",
        background: isActive ? "#1A1C26" : "transparent",
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{ width: "6px", height: "6px", backgroundColor: color, marginTop: "5px" }}
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-medium text-white">{mode.name}</p>
        <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px", lineHeight: 1.3 }}>
          {mode.desc}
        </p>
        <p style={{ fontSize: "11px", fontWeight: 500, color, marginTop: "3px" }}>
          {mode.price}
        </p>
      </div>
    </button>
  );
}

function TrialBox({ activeMode }: { activeMode: ActiveMode }) {
  function scrollToGate() {
    document.getElementById("gate-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      const emailInput = document.getElementById("gate-email") as HTMLInputElement | null;
      emailInput?.focus();
    }, 400);
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1C26",
        border: "0.5px solid #374151",
        borderRadius: "6px",
        padding: "10px",
      }}
    >
      <p
        className="font-mono uppercase font-bold"
        style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#F97316", marginBottom: "5px" }}
      >
        7-day free trial
      </p>
      <p style={{ fontSize: "11px", color: "#9CA3AF", lineHeight: 1.5, marginBottom: "8px" }}>
        {TRIAL_COPY[activeMode]}
      </p>
      <button
        onClick={scrollToGate}
        className="w-full font-bold cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-premium-orange"
        style={{
          fontSize: "11px",
          backgroundColor: "#F97316",
          color: "#FFFFFF",
          borderRadius: "4px",
          padding: "6px",
          border: "none",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#EA580C"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F97316"; }}
      >
        {TRIAL_CTA[activeMode]}
      </button>
      <p
        className="text-center"
        style={{ fontSize: "10px", color: "#6B7280", marginTop: "5px" }}
      >
        No card needed. Cancel anytime.
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "0.5px",
        backgroundColor: "#374151",
        margin: "14px 0",
      }}
    />
  );
}

function LiveStatus() {
  return (
    <div>
      <p
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "4px" }}
      >
        Live · odds updated
      </p>
      <div className="flex items-center gap-1.5">
        <span
          className="rounded-full shrink-0"
          style={{
            width: "4px",
            height: "4px",
            backgroundColor: "#00C853",
            display: "inline-block",
            boxShadow: "0 0 0 2px rgba(0,200,83,0.25)",
          }}
          aria-hidden="true"
        />
        <span style={{ fontSize: "11px", fontWeight: 500, color: "#00C853" }}>
          3 mins ago
        </span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function LeftColumn() {
  const { activeMode, setMode } = useModeStore();

  return (
    <div
      style={{
        padding: "14px 12px",
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* Section 1 — Mode nav */}
      <p
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "8px" }}
      >
        Your mode
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {MODES.map((mode) => (
          <ModeNavItem
            key={mode.key}
            mode={mode}
            isActive={activeMode === mode.key}
            onSelect={() => setMode(mode.key)}
          />
        ))}
      </div>

      <Divider />

      {/* Section 2 — Trial box */}
      <TrialBox activeMode={activeMode} />

      <Divider />

      {/* Section 3 — Live status */}
      <LiveStatus />
    </div>
  );
}
