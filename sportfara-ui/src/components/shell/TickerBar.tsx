"use client";
import { useReducedMotion } from "framer-motion";

interface TickerMatch {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  score?: string;
  kickoff?: string;
  status: "LIVE" | "UPCOMING" | "FT";
  edgeScore?: number;
}

const MOCK_TICKER: TickerMatch[] = [
  { id: "t1", league: "EPL", homeTeam: "Arsenal", awayTeam: "Chelsea", status: "LIVE", score: "2-1", edgeScore: 7.8 },
  { id: "t2", league: "La Liga", homeTeam: "Real Madrid", awayTeam: "Atlético", status: "UPCOMING", kickoff: "20:45", edgeScore: 6.2 },
  { id: "t3", league: "NPFL", homeTeam: "Enyimba", awayTeam: "Rivers Utd", status: "LIVE", score: "1-0", edgeScore: 8.1 },
  { id: "t4", league: "KPL", homeTeam: "Gor Mahia", awayTeam: "AFC Leopards", status: "FT", score: "2-2", edgeScore: 4.5 },
  { id: "t5", league: "UCL", homeTeam: "Man City", awayTeam: "PSG", status: "UPCOMING", kickoff: "21:00", edgeScore: 7.1 },
  { id: "t6", league: "PSL", homeTeam: "Sundowns", awayTeam: "Chiefs", status: "LIVE", score: "1-0", edgeScore: 8.5 },
  { id: "t7", league: "Bundesliga", homeTeam: "Bayern", awayTeam: "Dortmund", status: "UPCOMING", kickoff: "18:30" },
  { id: "t8", league: "AFCON Q", homeTeam: "Nigeria", awayTeam: "Ghana", status: "UPCOMING", kickoff: "16:00", edgeScore: 6.8 },
  { id: "t9", league: "CAF CL", homeTeam: "Wydad", awayTeam: "ASEC", status: "FT", score: "1-1" },
];

function edgeColour(score: number): string {
  if (score >= 7.5) return "#00C853";
  if (score >= 5.0) return "#F59E0B";
  return "#6B7280";
}

function TickItem({ match }: { match: TickerMatch }) {
  const displayScore = match.status === "UPCOMING" ? match.kickoff ?? "" : match.score ?? "";

  return (
    <span className="inline-flex items-center gap-2 px-4 shrink-0">
      {match.status === "LIVE" && (
        <span
          className="inline-block w-[5px] h-[5px] rounded-full shrink-0"
          style={{ backgroundColor: "#00C853", animation: "tickerPulse 1.4s infinite" }}
          aria-hidden="true"
        />
      )}
      <span className="font-semibold text-[#D1D5DB] text-xs">{match.league}</span>
      <span className="text-[#6B7280] text-xs">{match.homeTeam} vs {match.awayTeam}</span>
      <span className="font-semibold text-white text-xs tabular-nums">{displayScore}</span>
      {match.edgeScore !== undefined && (
        <span
          className="text-xs font-mono font-bold"
          style={{ color: edgeColour(match.edgeScore) }}
        >
          Edge {match.edgeScore}
        </span>
      )}
      <span className="text-[#374151] text-xs select-none" aria-hidden="true">·</span>
    </span>
  );
}

export default function TickerBar() {
  const prefersReduced = useReducedMotion();
  const items = [...MOCK_TICKER, ...MOCK_TICKER];

  if (prefersReduced) {
    return (
      <div
        role="marquee"
        aria-label="Live match ticker"
        className="fixed top-0 left-0 right-0 z-[60] flex items-center overflow-hidden"
        style={{
          height: "32px",
          backgroundColor: "#1A1C26",
          borderBottom: "0.5px solid #374151",
        }}
      >
        {MOCK_TICKER.slice(0, 4).map((m) => (
          <TickItem key={m.id} match={m} />
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes tickerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: tickerScroll 32s linear infinite;
          display: flex;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        role="marquee"
        aria-label="Live match ticker"
        className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
        style={{
          height: "32px",
          backgroundColor: "#1A1C26",
          borderBottom: "0.5px solid #374151",
        }}
      >
        <div className="ticker-track h-full items-center" style={{ display: "flex", alignItems: "center" }}>
          {items.map((m, i) => (
            <TickItem key={`${m.id}-${i}`} match={m} />
          ))}
        </div>
      </div>
    </>
  );
}
