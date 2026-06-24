"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";
import { ROUTES } from "@/lib/constants/routes";
import { usePaywall } from "@/lib/hooks/usePaywall";

const UVP_CONTENT: Record<ActiveMode, {
  headline: string;
  copy: string;
  trust: string;
  cta: string;
  sub: string;
}> = {
  signal: {
    headline: "Where is the real edge today?",
    copy: "Stop guessing. Every match — EPL, NPFL, La Liga, UCL, AFCON — verified data tells you where the real edge is before the odds close.",
    trust: "Trusted by 2,400 bettors across Nigeria and Kenya · Global markets",
    cta: "Get Signal · $5 / month",
    sub: "Pay with Paystack — Naira, Shilling, Rand, or card",
  },
  intel: {
    headline: "Your briefing desk. Every market. Sourced.",
    copy: "African sport moves fast. Global sport moves faster. SPORTFARA is your briefing desk — structured, verified, ready before your deadline.",
    trust: "Used by sports journalists in 8 African markets",
    cta: "Get Intel · $15 / month",
    sub: "Used by journalists in 8 African markets",
  },
  origin: {
    headline: "Home never stops. Neither does the world.",
    copy: "African leagues, global tournaments, in English and French. The sports intelligence your city does not have — wherever you are.",
    trust: "Followed by 14,000 Africans abroad · EN + FR daily",
    cta: "Get Origin · $12 / month",
    sub: "Available in English and French",
  },
};

export default function UVPZone({ locale = "en" }: { locale?: string }) {
  const { activeMode } = useModeStore();
  const { remaining } = usePaywall("free");
  const content = UVP_CONTENT[activeMode];

  return (
    <div style={{ borderBottom: "0.5px solid #374151" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          style={{ padding: "14px 24px 16px" }}
          className="space-y-3"
        >
          <h2 className="text-xl font-bold text-white">{content.headline}</h2>

          <p className="text-sm italic leading-relaxed" style={{ color: "#9CA3AF", lineHeight: 1.6 }}>
            {content.copy}
          </p>

          <div className="flex items-center gap-2">
            <span
              className="inline-block rounded-full shrink-0"
              style={{ width: "5px", height: "5px", backgroundColor: "#10B981" }}
              aria-hidden="true"
            />
            <span className="text-xs" style={{ color: "#9CA3AF" }}>{content.trust}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/${locale}${ROUTES.SUBSCRIBE}`}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-premium-orange hover:bg-premium-orange-hover text-white text-sm font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange whitespace-nowrap"
            >
              {content.cta}
            </Link>
            <span className="text-sm" style={{ color: "#9CA3AF" }}>
              or{" "}
              <span style={{ color: "#F59E0B" }} className="font-bold">
                {remaining}
              </span>{" "}
              free briefing{remaining !== 1 ? "s" : ""} today — no sign-in needed
            </span>
          </div>

          <p className="text-xs" style={{ color: "#6B7280" }}>{content.sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
