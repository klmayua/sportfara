"use client";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import BriefingHeader from "@/components/intelligence/BriefingHeader";
import MatchBriefCard from "@/components/intelligence/MatchBriefCard";
import FreePreviewBanner from "@/components/intelligence/FreePreviewBanner";
import { Sidebar, SidebarSection, AnalystCard } from "@/components/layout/Sidebar";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { usePaywall } from "@/lib/hooks/usePaywall";
import type { MatchType } from "@/lib/types/match.types";

const SEED_MATCHES: MatchType[] = [
  {
    id: "m1",
    homeTeam: "Enyimba FC",
    awayTeam: "Rivers United",
    league: "Nigeria Premier League",
    leagueFr: "Championnat Premier du Nigeria",
    kickoff: "2026-06-23T15:00:00Z",
    homeWin: 45,
    draw: 28,
    awayWin: 27,
    bestMarket: "Home Win",
    bestMarketFr: "Victoire à domicile",
    explanationEn: "Enyimba unbeaten at home in 10 games. Rivers United missing top scorer.",
    explanationFr: "Enyimba invaincu à domicile en 10 matches. Rivers United sans son meilleur buteur.",
    sourceTier: "T2",
    odds: [
      { bookmaker: "Bet9ja", homeWin: 2.10, draw: 3.20, awayWin: 3.80 },
      { bookmaker: "Betika", homeWin: 2.05, draw: 3.30, awayWin: 3.90 },
      { bookmaker: "1xBet", homeWin: 2.15, draw: 3.25, awayWin: 3.75 },
    ],
  },
  {
    id: "m2",
    homeTeam: "Gor Mahia",
    awayTeam: "AFC Leopards",
    league: "FKF Premier League",
    leagueFr: "Premier League du Kenya",
    kickoff: "2026-06-23T13:00:00Z",
    homeWin: 52,
    draw: 25,
    awayWin: 23,
    bestMarket: "Over 1.5 Goals",
    bestMarketFr: "Plus de 1.5 buts",
    explanationEn: "Derby averages 3.1 goals. Both teams top-3 in league scoring.",
    explanationFr: "Derby avec 3,1 buts en moyenne. Les deux équipes dans le top 3 des buteurs.",
    sourceTier: "T1",
    odds: [
      { bookmaker: "SportPesa", homeWin: 1.65, draw: 3.40, awayWin: 4.50 },
      { bookmaker: "Betika", homeWin: 1.70, draw: 3.35, awayWin: 4.40 },
      { bookmaker: "22Bet", homeWin: 1.68, draw: 3.38, awayWin: 4.45 },
    ],
  },
  {
    id: "m3",
    homeTeam: "Mamelodi Sundowns",
    awayTeam: "Kaizer Chiefs",
    league: "DStv Premiership",
    leagueFr: "Premiership DStv",
    kickoff: "2026-06-23T17:30:00Z",
    homeWin: 61,
    draw: 22,
    awayWin: 17,
    bestMarket: "Home Win",
    bestMarketFr: "Victoire à domicile",
    explanationEn: "Sundowns 12-game unbeaten run. Chiefs W2 L6 away last 8 games.",
    explanationFr: "Sundowns invaincu depuis 12 matchs. Chiefs: 2V 6D en déplacement.",
    sourceTier: "T1",
    odds: [
      { bookmaker: "Hollywoodbets", homeWin: 1.45, draw: 4.00, awayWin: 6.50 },
      { bookmaker: "Betway", homeWin: 1.50, draw: 3.90, awayWin: 6.00 },
      { bookmaker: "Supabets", homeWin: 1.48, draw: 3.95, awayWin: 6.25 },
    ],
  },
  {
    id: "m4",
    homeTeam: "Wydad AC",
    awayTeam: "Raja Casablanca",
    league: "Botola Pro",
    leagueFr: "Botola Pro (Maroc)",
    kickoff: "2026-06-23T19:00:00Z",
    homeWin: 38,
    draw: 34,
    awayWin: 28,
    bestMarket: "Draw",
    bestMarketFr: "Match nul",
    explanationEn: "Classic derby. Last 6 meetings: 4 draws. High pressing, low conversion.",
    explanationFr: "Classique. 4 nuls sur les 6 dernières confrontations. Pression haute, faible efficacité.",
    sourceTier: "T3",
    odds: [
      { bookmaker: "1xBet", homeWin: 2.40, draw: 3.10, awayWin: 2.90 },
      { bookmaker: "Betclic", homeWin: 2.35, draw: 3.15, awayWin: 2.95 },
      { bookmaker: "Unibet", homeWin: 2.38, draw: 3.12, awayWin: 2.92 },
    ],
  },
  {
    id: "m5",
    homeTeam: "ASEC Mimosas",
    awayTeam: "Africa Sports",
    league: "Ligue 1 Côte d'Ivoire",
    leagueFr: "Ligue 1 Côte d'Ivoire",
    kickoff: "2026-06-23T20:00:00Z",
    homeWin: 55,
    draw: 24,
    awayWin: 21,
    bestMarket: "Home Win & Over 1.5",
    bestMarketFr: "Victoire domicile & Plus 1.5 buts",
    explanationEn: "ASEC lead scorers in league. Africa Sports: W1 D2 L5 away this season.",
    explanationFr: "ASEC meilleure attaque du championnat. Africa Sports: 1V 2N 5D en extérieur.",
    sourceTier: "T2",
    odds: [
      { bookmaker: "Betclic", homeWin: 1.85, draw: 3.40, awayWin: 4.20 },
      { bookmaker: "1xBet", homeWin: 1.90, draw: 3.35, awayWin: 4.10 },
      { bookmaker: "PariPesa", homeWin: 1.88, draw: 3.38, awayWin: 4.15 },
    ],
  },
];

const FEATURED_ANALYSTS = [
  { name: "James Adeyemi", winRate: 58, picks: 147, href: "#" },
  { name: "Aminata Diallo", winRate: 62, picks: 89, href: "#" },
  { name: "Kwame Mensah", winRate: 55, picks: 203, href: "#" },
];

export default function IntelligenceFeedPage() {
  const { locale } = useLanguage();
  const { freeReadsUsed, remaining, limit } = usePaywall("free");
  const [selectedLeague, setSelectedLeague] = useState("all");

  const sidebar = (
    <Sidebar>
      <SidebarSection title={locale === "fr" ? "Analystes vedettes" : "Featured Analysts"}>
        {FEATURED_ANALYSTS.map((a) => (
          <AnalystCard key={a.name} {...a} />
        ))}
      </SidebarSection>
    </Sidebar>
  );

  return (
    <PageWrapper>
      <PageShell sidebar={sidebar}>
        <div className="space-y-6 max-w-2xl">
          <BriefingHeader
            locale={locale as "en" | "fr"}
            selectedLeague={selectedLeague}
            onLeagueChange={setSelectedLeague}
          />

          <div className="space-y-4">
            {SEED_MATCHES.map((match, i) => (
              <MatchBriefCard
                key={match.id}
                match={match}
                index={i}
                userTier="free"
                locale={locale as "en" | "fr"}
              />
            ))}
          </div>

          <FreePreviewBanner
            used={freeReadsUsed}
            limit={limit}
            locale={locale}
          />
        </div>
      </PageShell>
    </PageWrapper>
  );
}
