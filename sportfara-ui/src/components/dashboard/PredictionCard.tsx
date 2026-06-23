import { cn } from "@/lib/utils/cn";
import SourceBadge from "@/components/intelligence/SourceBadge";
import type { SourceTier } from "@/lib/types/match.types";

interface PredictionCardProps {
  match: string;
  pick: string;
  odds: number;
  confidence: number;
  reasoning: string;
  tier: SourceTier;
  locale?: "en" | "fr";
  className?: string;
}

export default function PredictionCard({ match, pick, odds, confidence, reasoning, tier, locale = "en", className }: PredictionCardProps) {
  return (
    <div className={cn("glass-card p-5 space-y-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#9CA3AF]">{match}</p>
          <p className="font-bold text-white text-lg mt-0.5">{pick}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono font-extrabold text-2xl text-premium-orange tabular-nums">{odds.toFixed(2)}</p>
          <p className="text-xs text-[#9CA3AF]">{locale === "fr" ? "Cote" : "Odds"}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-[#9CA3AF]">{locale === "fr" ? "Confiance" : "Confidence"}</span>
          <span className="font-mono font-bold text-white">{confidence}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-premium-orange rounded-full transition-all duration-700"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-[#9CA3AF] italic border-l-2 border-white/10 pl-3">{reasoning}</p>

      <div className="flex justify-end">
        <SourceBadge tier={tier} />
      </div>
    </div>
  );
}
