"use client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";

interface PaywallGateProps {
  locale?: string;
  className?: string;
}

export default function PaywallGate({ locale = "en", className }: PaywallGateProps) {
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
        <h2 className="text-lg font-bold text-white">
          {locale === "fr"
            ? "Vous avez lu vos 3 bulletins gratuits cette semaine."
            : "You've read your 3 free briefings this week."}
        </h2>
        <p className="text-sm text-[#9CA3AF] max-w-sm">
          {locale === "fr"
            ? "Passez Premium pour une intelligence quotidienne illimitée — EN + FR."
            : "Upgrade to Premium for unlimited daily intelligence — EN + FR."}
        </p>
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
          {locale === "fr" ? "Passer Premium — 10 $/mois" : "Upgrade — $10/month"}
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

      <p className="text-xs text-[#6B7280]">
        {locale === "fr" ? "Annulez à tout moment. Sans engagement." : "Cancel anytime. No commitment."}
      </p>
    </motion.div>
  );
}
