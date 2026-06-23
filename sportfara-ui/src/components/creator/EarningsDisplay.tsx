import { cn } from "@/lib/utils/cn";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface EarningsDisplayProps {
  monthlyEarnings: number;
  nextPayoutDate: string;
  payoutStatus: "on_track" | "processing" | "delayed";
  locale?: "en" | "fr";
  className?: string;
}

export default function EarningsDisplay({ monthlyEarnings, nextPayoutDate, payoutStatus, locale = "en", className }: EarningsDisplayProps) {
  const statusConfig = {
    on_track: { label: locale === "fr" ? "En bonne voie" : "On Track", classes: "text-trust-green" },
    processing: { label: locale === "fr" ? "En traitement" : "Processing", classes: "text-warning" },
    delayed: { label: locale === "fr" ? "Retardé" : "Delayed", classes: "text-error" },
  };
  const status = statusConfig[payoutStatus];

  return (
    <div className={cn("glass-card p-5 space-y-4", className)}>
      <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
        {locale === "fr" ? "Gains du mois" : "This Month's Earnings"}
      </h3>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-trust-green/10 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-trust-green" />
        </div>
        <div>
          <p className="font-mono font-extrabold text-3xl text-white tabular-nums">
            {formatCurrency(monthlyEarnings)}
          </p>
          <p className={cn("text-xs font-medium", status.classes)}>{status.label}</p>
        </div>
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">{locale === "fr" ? "Prochain versement" : "Next payout"}</span>
        <span className="text-white font-medium">{nextPayoutDate}</span>
      </div>
    </div>
  );
}
