"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePaywall } from "@/lib/hooks/usePaywall";
import { useTrialStore } from "@/lib/stores/trialStore";
import { getTrialState } from "@/lib/utils/trialSignup";

interface FreeCounterBarProps {
  onUpgradeClick?: () => void;
}

export default function FreeCounterBar({ onUpgradeClick }: FreeCounterBarProps) {
  const { user } = useAuth();
  const { remaining } = usePaywall("free");
  const { status, trialDaysRemaining, briefingsUsedToday, setTrialState } = useTrialStore();

  useEffect(() => {
    const t = getTrialState();
    if (t.isOnTrial) {
      setTrialState({
        status: "trial",
        trialDaysRemaining: t.daysRemaining,
        briefingsUsedToday: 0,
      });
    }
  }, [setTrialState]);

  if (user?.tier === "premium" || user?.tier === "pro") return null;

  let label: string;
  if (status === "trial") {
    const day = Math.max(1, 7 - trialDaysRemaining + 1);
    label = `Day ${day} of 7 — ${trialDaysRemaining} day${trialDaysRemaining !== 1 ? "s" : ""} left`;
  } else {
    const used = 2 - remaining;
    label = `${remaining} free briefing${remaining !== 1 ? "s" : ""} today — reading briefing ${used + 1} of 2`;
  }

  function handleUpgradeClick(e: React.MouseEvent) {
    e.preventDefault();
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      document.getElementById("gate-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div
      style={{
        padding: "6px 14px",
        backgroundColor: "#1A1C26",
        borderBottom: "0.5px solid #374151",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "11px", fontWeight: 700, color: "#F59E0B" }}>
        {label}
      </span>
      {status !== "trial" && (
        <button
          onClick={handleUpgradeClick}
          className="cursor-pointer hover:text-white transition-colors duration-150 underline focus:outline-none"
          style={{ fontSize: "11px", color: "#6B7280" }}
        >
          Upgrade for unlimited →
        </button>
      )}
    </div>
  );
}
