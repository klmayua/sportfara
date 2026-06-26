"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type SidebarTab = "All" | "Football" | "Rugby" | "Athletics" | "NBA" | "Cricket";

const TABS: SidebarTab[] = ["All", "Football", "Rugby", "Athletics", "NBA", "Cricket"];

interface SidebarScore {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  league: string;
  sport: string;
  status: "LIVE" | "FT" | "UPCOMING";
  kickoff?: string;
  edgeScore?: number;
}

const SCORES: SidebarScore[] = [
  { id: "sc1", homeTeam: "Arsenal",     awayTeam: "Chelsea",      homeScore: "2", awayScore: "1", league: "EPL",       sport: "Football",  status: "LIVE",     edgeScore: 7.8 },
  { id: "sc2", homeTeam: "Man City",    awayTeam: "Liverpool",    homeScore: "-", awayScore: "-", league: "EPL",       sport: "Football",  status: "UPCOMING", kickoff: "20:00" },
  { id: "sc3", homeTeam: "Enyimba",     awayTeam: "Rivers Utd",   homeScore: "1", awayScore: "0", league: "NPFL",      sport: "Football",  status: "LIVE",     edgeScore: 8.4 },
  { id: "sc4", homeTeam: "Springboks",  awayTeam: "All Blacks",   homeScore: "17", awayScore: "10", league: "Rugby Championship", sport: "Rugby", status: "LIVE", edgeScore: 8.5 },
  { id: "sc5", homeTeam: "76ers",       awayTeam: "Celtics",      homeScore: "114", awayScore: "108", league: "NBA",   sport: "NBA",       status: "FT" },
  { id: "sc6", homeTeam: "Kenya",       awayTeam: "Ethiopia",     homeScore: "-", awayScore: "-", league: "5000m Final", sport: "Athletics", status: "UPCOMING", kickoff: "19:30" },
  { id: "sc7", homeTeam: "Sundowns",    awayTeam: "Chiefs",       homeScore: "1", awayScore: "0", league: "PSL",       sport: "Football",  status: "LIVE",     edgeScore: 7.9 },
  { id: "sc8", homeTeam: "Afghanistan", awayTeam: "Bangladesh",   homeScore: "247", awayScore: "0", league: "T20 WC", sport: "Cricket",   status: "LIVE",     edgeScore: 6.4 },
  { id: "sc9", homeTeam: "Morocco",     awayTeam: "Egypt",        homeScore: "-", awayScore: "-", league: "IHF",       sport: "Rugby",     status: "UPCOMING", kickoff: "21:00" },
];

function edgeColour(score: number): string {
  if (score >= 7.5) return "#00C853";
  if (score >= 5.0) return "#F59E0B";
  return "#9CA3AF";
}

function ScoreItem({ s }: { s: SidebarScore }) {
  const isLive = s.status === "LIVE";
  const displayHome = s.status === "UPCOMING" ? (s.kickoff ?? "TBA") : s.homeScore;
  const displayAway = s.status === "UPCOMING" ? ""                   : s.awayScore;

  return (
    <div
      className="flex items-center justify-between hover:bg-white/[0.04] transition-colors cursor-pointer"
      style={{ padding: "8px 12px", borderBottom: "0.5px solid #374151" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#FFFFFF" }} className="truncate">{s.homeTeam}</span>
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#FFFFFF" }} className="tabular-nums shrink-0">{displayHome}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span style={{ fontSize: "11px", fontWeight: 500, color: "#FFFFFF" }} className="truncate">{s.awayTeam}</span>
          {displayAway && <span style={{ fontSize: "11px", fontWeight: 500, color: "#FFFFFF" }} className="tabular-nums shrink-0">{displayAway}</span>}
        </div>
        <p className="flex items-center gap-1 mt-0.5">
          <span style={{ fontSize: "9px", color: "#6B7280" }}>{s.league}</span>
          <span
            style={{
              fontSize: "9px",
              fontWeight: 500,
              color: isLive ? "#00C853" : "#6B7280",
            }}
          >
            · {isLive ? "LIVE" : s.status === "FT" ? "FT" : ""}
          </span>
        </p>
      </div>

      {s.edgeScore !== undefined && (
        <span
          className="shrink-0 ml-3 font-mono"
          style={{ fontSize: "9px", fontWeight: 700, color: edgeColour(s.edgeScore) }}
        >
          {s.edgeScore}
        </span>
      )}
    </div>
  );
}

export default function ScoresSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("All");

  const filtered = activeTab === "All"
    ? SCORES
    : SCORES.filter((s) => s.sport === activeTab);

  return (
    <div className="glass-card overflow-hidden">
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          borderBottom: "0.5px solid #374151",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-xs font-medium px-3 pb-2 pt-3 whitespace-nowrap cursor-pointer transition-colors duration-150",
                "focus:outline-none shrink-0",
                isActive ? "text-white" : "hover:text-white"
              )}
              style={{
                color: isActive ? "#FFFFFF" : "#9CA3AF",
                borderBottom: isActive ? "2px solid #F97316" : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Scores */}
      <div>
        {filtered.length === 0 ? (
          <p className="text-xs italic text-center py-4" style={{ color: "#6B7280" }}>
            No live scores right now
          </p>
        ) : (
          filtered.map((s) => <ScoreItem key={s.id} s={s} />)
        )}
      </div>
    </div>
  );
}
