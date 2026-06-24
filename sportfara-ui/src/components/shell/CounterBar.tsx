"use client";
import Link from "next/link";
import { usePaywall } from "@/lib/hooks/usePaywall";
import { useAuth } from "@/lib/hooks/useAuth";
import { ROUTES } from "@/lib/constants/routes";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function CounterBar({ locale = "en" }: { locale?: string }) {
  const { remaining, limit } = usePaywall("free");
  const { user } = useAuth();

  if (user?.tier === "premium" || user?.tier === "pro") return null;

  const now = new Date();
  const dateStr = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  const label = `${remaining} free briefing${remaining !== 1 ? "s" : ""} remaining today · ${dateStr}`;

  return (
    <div
      className="flex items-center justify-between"
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: "#1A1C26",
        borderBottom: "0.5px solid #374151",
        padding: "7px 24px",
      }}
    >
      <span className="text-sm font-bold" style={{ color: "#F59E0B" }}>
        {label}
      </span>
      <Link
        href={`/${locale}${ROUTES.SUBSCRIBE}`}
        className="text-xs underline cursor-pointer transition-colors duration-200 hover:text-white"
        style={{ color: "#6B7280" }}
      >
        Upgrade for unlimited access →
      </Link>
    </div>
  );
}
