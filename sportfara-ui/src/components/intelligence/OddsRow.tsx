import { cn } from "@/lib/utils/cn";
import { formatOdds } from "@/lib/utils/formatOdds";

interface OddsRowProps {
  bookmaker: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  bestHome?: boolean;
  bestDraw?: boolean;
  bestAway?: boolean;
}

function OddsCell({ value, isBest }: { value: number; isBest?: boolean }) {
  return (
    <td
      className={cn(
        "px-3 py-2 font-mono text-sm font-bold text-center",
        isBest ? "text-trust-green" : "text-white"
      )}
    >
      {formatOdds(value)}
    </td>
  );
}

export default function OddsRow({ bookmaker, homeWin, draw, awayWin, bestHome, bestDraw, bestAway }: OddsRowProps) {
  return (
    <tr className="hover:bg-white/3 transition-colors duration-150">
      <td className="px-3 py-2 text-xs text-[#9CA3AF] font-medium">{bookmaker}</td>
      <OddsCell value={homeWin} isBest={bestHome} />
      <OddsCell value={draw} isBest={bestDraw} />
      <OddsCell value={awayWin} isBest={bestAway} />
    </tr>
  );
}
