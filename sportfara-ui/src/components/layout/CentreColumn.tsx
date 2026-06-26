"use client";
import { useModeStore } from "@/lib/stores/modeStore";
import { useSportStore } from "@/lib/stores/sportStore";
import MatchBriefCard from "@/components/intelligence/MatchBriefCard";
import IntelCard from "@/components/feed/IntelCard";
import OriginCard from "@/components/feed/OriginCard";
import FeedHeader from "@/components/feed/FeedHeader";
import BreakingBanner from "@/components/shell/BreakingBanner";
import FreeCounterBar from "@/components/feed/FreeCounterBar";
import GateCard from "@/components/feed/GateCard";
import type { MatchType } from "@/lib/types/match.types";
import type { IntelCardData } from "@/components/feed/IntelCard";
import type { OriginCardData } from "@/components/feed/OriginCard";

interface CentreColumnProps {
  signalCards: MatchType[];
  intelCards: IntelCardData[];
  originCards: OriginCardData[];
  locale?: "en" | "fr";
}

export default function CentreColumn({
  signalCards,
  intelCards,
  originCards,
  locale = "en",
}: CentreColumnProps) {
  const { activeMode } = useModeStore();
  const { activeSport } = useSportStore();

  function matchesSport(tags?: string[]): boolean {
    if (activeSport === "all") return true;
    return tags?.includes(activeSport) ?? false;
  }

  const filteredSignal  = signalCards.filter((m) => matchesSport(m.sportTags));
  const freeSignal      = filteredSignal.slice(0, 2);
  const lockedSignal    = filteredSignal.slice(2);

  const freeIntel       = intelCards.slice(0, 2);
  const lockedIntel     = intelCards.slice(2);

  const freeOrigin      = originCards.slice(0, 2);
  const lockedOrigin    = originCards.slice(2);

  const emptyMsg = `No ${activeSport === "all" ? "" : activeSport + " "}briefings today — check back later.`;

  return (
    <div>
      {/* Feed header */}
      <FeedHeader />

      {/* Breaking banner */}
      <BreakingBanner />

      {/* Counter bar */}
      <FreeCounterBar />

      {/* Feed cards — 2 free cards */}
      {activeMode === "signal" && (
        freeSignal.length > 0
          ? freeSignal.map((match, i) => (
              <div key={match.id} style={{ borderBottom: "0.5px solid #374151" }}>
                <MatchBriefCard match={match} index={i} userTier="free" locale={locale} />
              </div>
            ))
          : (
              <p className="text-sm italic text-center py-5" style={{ color: "#6B7280", padding: "20px 14px" }}>
                {emptyMsg}
              </p>
            )
      )}

      {activeMode === "intel" && (
        freeIntel.length > 0
          ? freeIntel.map((card, i) => (
              <div key={card.id} style={{ borderBottom: "0.5px solid #374151" }}>
                <IntelCard card={card} index={i} />
              </div>
            ))
          : <p style={{ fontSize: "13px", fontStyle: "italic", color: "#6B7280", padding: "20px 14px" }}>{emptyMsg}</p>
      )}

      {activeMode === "origin" && (
        freeOrigin.length > 0
          ? freeOrigin.map((card, i) => (
              <div key={card.id} style={{ borderBottom: "0.5px solid #374151" }}>
                <OriginCard card={card} index={i} defaultLang={locale} />
              </div>
            ))
          : <p style={{ fontSize: "13px", fontStyle: "italic", color: "#6B7280", padding: "20px 14px" }}>{emptyMsg}</p>
      )}

      {/* Gate card — 3rd position */}
      <GateCard locale={locale} />

      {/* Remaining locked cards (still visible for context / SEO) */}
      {activeMode === "signal" && lockedSignal.map((match, i) => (
        <div key={match.id} style={{ borderBottom: "0.5px solid #374151" }}>
          <MatchBriefCard match={match} index={i + 2} userTier="free" locale={locale} />
        </div>
      ))}

      {activeMode === "intel" && lockedIntel.map((card, i) => (
        <div key={card.id} style={{ borderBottom: "0.5px solid #374151" }}>
          <IntelCard card={card} index={i + 2} />
        </div>
      ))}

      {activeMode === "origin" && lockedOrigin.map((card, i) => (
        <div key={card.id} style={{ borderBottom: "0.5px solid #374151" }}>
          <OriginCard card={card} index={i + 2} defaultLang={locale} />
        </div>
      ))}
    </div>
  );
}
