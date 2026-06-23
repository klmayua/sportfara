"use client";
import { useMemo } from "react";
import type { UserTier } from "@/lib/types/user.types";
import { TIERS } from "@/lib/constants/tiers";

export function useSubscription(tier: UserTier = "free") {
  const currentTier = useMemo(
    () => TIERS.find((t) => t.id === tier) ?? TIERS[0],
    [tier]
  );

  const canAccess = (requiredTier: UserTier): boolean => {
    const order: UserTier[] = ["free", "premium", "pro"];
    return order.indexOf(tier) >= order.indexOf(requiredTier);
  };

  const isPremium = tier === "premium" || tier === "pro";
  const isPro = tier === "pro";

  return { currentTier, canAccess, isPremium, isPro, tier };
}
