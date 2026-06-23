import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";

interface FreePreviewBannerProps {
  used: number;
  limit: number;
  locale?: string;
  className?: string;
}

export default function FreePreviewBanner({ used, limit, locale = "en", className }: FreePreviewBannerProps) {
  const remaining = Math.max(0, limit - used);
  const pct = (used / limit) * 100;

  return (
    <div
      className={cn(
        "glass-orange rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex-1 space-y-2">
        <p className="text-sm text-white font-medium">
          {locale === "fr"
            ? `Vous avez utilisé ${used} des ${limit} bulletins gratuits cette semaine.`
            : `You've used ${used} of ${limit} free briefings this week.`}
        </p>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-premium-orange rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-[#9CA3AF]">
          {locale === "fr"
            ? `${remaining} bulletin${remaining !== 1 ? "s" : ""} restant${remaining !== 1 ? "s" : ""}`
            : `${remaining} briefing${remaining !== 1 ? "s" : ""} remaining`}
        </p>
      </div>
      <Link
        href={`/${locale}${ROUTES.SUBSCRIBE}`}
        className={cn(
          "shrink-0 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap",
          "bg-premium-orange hover:bg-premium-orange-hover text-white",
          "transition-colors duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-premium-orange"
        )}
      >
        {locale === "fr" ? "Passer Premium" : "Upgrade"}
      </Link>
    </div>
  );
}
