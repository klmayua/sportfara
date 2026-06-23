import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CreatorStatCardProps {
  label: string;
  value: string;
  change: number;
  icon?: React.ReactNode;
  className?: string;
}

export default function CreatorStatCard({ label, value, change, icon, className }: CreatorStatCardProps) {
  const positive = change > 0;
  return (
    <div className={cn("glass-card p-5 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">{label}</span>
        {icon && <div className="text-[#9CA3AF]">{icon}</div>}
      </div>
      <div>
        <p className="font-mono font-extrabold text-2xl text-white tabular-nums">{value}</p>
        <div className={cn("flex items-center gap-1 mt-1 text-xs font-medium", positive ? "text-trust-green" : "text-error")}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {positive ? "+" : ""}{change}% vs last period
        </div>
      </div>
    </div>
  );
}
