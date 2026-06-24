"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { MatchType } from "@/lib/types/match.types";
import type { UserTier } from "@/lib/types/user.types";
import ProbabilityDisplay from "./ProbabilityDisplay";
import OddsTable from "./OddsTable";
import SourceBadge from "./SourceBadge";
import MatchContext from "./MatchContext";
import PaywallGate from "./PaywallGate";

interface MatchBriefCardProps {
  match: MatchType;
  index: number;
  userTier: UserTier;
  locale?: "en" | "fr";
}

const FREE_LIMIT = 2;

export default function MatchBriefCard({ match, index, userTier, locale = "en" }: MatchBriefCardProps) {
  const isGated = userTier === "free" && index >= FREE_LIMIT;

  if (isGated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <PaywallGate locale={locale} />
      </motion.div>
    );
  }

  const explanation = locale === "fr" ? match.explanationFr : match.explanationEn;
  const league = locale === "fr" ? match.leagueFr : match.league;
  const bestMarket = locale === "fr" ? match.bestMarketFr : match.bestMarket;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className={cn(
        "glass-card border-l-4 border-l-premium-orange",
        "hover:bg-white/[0.07] transition-colors duration-200",
        "space-y-4 p-5"
      )}
      aria-label={`Match briefing: ${match.homeTeam} vs ${match.awayTeam}`}
    >
      {/* Row 1: League + time */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] truncate">
          {league}
        </span>
        <span className="text-xs text-[#6B7280] shrink-0 tabular-nums">
          {new Date(match.kickoff).toLocaleTimeString(locale === "fr" ? "fr-FR" : "en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Row 2: Teams */}
      <div className="flex items-center gap-3">
        {match.homeFlag && <span className="text-xl" aria-hidden="true">{match.homeFlag}</span>}
        <h2 className="font-bold text-xl text-white leading-tight">
          {match.homeTeam}
        </h2>
        <span className="text-[#6B7280] font-light">vs</span>
        <h2 className="font-bold text-xl text-white leading-tight">
          {match.awayTeam}
        </h2>
        {match.awayFlag && <span className="text-xl" aria-hidden="true">{match.awayFlag}</span>}
      </div>

      {/* Best market highlight */}
      <div className="inline-flex items-center gap-2">
        <span className="text-xs text-[#9CA3AF]">
          {locale === "fr" ? "Recommandation :" : "Best bet:"}
        </span>
        <span className="font-mono text-xs font-bold text-premium-orange bg-premium-orange/10 px-2 py-0.5 rounded-full border border-premium-orange/20">
          {bestMarket}
        </span>
      </div>

      {/* Row 3: Probability bars */}
      <ProbabilityDisplay
        homeWin={match.homeWin}
        draw={match.draw}
        awayWin={match.awayWin}
        locale={locale}
      />

      {/* Row 4: Explainability + Edge Score */}
      <div className="border-l-2 border-white/10 pl-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-[#9CA3AF] italic leading-relaxed flex-1">
            <span className="text-[#6B7280] not-italic font-mono text-xs uppercase tracking-wider mr-2">
              {locale === "fr" ? "Analyse" : "Why"}
            </span>
            {explanation}
          </p>
          {match.edgeScore !== undefined && (
            <span
              className="shrink-0 font-mono text-sm font-bold tabular-nums"
              style={{
                color: match.edgeScore >= 7.5 ? "#00C853"
                     : match.edgeScore >= 5.0 ? "#F59E0B"
                     : "#6B7280",
              }}
            >
              Edge {match.edgeScore} / 10
            </span>
          )}
        </div>
      </div>

      {/* Row 5: Odds table */}
      <OddsTable odds={match.odds} locale={locale} />

      {/* Row 6: Form context */}
      <MatchContext homeTeam={match.homeTeam} awayTeam={match.awayTeam} locale={locale} />

      {/* Source badge */}
      <div className="flex justify-end pt-1">
        <SourceBadge tier={match.sourceTier} />
      </div>
    </motion.article>
  );
}
