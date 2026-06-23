"use client";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: "orange" | "green" | "blue" | "gray";
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

const colorClasses = {
  orange: "bg-premium-orange",
  green: "bg-trust-green",
  blue: "bg-info",
  gray: "bg-[#4B5563]",
};

export default function ProgressBar({
  value,
  max = 100,
  label,
  color = "orange",
  showValue = true,
  animated = true,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-xs text-[#9CA3AF]">{label}</span>}
          {showValue && (
            <span className="text-xs font-mono font-bold text-white">{pct}%</span>
          )}
        </div>
      )}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            colorClasses[color],
            animated && "duration-700 ease-out"
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  );
}
