"use client";
import MastBar from "@/components/shell/MastBar";
import BodyGrid from "@/components/layout/BodyGrid";
import LeftColumn from "@/components/layout/LeftColumn";
import CentreColumn from "@/components/layout/CentreColumn";
import RightColumn from "@/components/layout/RightColumn";
import { useLanguage } from "@/lib/hooks/useLanguage";
import type { MatchType } from "@/lib/types/match.types";
import type { IntelCardData } from "@/components/feed/IntelCard";
import type { OriginCardData } from "@/components/feed/OriginCard";
import type { AnalystEntry } from "@/components/sidebar/AnalystPanel";

// ── Seed data ─────────────────────────────────────────────────

const SEED_MATCHES: MatchType[] = [
  {
    id: "m1", homeTeam: "Enyimba FC", awayTeam: "Rivers United",
    league: "Nigeria Premier League", leagueFr: "Championnat Premier du Nigeria",
    kickoff: "2026-06-23T15:00:00Z", homeWin: 45, draw: 28, awayWin: 27,
    bestMarket: "Home Win", bestMarketFr: "Victoire à domicile",
    explanationEn: "Enyimba unbeaten at home in 10 games. Rivers United missing top scorer.",
    explanationFr: "Enyimba invaincu à domicile en 10 matches. Rivers United sans son meilleur buteur.",
    sourceTier: "T2", edgeScore: 8.1, sportTags: ["football"],
    odds: [
      { bookmaker: "Bet9ja",  homeWin: 2.10, draw: 3.20, awayWin: 3.80 },
      { bookmaker: "Betika",  homeWin: 2.05, draw: 3.30, awayWin: 3.90 },
      { bookmaker: "1xBet",   homeWin: 2.15, draw: 3.25, awayWin: 3.75 },
    ],
  },
  {
    id: "m2", homeTeam: "Gor Mahia", awayTeam: "AFC Leopards",
    league: "FKF Premier League", leagueFr: "Premier League du Kenya",
    kickoff: "2026-06-23T13:00:00Z", homeWin: 52, draw: 25, awayWin: 23,
    bestMarket: "Over 1.5 Goals", bestMarketFr: "Plus de 1.5 buts",
    explanationEn: "Derby averages 3.1 goals. Both teams top-3 in league scoring.",
    explanationFr: "Derby avec 3,1 buts en moyenne. Les deux équipes dans le top 3 des buteurs.",
    sourceTier: "T1", edgeScore: 6.5, sportTags: ["football"],
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
    sourceTier: "T1", edgeScore: 7.9, sportTags: ["football"],
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
    sourceTier: "T3", edgeScore: 4.8, sportTags: ["football"],
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
    sourceTier: "T2", edgeScore: 5.3, sportTags: ["football"],
    odds: [
      { bookmaker: "Betclic",  homeWin: 1.85, draw: 3.40, awayWin: 4.20 },
      { bookmaker: "1xBet",    homeWin: 1.90, draw: 3.35, awayWin: 4.10 },
      { bookmaker: "PariPesa", homeWin: 1.88, draw: 3.38, awayWin: 4.15 },
    ],
  },
  {
    id: "m6", homeTeam: "Springboks", awayTeam: "All Blacks",
    league: "Rugby Championship", leagueFr: "Rugby Championship",
    kickoff: "2026-06-23T16:00:00Z", homeWin: 58, draw: 5, awayWin: 37,
    bestMarket: "Home Win", bestMarketFr: "Victoire à domicile",
    explanationEn: "All Blacks missing Barrett. Springboks edge score moves to 8.5 after squad news.",
    explanationFr: "All Blacks sans Barrett. Le score d'avantage des Springboks passe à 8,5.",
    sourceTier: "T1", edgeScore: 8.5, sportTags: ["rugby"],
    odds: [
      { bookmaker: "Betway",  homeWin: 1.72, draw: 14.00, awayWin: 2.10 },
      { bookmaker: "1xBet",   homeWin: 1.75, draw: 13.50, awayWin: 2.05 },
      { bookmaker: "Unibet",  homeWin: 1.74, draw: 13.00, awayWin: 2.08 },
    ],
  },
  {
    id: "m7", homeTeam: "Kenya", awayTeam: "Ethiopia",
    league: "Diamond League — 5000m", leagueFr: "Diamond League — 5000m",
    kickoff: "2026-06-23T19:30:00Z", homeWin: 44, draw: 0, awayWin: 56,
    bestMarket: "Kipchoge Wins", bestMarketFr: "Victoire Kipchoge",
    explanationEn: "Kipchoge confirmed for Diamond League tonight. Personal best at this venue.",
    explanationFr: "Kipchoge confirmé pour la Diamond League ce soir. Record personnel sur ce site.",
    sourceTier: "T2", edgeScore: 6.8, sportTags: ["athletics"],
    odds: [
      { bookmaker: "Betway",  homeWin: 1.90, draw: 0, awayWin: 1.95 },
      { bookmaker: "1xBet",   homeWin: 1.88, draw: 0, awayWin: 1.98 },
      { bookmaker: "Unibet",  homeWin: 1.92, draw: 0, awayWin: 1.93 },
    ],
  },
];

