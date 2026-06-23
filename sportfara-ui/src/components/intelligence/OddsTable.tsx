import { cn } from "@/lib/utils/cn";
import OddsRow from "./OddsRow";
import type { OddsLine } from "@/lib/types/match.types";

interface OddsTableProps {
  odds: OddsLine[];
  locale?: "en" | "fr";
  className?: string;
}

export default function OddsTable({ odds, locale = "en", className }: OddsTableProps) {
  const bestHome = Math.max(...odds.map((o) => o.homeWin));
  const bestDraw = Math.max(...odds.map((o) => o.draw));
  const bestAway = Math.max(...odds.map((o) => o.awayWin));

  const labels =
    locale === "fr"
      ? { bookmaker: "Bookmaker", home: "Dom.", draw: "Nul", away: "Ext." }
      : { bookmaker: "Bookmaker", home: "Home", draw: "Draw", away: "Away" };

  return (
    <div className={cn("overflow-x-auto -mx-1", className)}>
      <table className="w-full min-w-[280px] text-sm" aria-label="Odds comparison">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-3 py-2 text-left text-xs text-[#6B7280] font-mono uppercase tracking-wider">
              {labels.bookmaker}
            </th>
            <th className="px-3 py-2 text-center text-xs text-[#6B7280] font-mono uppercase tracking-wider">
              {labels.home}
            </th>
            <th className="px-3 py-2 text-center text-xs text-[#6B7280] font-mono uppercase tracking-wider">
              {labels.draw}
            </th>
            <th className="px-3 py-2 text-center text-xs text-[#6B7280] font-mono uppercase tracking-wider">
              {labels.away}
            </th>
          </tr>
        </thead>
        <tbody>
          {odds.map((line) => (
            <OddsRow
              key={line.bookmaker}
              bookmaker={line.bookmaker}
              homeWin={line.homeWin}
              draw={line.draw}
              awayWin={line.awayWin}
              bestHome={line.homeWin === bestHome}
              bestDraw={line.draw === bestDraw}
              bestAway={line.awayWin === bestAway}
            />
          ))}
        </tbody>
      </table>
      <p className="text-2xs text-[#6B7280] mt-1 px-3">
        {locale === "fr"
          ? "Les meilleures cotes sont surlignées en vert."
          : "Best available odds highlighted in green."}
      </p>
    </div>
  );
}
