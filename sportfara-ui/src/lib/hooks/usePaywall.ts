"use client";
import { useState, useEffect } from "react";
import type { UserTier } from "@/lib/types/user.types";

const FREE_BRIEFINGS_LIMIT = 3;
const STORAGE_KEY = "sf-free-reads";

export function usePaywall(userTier: UserTier = "free") {
  const [freeReadsUsed, setFreeReadsUsed] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    setFreeReadsUsed(stored);
  }, []);

  const isGated = (index: number): boolean => {
    if (userTier !== "free") return false;
    return index >= FREE_BRIEFINGS_LIMIT;
  };

  const recordRead = () => {
    if (userTier !== "free") return;
    const next = freeReadsUsed + 1;
    setFreeReadsUsed(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  const remaining = Math.max(0, FREE_BRIEFINGS_LIMIT - freeReadsUsed);
  const hasReachedLimit = userTier === "free" && freeReadsUsed >= FREE_BRIEFINGS_LIMIT;

  return { freeReadsUsed, remaining, hasReachedLimit, isGated, recordRead, limit: FREE_BRIEFINGS_LIMIT };
}
