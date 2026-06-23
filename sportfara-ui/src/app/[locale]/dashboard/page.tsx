"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import TrackRecordWidget from "@/components/dashboard/TrackRecordWidget";
import BriefingHistory from "@/components/dashboard/BriefingHistory";
import StatSummaryCard from "@/components/dashboard/StatSummaryCard";
import BestLineHighlight from "@/components/dashboard/BestLineHighlight";
import OddsTable from "@/components/intelligence/OddsTable";
import Badge from "@/components/ui/Badge";
import { Sidebar, SidebarSection, AnalystCard } from "@/components/layout/Sidebar";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";
import { TrendingUp, Users, BookOpen, Target } from "lucide-react";
import type { BriefingEntry, OddsLine } from "@/lib/types/match.types";

const PNL_DATA = [
  { date: "Apr 1", units: 0 }, { date: "Apr 15", units: 3.2 }, { date: "May 1", units: 5.1 },
  { date: "May 15", units: 4.3 }, { date: "Jun 1", units: 8.7 }, { date: "Jun 15", units: 12.3 },
];

const BRIEFING_HISTORY: BriefingEntry[] = [
  { id: "b1", date: "2026-06-22", topPick: "Gor Mahia — Over 1.5 Goals", league: "FKF Premier League", outcome: "won" },
  { id: "b2", date: "2026-06-21", topPick: "Sundowns — Home Win", league: "DStv Premiership", outcome: "won" },
  { id: "b3", date: "2026-06-20", topPick: "Wydad — Draw", league: "Botola Pro", outcome: "pending" },
  { id: "b4", date: "2026-06-19", topPick: "Enyimba — Home Win", league: "Nigeria Premier League", outcome: "won" },
  { id: "b5", date: "2026-06-18", topPick: "ASEC — Home & Over 1.5", league: "Ligue 1 CI", outcome: "lost" },
  { id: "b6", date: "2026-06-17", topPick: "Leopards — Away Win", league: "FKF Premier League", outcome: "won" },
  { id: "b7", date: "2026-06-16", topPick: "Chiefs — Draw", league: "DStv Premiership", outcome: "won" },
];

const FEATURED_ODDS: OddsLine[] = [
  { bookmaker: "Bet9ja", homeWin: 2.10, draw: 3.20, awayWin: 3.80 },
  { bookmaker: "Betika", homeWin: 2.05, draw: 3.30, awayWin: 3.90 },
  { bookmaker: "1xBet", homeWin: 2.15, draw: 3.25, awayWin: 3.75 },
  { bookmaker: "SportPesa", homeWin: 1.65, draw: 3.40, awayWin: 4.50 },
  { bookmaker: "Hollywoodbets", homeWin: 1.45, draw: 4.00, awayWin: 6.50 },
];

const FEATURED_ANALYSTS = [
  { name: "Aminata Diallo", winRate: 62, picks: 89, href: "#" },
  { name: "Kwame Mensah", winRate: 55, picks: 203, href: "#" },
  { name: "Fatou Ndiaye", winRate: 60, picks: 71, href: "#" },
];

export default function DashboardPage() {
  const { locale } = useLanguage();
  const { user } = useAuth();

  const L = locale as "en" | "fr";

  const sidebar = (
    <Sidebar>
      <SidebarSection title={L === "fr" ? "Analystes vedettes" : "Featured Analysts"}>
        {FEATURED_ANALYSTS.map((a) => <AnalystCard key={a.name} {...a} />)}
      </SidebarSection>
    </Sidebar>
  );

  return (
    <PageWrapper>
      <PageShell sidebar={sidebar}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                {L === "fr" ? "Tableau de bord" : "Dashboard"}
              </h1>
              {user && (
                <p className="text-sm text-[#9CA3AF]">
                  {L === "fr" ? "Bonjour," : "Welcome back,"} {user.fullName}
                </p>
              )}
            </div>
            <Badge variant="premium">{L === "fr" ? "Premium" : "Premium"}</Badge>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatSummaryCard label={L === "fr" ? "Taux victoire" : "Win Rate"} value="58%" change={3} icon={<Target className="w-4 h-4" />} />
            <StatSummaryCard label={L === "fr" ? "ROI 30j" : "30d ROI"} value="+12.3u" change={8} icon={<TrendingUp className="w-4 h-4" />} />
            <StatSummaryCard label={L === "fr" ? "Sélections" : "Total Picks"} value="147" change={5} icon={<BookOpen className="w-4 h-4" />} />
            <StatSummaryCard label={L === "fr" ? "Abonnés" : "Followers"} value="847" change={12} icon={<Users className="w-4 h-4" />} />
          </div>

          {/* Best line */}
          <BestLineHighlight
            bookmaker="SportPesa"
            market="Over 1.5 Goals"
            odds={4.50}
            match="Gor Mahia vs AFC Leopards"
            locale={L}
          />

          {/* Track record */}
          <TrackRecordWidget
            analystName="James Adeyemi"
            winRate={58}
            roi={12.3}
            totalPicks={147}
            pnlData={PNL_DATA}
            locale={L}
          />

          {/* Full odds table */}
          <div className="glass-card p-5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-4">
              {L === "fr" ? "Comparaison des cotes — Aujourd'hui" : "Odds Comparison — Today"}
            </h2>
            <OddsTable odds={FEATURED_ODDS} locale={L} />
          </div>

          {/* Briefing history */}
          <BriefingHistory entries={BRIEFING_HISTORY} locale={L} />
        </div>
      </PageShell>
    </PageWrapper>
  );
}
