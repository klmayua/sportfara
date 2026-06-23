import { cn } from "@/lib/utils/cn";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { BriefingEntry } from "@/lib/types/match.types";
import { formatDate } from "@/lib/utils/formatDate";

interface BriefingHistoryProps {
  entries: BriefingEntry[];
  locale?: "en" | "fr";
  className?: string;
}

const outcomeConfig = {
  won: { icon: CheckCircle, classes: "text-trust-green", label: "Won", labelFr: "Gagné" },
  lost: { icon: XCircle, classes: "text-error", label: "Lost", labelFr: "Perdu" },
  pending: { icon: Clock, classes: "text-warning", label: "Pending", labelFr: "En attente" },
};

export default function BriefingHistory({ entries, locale = "en", className }: BriefingHistoryProps) {
  return (
    <div className={cn("glass-card p-5 space-y-4", className)}>
      <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
        {locale === "fr" ? "Historique des bulletins" : "Briefing History"}
      </h3>
      <div className="space-y-1">
        {entries.map((entry) => {
          const outcome = outcomeConfig[entry.outcome];
          const Icon = outcome.icon;
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
            >
              <Icon className={cn("w-4 h-4 shrink-0", outcome.classes)} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{entry.topPick}</p>
                <p className="text-xs text-[#9CA3AF]">{entry.league}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={cn("text-xs font-mono font-bold", outcome.classes)}>
                  {locale === "fr" ? outcome.labelFr : outcome.label}
                </p>
                <p className="text-2xs text-[#6B7280]">
                  {formatDate(entry.date, locale, { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
