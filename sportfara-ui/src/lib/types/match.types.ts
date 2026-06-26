export type SourceTier = "T1" | "T2" | "T3" | "T4";

export interface OddsLine {
  bookmaker: string;
  homeWin: number;
  draw: number;
  awayWin: number;
}

export interface MatchType {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  leagueFr: string;
  kickoff: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  bestMarket: string;
  bestMarketFr: string;
  explanationEn: string;
  explanationFr: string;
  sourceTier: SourceTier;
  odds: OddsLine[];
  homeFlag?: string;
  awayFlag?: string;
  edgeScore?: number;
  status?: "LIVE" | "UPCOMING" | "FT";
  score?: string;
  sportTags?: string[];
}

export interface BriefingEntry {
  id: string;
  date: string;
  topPick: string;
  league: string;
  outcome: "won" | "lost" | "pending";
}
