import type { UserTier } from "@/lib/types/user.types";

export interface TierDefinition {
  id: UserTier;
  name: string;
  nameFr: string;
  priceMonthly: number;
  priceAnnual: number;
  color: string;
  features: string[];
  featuresFr: string[];
}

export const TIERS: TierDefinition[] = [
  {
    id: "free",
    name: "Free",
    nameFr: "Gratuit",
    priceMonthly: 0,
    priceAnnual: 0,
    color: "#9CA3AF",
    features: [
      "3 briefings per week",
      "English only",
      "Basic odds view",
      "Community access",
    ],
    featuresFr: [
      "3 bulletins par semaine",
      "Anglais uniquement",
      "Vue des cotes basique",
      "Accès communauté",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    nameFr: "Premium",
    priceMonthly: 10,
    priceAnnual: 80,
    color: "#F97316",
    features: [
      "Unlimited daily briefings",
      "English + French",
      "Full odds comparison",
      "Bettor dashboard",
      "Track record access",
      "Priority support",
    ],
    featuresFr: [
      "Bulletins quotidiens illimités",
      "Anglais + Français",
      "Comparaison des cotes complète",
      "Tableau de bord parieur",
      "Accès au palmarès",
      "Support prioritaire",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    nameFr: "Pro",
    priceMonthly: 25,
    priceAnnual: 200,
    color: "#10B981",
    features: [
      "Everything in Premium",
      "Creator Hub access",
      "API access",
      "Scouting database",
      "Custom alerts",
      "White-glove onboarding",
    ],
    featuresFr: [
      "Tout inclus dans Premium",
      "Accès Espace Créateur",
      "Accès API",
      "Base de données de détection",
      "Alertes personnalisées",
      "Onboarding personnalisé",
    ],
  },
];
