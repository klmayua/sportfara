"use client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";

interface PaywallGateProps {
  locale?: string;
  className?: string;
}

const GATE_CONTENT: Record<ActiveMode, { headline: string; body: string; cta: string; sub: string }> = {
  signal: {
    headline: "Your edge expires here. 3 more match briefings await.",
    body: "Odds comparison, verified track records, WHY reasoning, and Edge scores for every match today — across every league.",
    cta: "Get Signal · $5 / month",
    sub: "Pay with Paystack — Naira, Shilling, Rand, or card",
  },
  intel: {
    headline: "Your briefing desk is one step away.",
    body: "Unlimited match previews, source-tiered intelligence, exportable data, and the full briefing archive.",
    cta: "Get Intel · $15 / month",
    sub: "Used by journalists in 8 African markets",
  },
  origin: {
    headline: "The rest of home is waiting.",
    body: "Full coverage — African leagues and global tournaments — in English and French, from every corner of the world.",
    cta: "Get Origin · $12 / month",
    sub: "Followed by 14,000 Africans abroad",
  },
};

export default function PaywallGate({ locale = "en", className }: PaywallGateProps) {
  const { activeMode } = useModeStore();
  const content = GATE_CONTENT[activeMode];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "glass-card border border-premium-orange/20 shadow-orange-glow",
        "flex flex-col items-center text-center p-8 space-y-5",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-premium-orange/10 border border-premium-orange/20 flex items-center justify-center">
        <Lock className="w-8 h-8 text-premium-orange" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold text-white">{content.headline}</h2>
        <p className="text-sm text-[#9CA3AF] max-w-sm">{content.body}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Link
          href={`/${locale}${ROUTES.SUBSCRIBE}`}
          className={cn(
            "flex-1 flex items-center justify-center px-5 py-3 rounded-xl",
            "bg-premium-orange hover:bg-premium-orange-hover text-white font-semibold text-sm",
            "transition-colors duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark"
          )}
        >
          {content.cta}
        </Link>
        <Link
          href={`/${locale}${ROUTES.SUBSCRIBE}`}
          className={cn(
            "flex-1 flex items-center justify-center px-5 py-3 rounded-xl",
            "bg-transparent border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white text-sm",
            "transition-colors duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-premium-orange"
          )}
        >
          {locale === "fr" ? "Voir les abonnements" : "See all plans"}
        </Link>
      </div>

      <p className="text-xs text-[#6B7280]">{content.sub}</p>
    </motion.div>
  );
}
