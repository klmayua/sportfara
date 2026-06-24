"use client";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import MatchBriefCard from "@/components/intelligence/MatchBriefCard";
import { Sidebar, SidebarSection, AnalystCard } from "@/components/layout/Sidebar";
import AffiliatePanel from "@/components/sidebar/AffiliatePanel";
import Masthead from "@/components/shell/Masthead";
import ModeSelector from "@/components/shell/ModeSelector";
import UVPZone from "@/components/shell/UVPZone";
import CounterBar from "@/components/shell/CounterBar";
import IntelCard from "@/components/feed/IntelCard";
import OriginCard from "@/components/feed/OriginCard";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { usePaywall } from "@/lib/hooks/usePaywall";
import { useModeStore } from "@/lib/stores/modeStore";
import type { MatchType } from "@/lib/types/match.types";
import type { IntelCardData } from "@/components/feed/IntelCard";
import type { OriginCardData } from "@/components/feed/OriginCard";

const SEED_MATCHES: MatchType[] = [
  {
    id: "m1", homeTeam: "Enyimba FC", awayTeam: "Rivers United",
    league: "Nigeria Premier League", leagueFr: "Championnat Premier du Nigeria",
    kickoff: "2026-06-23T15:00:00Z", homeWin: 45, draw: 28, awayWin: 27,
    bestMarket: "Home Win", bestMarketFr: "Victoire à domicile",
    explanationEn: "Enyimba unbeaten at home in 10 games. Rivers United missing top scorer.",
    explanationFr: "Enyimba invaincu à domicile en 10 matches. Rivers United sans son meilleur buteur.",
    sourceTier: "T2", edgeScore: 8.1,
    odds: [
      { bookmaker: "Bet9ja", homeWin: 2.10, draw: 3.20, awayWin: 3.80 },
      { bookmaker: "Betika", homeWin: 2.05, draw: 3.30, awayWin: 3.90 },
      { bookmaker: "1xBet",  homeWin: 2.15, draw: 3.25, awayWin: 3.75 },
    ],
  },
  {
    id: "m2", homeTeam: "Gor Mahia", awayTeam: "AFC Leopards",
    league: "FKF Premier League", leagueFr: "Premier League du Kenya",
    kickoff: "2026-06-23T13:00:00Z", homeWin: 52, draw: 25, awayWin: 23,
    bestMarket: "Over 1.5 Goals", bestMarketFr: "Plus de 1.5 buts",
    explanationEn: "Derby averages 3.1 goals. Both teams top-3 in league scoring.",
    explanationFr: "Derby avec 3,1 buts en moyenne. Les deux équipes dans le top 3 des buteurs.",
    sourceTier: "T1", edgeScore: 6.5,
    odds: [
      { bookmaker: "SportPesa", homeWin: 1.65, draw: 3.40, awayWin: 4.50 },
      { bookmaker: "Betika",    homeWin: 1.70, draw: 3.35, awayWin: 4.40 },
      { bookmaker: "22Bet",     homeWin: 1.68, draw: 3.38, awayWin: 4.45 },
    ],
  },
  {
    id: "m3", homeTeam: "Mamelodi Sundowns", awayTeam: "Kaizer Chiefs",
    league: "DStv Premiership", leagueFr: "Premiership DStv",
    kickoff: "2026-06-23T17:30:00Z", homeWin: 61, draw: 22, awayWin: 17,
    bestMarket: "Home Win", bestMarketFr: "Victoire à domicile",
    explanationEn: "Sundowns 12-game unbeaten run. Chiefs W2 L6 away last 8 games.",
    explanationFr: "Sundowns invaincu depuis 12 matchs. Chiefs: 2V 6D en déplacement.",
    sourceTier: "T1", edgeScore: 7.9,
    odds: [
      { bookmaker: "Hollywoodbets", homeWin: 1.45, draw: 4.00, awayWin: 6.50 },
      { bookmaker: "Betway",        homeWin: 1.50, draw: 3.90, awayWin: 6.00 },
      { bookmaker: "Supabets",      homeWin: 1.48, draw: 3.95, awayWin: 6.25 },
    ],
  },
  {
    id: "m4", homeTeam: "Wydad AC", awayTeam: "Raja Casablanca",
    league: "Botola Pro", leagueFr: "Botola Pro (Maroc)",
    kickoff: "2026-06-23T19:00:00Z", homeWin: 38, draw: 34, awayWin: 28,
    bestMarket: "Draw", bestMarketFr: "Match nul",
    explanationEn: "Classic derby. Last 6 meetings: 4 draws. High pressing, low conversion.",
    explanationFr: "Classique. 4 nuls sur les 6 dernières confrontations.",
    sourceTier: "T3", edgeScore: 4.8,
    odds: [
      { bookmaker: "1xBet",   homeWin: 2.40, draw: 3.10, awayWin: 2.90 },
      { bookmaker: "Betclic", homeWin: 2.35, draw: 3.15, awayWin: 2.95 },
      { bookmaker: "Unibet",  homeWin: 2.38, draw: 3.12, awayWin: 2.92 },
    ],
  },
  {
    id: "m5", homeTeam: "ASEC Mimosas", awayTeam: "Africa Sports",
    league: "Ligue 1 Côte d'Ivoire", leagueFr: "Ligue 1 Côte d'Ivoire",
    kickoff: "2026-06-23T20:00:00Z", homeWin: 55, draw: 24, awayWin: 21,
    bestMarket: "Home Win & Over 1.5", bestMarketFr: "Victoire domicile & Plus 1.5 buts",
    explanationEn: "ASEC lead scorers in league. Africa Sports: W1 D2 L5 away this season.",
    explanationFr: "ASEC meilleure attaque du championnat. Africa Sports: 1V 2N 5D en extérieur.",
    sourceTier: "T2", edgeScore: 5.3,
    odds: [
      { bookmaker: "Betclic",  homeWin: 1.85, draw: 3.40, awayWin: 4.20 },
      { bookmaker: "1xBet",    homeWin: 1.90, draw: 3.35, awayWin: 4.10 },
      { bookmaker: "PariPesa", homeWin: 1.88, draw: 3.38, awayWin: 4.15 },
    ],
  },
];

