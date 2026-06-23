import { cn } from "@/lib/utils/cn";
import { TrendingUp } from "lucide-react";

interface BestLineHighlightProps {
  bookmaker: string;
  market: string;
  odds: number;
  match: string;
  locale?: "en" | "fr";
  className?: string;
}

export default function BestLineHighlight({ bookmaker, market, odds, match, locale = "en", className }: BestLineHighlightProps) {
  return (
    <div className={cn("glass-green rounded-xl p-4 flex items-center gap-4", className)}>
      <div className="w-10 h-10 rounded-xl bg-trust-green/20 flex items-center justify-center shrink-0">
        <TrendingUp className="w-5 h-5 text-trust-green" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono uppercase tracking-wider text-trust-green mb-0.5">
          {locale === "fr" ? "Meilleure cote" : "Best Line"}
        </p>
        <p className="text-sm font-semibold text-white truncate">{match}</p>
        <p className="text-xs text-[#9CA3AF]">{market} · {bookmaker}</p>
      </div>
      <span className="font-mono font-extrabold text-2xl text-trust-green tabular-nums shrink-0">
        {odds.toFixed(2)}
      </span>
    </div>
  );
}