const INTEL_CARDS: IntelCardData[] = [
  {
    id: "i1", headline: "NPFL Form Analysis: Why Enyimba's xG advantage is being underpriced",
    author: "James Adeyemi", sourceTier: "T1", readTime: "4 min read",
    excerpt: "A deep dive into Enyimba's expected goals (xG) figures over the last 10 home fixtures reveals a pattern bookmakers have consistently ignored. Their xG differential of +1.4 per game is among the highest in the league.",
    stats: [{ number: "+1.4", label: "xG diff / game" }, { number: "10/10", label: "Home unbeaten" }, { number: "2.1×", label: "Avg best odds" }],
  },
  {
    id: "i2", headline: "KPL Derby Preview: Tactical breakdown of the Nairobi showdown",
    author: "Aminata Diallo", sourceTier: "T2", readTime: "6 min read",
    excerpt: "Gor Mahia and AFC Leopards have met 14 times in the last three seasons. When played at Nyayo Stadium, over 1.5 goals occurs in 79% of fixtures. This is not a coin flip.",
    stats: [{ number: "79%", label: "O1.5 at Nyayo" }, { number: "3.1", label: "Goals avg" }, { number: "14", label: "Meetings analysed" }],
  },
  {
    id: "i3", headline: "PSL Power Rankings: Sundowns' invincibility streak in numbers",
    author: "Kwame Mensah", sourceTier: "T1", readTime: "3 min read",
    excerpt: "Mamelodi Sundowns have not lost in 12 league games. Their pressing intensity (PPDA 7.2) is the best in the league, and Kaizer Chiefs' away record collapses against top-half sides.",
    stats: [{ number: "12", label: "Unbeaten run" }, { number: "7.2", label: "PPDA (pressing)" }, { number: "17%", label: "Chiefs away W%" }],
  },
  {
    id: "i4", headline: "Springboks vs All Blacks: The Barrett variable changes everything",
    author: "James Adeyemi", sourceTier: "T1", readTime: "5 min read",
    excerpt: "Beauden Barrett's absence cuts the All Blacks' ball-in-play time by an estimated 22% based on his last 8 starts. The Springboks' edge score moves from 6.2 to 8.5. Markets haven't caught up yet.",
    stats: [{ number: "8.5", label: "Springboks edge" }, { number: "-22%", label: "ABs ball-in-play" }, { number: "1.72×", label: "Best Spboks odds" }],
  },
  {
    id: "i5", headline: "Diamond League 5000m: Kipchoge's confirmed start — what the data says",
    author: "Aminata Diallo", sourceTier: "T2", readTime: "4 min read",
    excerpt: "Kipchoge has started three Diamond League 5000m races in the last two seasons. He won all three. His personal best at tonight's venue (13:01) is a full 12 seconds faster than the current field average.",
    stats: [{ number: "3/3", label: "DL wins this venue" }, { number: "13:01", label: "Kipchoge PB" }, { number: "−12s", label: "vs field average" }],
  },
];

