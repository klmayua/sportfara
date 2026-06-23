import { cn } from "@/lib/utils/cn";
import { getTierConfig } from "@/lib/utils/sourceTier";
import type { SourceTier } from "@/lib/types/match.types";

interface SourceBadgeProps {
  tier: SourceTier;
  showLabel?: boolean;
  className?: string;
}

export default function SourceBadge({ tier, showLabel = false, className }: SourceBadgeProps) {
  const config = getTierConfig(tier);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider",
        "px-2.5 py-1 rounded-full border",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
      title={config.description}
      aria-label={`Source tier: ${config.description}`}
    >
      {tier}
      {showLabel && (
        <span className="hidden sm:inline normal-case font-normal tracking-normal">
          · {config.description}
        </span>
      )}
    </span>
  );
}
