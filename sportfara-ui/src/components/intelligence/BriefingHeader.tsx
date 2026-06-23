"use client";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";

interface BriefingHeaderProps {
  locale?: "en" | "fr";
  selectedLeague?: string;
  onLeagueChange?: (league: string) => void;
  className?: string;
}

const LEAGUE_OPTIONS = [
  { value: "all", label: "All Leagues", labelFr: "Toutes les ligues" },
  { value: "npfl", label: "Nigeria Premier League", labelFr: "Championnat du Nigeria" },
  { value: "fkfpl", label: "FKF Premier League", labelFr: "Premier League du Kenya" },
  { value: "dstv", label: "DStv Premiership", labelFr: "Premiership DStv" },
  { value: "botola", label: "Botola Pro", labelFr: "Botola Pro (Maroc)" },
  { value: "ligue1ci", label: "Ligue 1 Côte d'Ivoire", labelFr: "Ligue 1 Côte d'Ivoire" },
];

export default function BriefingHeader({ locale = "en", selectedLeague = "all", onLeagueChange, className }: BriefingHeaderProps) {
  const today = formatDate(new Date(), locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#6B7280] text-xs font-mono uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            {today}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {locale === "fr" ? "Bulletin quotidien" : "Daily Briefing"}
          </h1>
          <p className="text-sm text-[#9CA3AF]">
            {locale === "fr"
              ? "Analyses de matchs alimentées par les données du sport africain"
              : "Match analysis powered by African sports data"}
          </p>
        </div>

        <select
          value={selectedLeague}
          onChange={(e) => onLeagueChange?.(e.target.value)}
          aria-label={locale === "fr" ? "Filtrer par ligue" : "Filter by league"}
          className={cn(
            "h-10 px-4 rounded-xl text-sm text-white",
            "bg-white/5 border border-white/10 hover:border-white/20",
            "focus:outline-none focus:ring-2 focus:ring-premium-orange",
            "cursor-pointer transition-colors duration-200",
            "appearance-none"
          )}
        >
          {LEAGUE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-dark">
              {locale === "fr" ? opt.labelFr : opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="h-px bg-gradient-to-r from-premium-orange/30 via-white/10 to-transparent" />
    </div>
  );
}
