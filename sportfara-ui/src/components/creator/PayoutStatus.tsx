import { cn } from "@/lib/utils/cn";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { PayoutRecord } from "@/lib/types/creator.types";

interface PayoutStatusProps {
  payouts: PayoutRecord[];
  locale?: "en" | "fr";
  className?: string;
}

export default function PayoutStatus({ payouts, locale = "en", className }: PayoutStatusProps) {
  return (
    <div className={cn("glass-card p-5 space-y-4", className)}>
      <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
        {locale === "fr" ? "Historique versements" : "Payout History"}
      </h3>
      <div className="space-y-2">
        {payouts.map((payout) => (
          <div key={payout.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <CheckCircle className="w-4 h-4 text-trust-green shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium">{formatCurrency(payout.amount)}</p>
              <p className="text-xs text-[#9CA3AF] capitalize">{payout.method} · {payout.paidAt ?? "—"}</p>
            </div>
            <span className={cn(
              "text-xs font-mono font-bold px-2 py-0.5 rounded-full",
              payout.status === "paid"
                ? "text-trust-green bg-trust-green/10"
                : payout.status === "pending"
                ? "text-warning bg-warning/10"
                : "text-error bg-error/10"
            )}>
              {locale === "fr"
                ? payout.status === "paid" ? "Payé" : payout.status === "pending" ? "En attente" : "Échoué"
                : payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
