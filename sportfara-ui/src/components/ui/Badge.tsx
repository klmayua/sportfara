import { cn } from "@/lib/utils/cn";
import type { SourceTier } from "@/lib/types/match.types";

type BadgeVariant = "tier" | "premium" | "live" | "verified" | "pro" | "free" | "beta" | "new";

interface BadgeProps {
  variant?: BadgeVariant;
  tier?: SourceTier;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  tier: "",
  premium: "bg-premium-orange/10 text-premium-orange border border-premium-orange/30",
  live: "bg-error/10 text-error border border-error/30 animate-pulse",
  verified: "bg-trust-green/10 text-trust-green border border-trust-green/30",
  pro: "bg-info/10 text-info border border-info/30",
  free: "bg-white/5 text-[#9CA3AF] border border-white/10",
  beta: "bg-warning/10 text-warning border border-warning/30",
  new: "bg-premium-orange/10 text-premium-orange border border-premium-orange/30",
};

const tierClasses: Record<SourceTier, string> = {
  T1: "bg-trust-green/10 text-trust-green border border-trust-green/30",
  T2: "bg-info/10 text-info border border-info/30",
  T3: "bg-warning/10 text-warning border border-warning/30",
  T4: "bg-premium-orange/10 text-premium-orange border border-premium-orange/30",
};

export default function Badge({ variant = "premium", tier, children, className }: BadgeProps) {
  const classes =
    variant === "tier" && tier
      ? tierClasses[tier]
      : variantClasses[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider",
        "px-2 py-0.5 rounded-full",
        classes,
        className
      )}
    >
      {variant === "tier" && tier ? tier : children}
    </span>
  );
}
