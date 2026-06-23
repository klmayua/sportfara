import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatSummaryCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatSummaryCard({ label, value, change, icon, className }: StatSummaryCardProps) {
  const positive = change !== undefined && change > 0;
  const negative = change !== undefined && change < 0;

  return (
    <div className={cn("glass-card p-5 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">{label}</span>
        {icon && <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#9CA3AF]">{icon}</div>}
      </div>
      <div className="space-y-1">
        <p className="font-mono font-extrabold text-2xl text-white tabular-nums">{value}</p>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", positive ? "text-trust-green" : negative ? "text-error" : "text-[#6B7280]")}>
            {positive ? <TrendingUp className="w-3 h-3" /> : negative ? <TrendingDown className="w-3 h-3" /> : null}
            <span>{positive ? "+" : ""}{change}% vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
