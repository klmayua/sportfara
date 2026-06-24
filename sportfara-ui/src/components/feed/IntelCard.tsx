"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import SourceBadge from "@/components/intelligence/SourceBadge";
import type { SourceTier } from "@/lib/types/match.types";

interface IntelStat {
  number: string;
  label: string;
}

export interface IntelCardData {
  id: string;
  headline: string;
  author: string;
  sourceTier: SourceTier;
  readTime: string;
  excerpt: string;
  stats: [IntelStat, IntelStat, IntelStat];
}

interface IntelCardProps {
  card: IntelCardData;
  index: number;
}

export default function IntelCard({ card, index }: IntelCardProps) {
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
      style={{ borderLeftColor: "#3B82F6" }}
    >
      <h2 className="text-lg font-bold text-white leading-snug">{card.headline}</h2>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs" style={{ color: "#9CA3AF" }}>{card.author}</span>
        <SourceBadge tier={card.sourceTier} />
        <span className="text-xs" style={{ color: "#6B7280" }}>{card.readTime}</span>
      </div>

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
        {card.excerpt}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {card.stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-lg text-center"
            style={{ backgroundColor: "#1A1C26", padding: "10px 8px" }}
          >
            <p className="text-base font-bold text-white tabular-nums">{stat.number}</p>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