const ORIGIN_CARDS: OriginCardData[] = [
  {
    id: "o1", locationTag: "NPFL · Nigeria", flag: "🇳🇬",
    headlineEn: "Enyimba FC are building something special — and Abuja is watching",
    headlineFr: "Enyimba FC construit quelque chose de spécial — et Abuja regarde",
    deckEn: "In a league defined by chaos and late payments, Enyimba's consistency at home is a story of its own. Ten games unbeaten. A vocal fanbase. And a coach who refuses to play 2009.",
    deckFr: "Dans un championnat marqué par le chaos et les retards de paiement, la régularité d'Enyimba à domicile devient une histoire en soi. Dix matches sans défaite.",
  },
  {
    id: "o2", locationTag: "KPL · Kenya", flag: "🇰🇪",
    headlineEn: "The Nairobi derby is more than football — it is identity",
    headlineFr: "Le derby de Nairobi est plus que du football — c'est une question d'identité",
    deckEn: "Gor Mahia versus AFC Leopards divides families and offices every time it is played. This weekend, 36,000 fans are expected at Nyayo. The city will not be quiet.",
    deckFr: "Gor Mahia contre AFC Leopards divise les familles et les bureaux à chaque confrontation. Ce week-end, 36 000 supporters sont attendus à Nyayo.",
  },
  {
    id: "o3", locationTag: "Rugby Championship · South Africa", flag: "🇿🇦",
    headlineEn: "Springboks vs All Blacks — the rivalry that stops two nations",
    headlineFr: "Springboks contre All Blacks — la rivalité qui arrête deux nations",
    deckEn: "Barrett is out. The Springboks are favourites. But anyone who has watched this fixture knows that scorelines lie. Cape Town will be electric.",
    deckFr: "Barrett est absent. Les Springboks sont favoris. Mais quiconque a regardé ce match sait que les scores mentent. Le Cap sera électrique.",
  },
  {
    id: "o4", locationTag: "Diamond League · Athletics", flag: "🌍",
    headlineEn: "Kipchoge is running tonight — and the world should watch",
    headlineFr: "Kipchoge court ce soir — et le monde devrait regarder",
    deckEn: "It is never just a race when Eliud Kipchoge runs. The greatest distance runner in history, confirmed for tonight's 5000m. History does not run on a schedule — but it is running tonight.",
    deckFr: "Ce n'est jamais juste une course quand Eliud Kipchoge court. Le plus grand coureur de fond de l'histoire, confirmé pour le 5000m de ce soir.",
  },
  {
    id: "o5", locationTag: "PSL · South Africa", flag: "🇿🇦",
    headlineEn: "Sundowns are becoming untouchable — and it should worry everyone",
    headlineFr: "Sundowns devient intouchable — et cela devrait inquiéter tout le monde",
    deckEn: "Twelve games without defeat. A squad depth that rivals anything on the continent. Mamelodi Sundowns are not just winning — they are making winning look easy.",
    deckFr: "Douze matches sans défaite. Une profondeur d'effectif qui rivalise avec n'importe qui sur le continent. Mamelodi Sundowns ne fait pas que gagner — ils rendent la victoire facile.",
  },
];

const FEATURED_ANALYSTS: AnalystEntry[] = [
  {
    name: "James Adeyemi", winRate: 58, picks: 147, href: "#",
    signature: "Home form is everything in NPFL right now.",
    last5: ["W", "W", "L", "W", "D"],
  },
  {
    name: "Aminata Diallo", winRate: 62, picks: 89, href: "#",
    signature: "The draw market in African derbies is consistently underpriced.",
    last5: ["W", "L", "W", "W", "W"],
  },
  {
    name: "Kwame Mensah", winRate: 55, picks: 203, href: "#",
    signature: "xG tells you who should have won. Odds tell you who the market thought would.",
    last5: ["W", "D", "L", "W", "W"],
  },
];

// ── Page ──────────────────────────────────────────────────────

export default function IntelligenceFeedPage() {
  const { locale } = useLanguage();
  const L = locale as "en" | "fr";

  return (
    <>
      <MastBar />
      <BodyGrid
        left={<LeftColumn />}
        centre={
          <CentreColumn
            signalCards={SEED_MATCHES}
            intelCards={INTEL_CARDS}
            originCards={ORIGIN_CARDS}
            locale={L}
          />
        }
        right={<RightColumn analysts={FEATURED_ANALYSTS} />}
      />
    </>
  );
}
