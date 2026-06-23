import type { SourceTier } from "@/lib/types/match.types";

export const SOURCE_TIER_CONFIG: Record<
  SourceTier,
  { label: string; color: string; bgClass: string; textClass: string; borderClass: string; description: string }
> = {
  T1: {
    label: "T1",
    color: "#10B981",
    bgClass: "bg-trust-green/10",
    textClass: "text-trust-green",
    borderClass: "border-trust-green/30",
    description: "Primary source — official league data",
  },
  T2: {
    label: "T2",
    color: "#3B82F6",
    bgClass: "bg-info/10",
    textClass: "text-info",
    borderClass: "border-info/30",
    description: "Verified secondary — accredited sports media",
  },
  T3: {
    label: "T3",
    color: "#F59E0B",
    bgClass: "bg-warning/10",
    textClass: "text-warning",
    borderClass: "border-warning/30",
    description: "Aggregated — multiple unverified sources",
  },
  T4: {
    label: "T4",
    color: "#F97316",
    bgClass: "bg-premium-orange/10",
    textClass: "text-premium-orange",
    borderClass: "border-premium-orange/30",
    description: "Community — analyst judgment",
  },
};

export function getTierConfig(tier: SourceTier) {
  return SOURCE_TIER_CONFIG[tier];
}