const INTEL_CARDS: IntelCardData[] = [
  {
    id: "i1",
    headline: "NPFL Form Analysis: Why Enyimba's xG advantage is being underpriced",
    author: "James Adeyemi",
    sourceTier: "T1",
    readTime: "4 min read",
    excerpt: "A deep dive into Enyimba's expected goals (xG) figures over the last 10 home fixtures reveals a pattern that bookmakers have consistently ignored. Their xG differential of +1.4 per game is among the highest in the league, yet odds still reflect pre-season market inertia.",
    stats: [{ number: "+1.4", label: "xG diff / game" }, { number: "10/10", label: "Home unbeaten" }, { number: "2.1×", label: "Avg best odds" }],
  },
  {
    id: "i2",
    headline: "KPL Derby Preview: Tactical breakdown of the Nairobi showdown",
    author: "Aminata Diallo",
    sourceTier: "T2",
    readTime: "6 min read",
    excerpt: "Gor Mahia and AFC Leopards have met 14 times in the last three seasons. The data points to one clear pattern: when the match is played at Nyayo Stadium, over 1.5 goals occurs in 79% of fixtures. This is not a coin flip.",
    stats: [{ number: "79%", label: "O1.5 at Nyayo" }, { number: "3.1", label: "Goals avg" }, { number: "14", label: "Meetings analysed" }],
  },
  {
    id: "i3",
    headline: "PSL Power Rankings: Sundowns' invincibility streak in numbers",
    author: "Kwame Mensah",
    sourceTier: "T1",
    readTime: "3 min read",
    excerpt: "Mamelodi Sundowns have not lost in 12 league games. But the more interesting story is in the underlying data: their pressing intensity (PPDA of 7.2) is the best in the league, and Kaizer Chiefs' away record collapses against top-half sides.",
    stats: [{ number: "12", label: "Unbeaten run" }, { number: "7.2", label: "PPDA (pressing)" }, { number: "17%", label: "Chiefs away W%" }],
  },
  {
    id: "i4",
    headline: "Botola Pro Draw Patterns: The Wydad-Raja variable that odds ignore",
    author: "James Adeyemi",
    sourceTier: "T3",
    readTime: "5 min read",
    excerpt: "Four draws in six meetings might look like parity. But a closer look at the shot conversion rates, referee allocation patterns, and late-game tactical withdrawals reveals why the draw market in this fixture is structurally underpriced.",
    stats: [{ number: "4/6", label: "Recent draws" }, { number: "3.1×", label: "Draw avg odds" }, { number: "68%", label: "Shots on target <40%" }],
  },
  {
    id: "i5",
    headline: "Ligue 1 CI: ASEC Mimosas' home dominance — an analytical overview",
    author: "Aminata Diallo",
    sourceTier: "T2",
    readTime: "4 min read",
    excerpt: "ASEC's scoring rate at home (2.3 goals per game) is the highest in Côte d'Ivoire's top flight. Africa Sports' away defence has conceded in 8 of their last 9 road trips. The combined market of Home Win & Over 1.5 Goals sits at 1.88 — a structural mismatch.",
    stats: [{ number: "2.3", label: "Goals/game (H)" }, { number: "8/9", label: "Africa Sp conceded away" }, { number: "1.88×", label: "Best market odds" }],
  },
];

