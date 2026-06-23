import { cn } from "@/lib/utils/cn";

type CardVariant = "standard" | "glass" | "premium" | "verified" | "match";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  standard: "bg-surface-dark border border-white/10 rounded-2xl",
  glass: "glass-card",
  premium: "glass-card border-l-4 border-l-premium-orange shadow-orange-glow",
  verified: "glass-card border-l-4 border-l-trust-green shadow-green-glow",
  match: "glass-card border-l-4 border-l-premium-orange hover:bg-white/[0.07] transition-colors duration-200 cursor-pointer",
};

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4 sm:p-5",
  lg: "p-5 sm:p-6",
};

export default function Card({
  variant = "glass",
  padding = "md",
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(variantClasses[variant], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}
