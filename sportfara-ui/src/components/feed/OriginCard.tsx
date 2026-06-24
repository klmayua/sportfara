"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface OriginCardData {
  id: string;
  locationTag: string;
  flag: string;
  headlineEn: string;
  headlineFr: string;
  deckEn: string;
  deckFr: string;
}

interface OriginCardProps {
  card: OriginCardData;
  index: number;
  defaultLang?: "en" | "fr";
}

export default function OriginCard({ card, index, defaultLang = "en" }: OriginCardProps) {
  const [lang, setLang] = useState<"en" | "fr">(defaultLang);

  const headline = lang === "fr" ? card.headlineFr : card.headlineEn;
  const deck     = lang === "fr" ? card.deckFr     : card.deckEn;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className={cn(
        "glass-card border-l-4",
        "hover:bg-white/[0.07] transition-colors duration-200",
        "space-y-4 p-5"
      )}
      style={{ borderLeftColor: "#10B981" }}
    >
      <p className="font-mono text-xs uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
        {card.flag} {card.locationTag}
      </p>

      <h2 className="text-lg font-bold text-white leading-snug">{headline}</h2>

      <p
        className="text-sm leading-relaxed"
        style={{
          color: "#9CA3AF",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {deck}
      </p>

      <div className="flex gap-2">
        {(["EN", "FR"] as const).map((l) => {
          const isActive = lang === l.toLowerCase();
          return (
            <button
              key={l}
              onClick={() => setLang(l.toLowerCase() as "en" | "fr")}
              className="text-xs font-mono font-bold px-3 py-1 rounded-full cursor-pointer transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-premium-orange"
              style={
                isActive
                  ? { backgroundColor: "white", color: "#1A1C26" }
                  : { border: "1px solid #374151", color: "#6B7280", backgroundColor: "transparent" }
              }
              aria-pressed={isActive}
            >
              {l}
            </button>
          );
        })}
      </div>
    </motion.article>
  );
}