const ORIGIN_CARDS: OriginCardData[] = [
  {
    id: "o1",
    locationTag: "NPFL · Nigeria",
    flag: "🇳🇬",
    headlineEn: "Enyimba FC are building something special — and Abuja is watching",
    headlineFr: "Enyimba FC construit quelque chose de spécial — et Abuja regarde",
    deckEn: "In a league often defined by chaos and late payments, Enyimba's consistency at home is becoming a story of its own. Ten games unbeaten. A vocal fanbase. And a coach who refuses to use tactics from 2009.",
    deckFr: "Dans un championnat souvent marqué par le chaos et les retards de paiement, la régularité d'Enyimba à domicile devient une histoire en soi. Dix matches sans défaite. Une base de supporters bruyante. Et un entraîneur qui refuse de jouer 2009.",
  },
  {
    id: "o2",
    locationTag: "KPL · Kenya",
    flag: "🇰🇪",
    headlineEn: "The Nairobi derby is more than football — it is identity",
    headlineFr: "Le derby de Nairobi est plus que du football — c'est une question d'identité",
    deckEn: "Gor Mahia versus AFC Leopards divides families, neighbourhoods and offices every time it is played. This weekend, 36,000 fans are expected at Nyayo. The city will not be quiet.",
    deckFr: "Gor Mahia contre AFC Leopards divise les familles, les quartiers et les bureaux à chaque confrontation. Ce week-end, 36 000 supporters sont attendus à Nyayo. La ville ne sera pas calme.",
  },
  {
    id: "o3",
    locationTag: "PSL · South Africa",
    flag: "🇿🇦",
    headlineEn: "Sundowns are becoming untouchable — and it should worry everyone",
    headlineFr: "Sundowns devient intouchable — et cela devrait inquiéter tout le monde",
    deckEn: "Twelve games without defeat. A squad depth that rivals anything on the continent. Mamelodi Sundowns are not just winning — they are making winning look easy. Kaizer Chiefs arrive this Sunday as the latest side to discover what that means.",
    deckFr: "Douze matches sans défaite. Une profondeur d'effectif qui rivalise avec n'importe qui sur le continent. Mamelodi Sundowns ne fait pas que gagner — ils rendent la victoire facile. Kaizer Chiefs arrive ce dimanche comme le dernier club à en faire l'expérience.",
  },
  {
    id: "o4",
    locationTag: "Botola Pro · Morocco",
    flag: "🇲🇦",
    headlineEn: "The Casablanca derby has only one rule: nothing is decided until it is over",
    headlineFr: "Le derby de Casablanca n'a qu'une règle : rien n'est décidé avant la fin",
    deckEn: "Wydad versus Raja is the kind of fixture that empties offices and fills hospital wards. Four draws in six meetings. The data says draw. The crowd says anything can happen.",
    deckFr: "Wydad contre Raja est le genre de match qui vide les bureaux et remplit les salles d'urgence. Quatre nuls en six confrontations. Les données disent nul. Les supporters disent que tout peut arriver.",
  },
  {
    id: "o5",
    locationTag: "Ligue 1 CI · Côte d'Ivoire",
    flag: "🇨🇮",
    headlineEn: "ASEC Mimosas: the club that taught Abidjan to dream big",
    headlineFr: "ASEC Mimosas : le club qui a appris à Abidjan à rêver grand",
    deckEn: "They produced Yaya Touré, Didier Zokora, Emmanuel Eboué. Forty years later, ASEC's academy still produces the best footballers in the country. And this weekend, they face Africa Sports at home — a fixture that needs no introduction.",
    deckFr: "Ils ont formé Yaya Touré, Didier Zokora, Emmanuel Eboué. Quarante ans plus tard, l'académie de l'ASEC produit toujours les meilleurs footballeurs du pays. Ce week-end, ils accueillent Africa Sports — un match qui ne nécessite aucune présentation.",
  },
];

