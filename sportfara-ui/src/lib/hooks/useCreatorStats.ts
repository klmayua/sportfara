"use client";
import { useMemo } from "react";
import type { CreatorStats } from "@/lib/types/creator.types";

const MOCK_STATS: CreatorStats = {
  revenue: 1247,
  revenueChange: 12,
  subscribers: 847,
  subscribersChange: 8,
  views: 24500,
  viewsChange: 23,
  conversion: 4.2,
  conversionChange: 0.5,
};

export function useCreatorStats(_creatorId?: string): {
  stats: CreatorStats;
  isLoading: boolean;
} {
  const stats = useMemo(() => MOCK_STATS, []);
  return { stats, isLoading: false };
}
