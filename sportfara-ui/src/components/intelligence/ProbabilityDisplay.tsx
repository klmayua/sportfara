"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface ProbabilityDisplayProps {
  homeWin: number;
  draw: number;
  awayWin: number;
  locale?: "en" | "fr";
}

interface BarProps {
  label: string;
  value: number;
  color: string;
  textColor: string;
  animated: boolean;
}

function ProbBar({ label, value, color, textColor, animated }: BarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#9CA3AF]">{label}</span>
        <span className={cn("font-mono text-sm font-extrabold", textColor)}>{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", color, animated && "transition-all duration-700 ease-out")}
          style={{ width: `${animated ? width : value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default function ProbabilityDisplay({ homeWin, draw, awayWin, locale = "en" }: ProbabilityDisplayProps) {
  const labels =
    locale === "fr"
      ? { home: "Domicile", draw: "Nul", away: "Extérieur" }
      : { home: "Home Win", draw: "Draw", away: "Away Win" };

  const dominant = Math.max(homeWin, draw, awayWin);

  return (
    <div className="space-y-2" aria-label="Match probability breakdown">
      <ProbBar
        label={labels.home}
        value={homeWin}
        color={homeWin === dominant ? "bg-premium-orange" : "bg-white/20"}
        textColor={homeWin === dominant ? "text-premium-orange" : "text-white"}
        animated
      />
      <ProbBar
        label={labels.draw}
        value={draw}
        color={draw === dominant ? "bg-premium-orange" : "bg-white/20"}
        textColor={draw === dominant ? "text-premium-orange" : "text-white"}
        animated
      />
      <ProbBar
        label={labels.away}
        value={awayWin}
        color={awayWin === dominant ? "bg-premium-orange" : "bg-white/20"}
        textColor={awayWin === dominant ? "text-premium-orange" : "text-white"}
        animated
      />
    </div>
  );
}
