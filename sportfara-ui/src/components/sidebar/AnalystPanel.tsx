"use client";
import Link from "next/link";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";

const PANEL_TITLE: Record<ActiveMode, string> = {
  signal: "Verified analysts",
  intel:  "Featured analysts",
  origin: "African voices",
};

const DOT_COLOUR: Record<"W" | "L" | "D", string> = {
  W: "#00C853",
  L: "#FF1744",
  D: "#2D3045",
};

export interface AnalystEntry {
  name: string;
  winRate: number;
  picks: number;
  href: string;
  signature?: string;
  last5?: Array<"W" | "L" | "D">;
}

interface AnalystPanelProps {
  analysts: AnalystEntry[];
}

export default function AnalystPanel({ analysts }: AnalystPanelProps) {
  const { activeMode } = useModeStore();
  const title = PANEL_TITLE[activeMode];

  return (
    <div style={{ padding: "10px 12px", borderTop: "0.5px solid #374151" }}>
      <p
        id="sb-ana-title"
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#6B7280", marginBottom: "8px" }}
      >
        {title}
      </p>

      {analysts.map((a) => (
        <div
          key={a.name}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
            padding: "5px 0",
            borderBottom: "0.5px solid #374151",
          }}
        >
          {/* Avatar */}
          <div
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "rgba(59,130,246,0.15)",
              fontSize: "10px",
              fontWeight: 700,
              color: "#3B82F6",
            }}
            aria-hidden="true"
          >
            {a.name.charAt(0)}
          </div>

          {/* Body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="text-white font-medium" style={{ fontSize: "12px" }}>{a.name}</p>

            {a.signature && (
              <p
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  fontStyle: "italic",
                  lineHeight: 1.2,
                  margin: "1px 0",
                }}
              >
                &ldquo;{a.signature}&rdquo;
              </p>
            )}

            {a.last5 && a.last5.length > 0 && (
              <div className="flex items-center gap-0.5" style={{ marginTop: "3px" }}>
                {a.last5.map((result, i) => (
                  <div
                    key={i}
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "14px",
                      height: "14px",
                      backgroundColor: DOT_COLOUR[result],
                      fontSize: "7px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                    aria-label={result === "W" ? "Win" : result === "L" ? "Loss" : "Draw"}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Follow */}
          <Link
            href={a.href}
            className="shrink-0 text-white border border-white/20 hover:border-white/40 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-premium-orange rounded"
            style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px" }}
          >
            Follow
          </Link>
        </div>
      ))}
    </div>
  );
}
