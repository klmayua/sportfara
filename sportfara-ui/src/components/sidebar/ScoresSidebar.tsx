"use client";
import { useSidebarSportStore, SIDEBAR_TABS } from "@/lib/stores/sidebarSportStore";
import { cn } from "@/lib/utils/cn";

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
  { id: "sc1", homeTeam: "Arsenal",     awayTeam: "Chelsea",      homeScore: "2", awayScore: "1", league: "EPL",       sport: "football",  status: "LIVE",     edgeScore: 7.8 },
  { id: "sc2", homeTeam: "Man City",    awayTeam: "Liverpool",    homeScore: "-", awayScore: "-", league: "EPL",       sport: "football",  status: "UPCOMING", kickoff: "20:00" },
  { id: "sc3", homeTeam: "Enyimba",     awayTeam: "Rivers Utd",   homeScore: "1", awayScore: "0", league: "NPFL",      sport: "football",  status: "LIVE",     edgeScore: 8.4 },
  { id: "sc4", homeTeam: "Springboks",  awayTeam: "All Blacks",   homeScore: "17", awayScore: "10", league: "Rugby Champ.", sport: "rugby", status: "LIVE", edgeScore: 8.5 },
  { id: "sc5", homeTeam: "76ers",       awayTeam: "Celtics",      homeScore: "114", awayScore: "108", league: "NBA",  sport: "nba",       status: "FT" },
  { id: "sc6", homeTeam: "Kenya",       awayTeam: "Ethiopia",     homeScore: "-", awayScore: "-", league: "5000m Final", sport: "athletics", status: "UPCOMING", kickoff: "19:30" },
  { id: "sc7", homeTeam: "Sundowns",    awayTeam: "Chiefs",       homeScore: "1", awayScore: "0", league: "PSL",       sport: "football",  status: "LIVE",     edgeScore: 7.9 },
  { id: "sc8", homeTeam: "Afghanistan", awayTeam: "Bangladesh",   homeScore: "247", awayScore: "0", league: "T20 WC", sport: "cricket",   status: "LIVE",     edgeScore: 6.4 },
  { id: "sc9", homeTeam: "Morocco",     awayTeam: "Egypt",        homeScore: "-", awayScore: "-", league: "IHF",       sport: "rugby",     status: "UPCOMING", kickoff: "21:00" },
];

function edgeColour(score: number): string {
  if (score >= 7.5) return "#00C853";
  if (score >= 5.0) return "#F59E0B";
  return "#9CA3AF";
}

function ScoreItem({ s }: { s: SidebarScore }) {
  const isLive = s.status === "LIVE";
  const displayHome = s.status === "UPCOMING" ? (s.kickoff ?? "TBA") : s.homeScore;
  const displayAway = s.status === "UPCOMING" ? "" : s.awayScore;

  return (
    <div
      className="hover:bg-white/[0.04] transition-colors cursor-pointer"
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "0.5px solid #374151" }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
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
          <span style={{ fontSize: "9px", fontWeight: 500, color: isLive ? "#00C853" : "#6B7280" }}>
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
  const { activeSidebarSport, setSidebarSport } = useSidebarSportStore();

  const filtered =
    activeSidebarSport === "all"
      ? SCORES
      : SCORES.filter((s) => s.sport === activeSidebarSport);

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          borderBottom: "0.5px solid #374151",
        }}
      >
        {SIDEBAR_TABS.map(({ key, label }) => {
          const isActive = activeSidebarSport === key;
          return (
            <button
              key={key}
              onClick={() => setSidebarSport(key)}
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
              {label}
            </button>
          );
        })}
      </div>

      {/* Scores */}
      <div>
        {filtered.length === 0 ? (
          <p className="text-xs italic text-center py-4" style={{ color: "#6B7280", padding: "16px" }}>
            No live scores right now
          </p>
        ) : (
          filtered.map((s) => <ScoreItem key={s.id} s={s} />)
        )}
      </div>
    </div>
  );
}
