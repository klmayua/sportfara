import { cn } from "@/lib/utils/cn";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import type { TierDefinition } from "@/lib/constants/tiers";

interface PricingCardProps {
  tier: TierDefinition;
  isAnnual?: boolean;
  featured?: boolean;
  locale?: "en" | "fr";
}

export default function PricingCard({ tier, isAnnual = false, featured = false, locale = "en" }: PricingCardProps) {
  const price = isAnnual ? Math.round(tier.priceAnnual / 12) : tier.priceMonthly;
  const features = locale === "fr" ? tier.featuresFr : tier.features;
  const name = locale === "fr" ? tier.nameFr : tier.name;

  return (
    <div className={cn(
      "glass-card flex flex-col p-6 space-y-6 relative",
      featured && "border-2 border-premium-orange shadow-orange-glow"
    )}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-premium-orange text-white text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {locale === "fr" ? "Le plus populaire" : "Most Popular"}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <div className="flex items-end gap-1">
          <span className="font-mono font-extrabold text-4xl text-premium-orange tabular-nums">
            {price === 0 ? locale === "fr" ? "Gratuit" : "Free" : `$${price}`}
          </span>
          {price > 0 && (
            <span className="text-[#9CA3AF] text-sm mb-1">{locale === "fr" ? "/mois" : "/month"}</span>
          )}
        </div>
        {isAnnual && price > 0 && (
          <p className="text-xs text-trust-green">
            {locale === "fr" ? "Économisez 33 % avec l'abonnement annuel" : "Save 33% with annual billing"}
          </p>
        )}
      </div>

      <ul className="space-y-3 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-trust-green shrink-0 mt-0.5" />
            <span className="text-sm text-[#9CA3AF]">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/en${tier.id === "free" ? ROUTES.AUTH_REGISTER : ROUTES.SUBSCRIBE}`}
        className={cn(
          "flex items-center justify-center h-11 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-surface-dark",
          featured
            ? "bg-premium-orange hover:bg-premium-orange-hover text-white"
            : "border border-white/10 hover:border-white/20 text-white hover:bg-white/5"
        )}
      >
        {tier.id === "free"
          ? locale === "fr" ? "Commencer gratuitement" : "Get started free"
          : locale === "fr" ? `Choisir ${name}` : `Get ${name}`}
      </Link>
    </div>
  );
}