const FEATURED_ANALYSTS = [
  { name: "James Adeyemi", winRate: 58, picks: 147, href: "#" },
  { name: "Aminata Diallo", winRate: 62, picks: 89,  href: "#" },
  { name: "Kwame Mensah",  winRate: 55, picks: 203, href: "#" },
];

const SIDEBAR_TITLE: Record<string, string> = {
  signal: "Verified analysts",
  intel:  "Featured analysts",
  origin: "African voices",
};
const SIDEBAR_TITLE_FR: Record<string, string> = {
  signal: "Analystes vérifiés",
  intel:  "Analystes vedettes",
  origin: "Voix africaines",
};

export default function IntelligenceFeedPage() {
  const { locale } = useLanguage();
  const { freeReadsUsed, limit } = usePaywall("free");
  const { activeMode } = useModeStore();
  const [_selectedLeague, setSelectedLeague] = useState("all");
  void setSelectedLeague;

  const sidebarTitle = locale === "fr"
    ? SIDEBAR_TITLE_FR[activeMode]
    : SIDEBAR_TITLE[activeMode];

  const sidebar = (
    <Sidebar>
      <SidebarSection title={sidebarTitle}>
        {FEATURED_ANALYSTS.map((a) => (
          <AnalystCard key={a.name} {...a} />
        ))}
      </SidebarSection>
      <AffiliatePanel />
    </Sidebar>
  );

  return (
    <PageWrapper>
      {/* Masthead + Mode shell — full width above the grid */}
      <div className="border-b" style={{ borderColor: "#374151" }}>
        <Masthead />
        <ModeSelector />
        <UVPZone locale={locale} />
        <CounterBar locale={locale} />
      </div>

      <PageShell sidebar={sidebar}>
        <div className="space-y-4 max-w-2xl pt-6">
          {activeMode === "signal" && SEED_MATCHES.map((match, i) => (
            <MatchBriefCard
              key={match.id}
              match={match}
              index={i}
              userTier="free"
              locale={locale as "en" | "fr"}
            />
          ))}

          {activeMode === "intel" && INTEL_CARDS.map((card, i) => (
            <IntelCard key={card.id} card={card} index={i} />
          ))}

          {activeMode === "origin" && ORIGIN_CARDS.map((card, i) => (
            <OriginCard key={card.id} card={card} index={i} defaultLang={locale as "en" | "fr"} />
          ))}
        </div>
      </PageShell>
    </PageWrapper>
  );
}
