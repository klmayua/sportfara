import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "glass" | "green" | "danger";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-premium-orange hover:bg-premium-orange-hover text-white border-transparent shadow-orange-glow hover:shadow-orange-glow-lg",
  secondary:
    "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20",
  ghost:
    "bg-transparent hover:bg-white/5 text-[#9CA3AF] hover:text-white border border-white/10 hover:border-white/20",
  glass:
    "bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white border border-white/10 hover:border-white/20",
  green:
    "bg-trust-green hover:bg-trust-green-hover text-white border-transparent shadow-green-glow",
  danger:
    "bg-error/10 hover:bg-error/20 text-error border border-error/30 hover:border-error/50",
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-3 text-xs rounded-lg gap-1.5",
  sm: "h-8 px-4 text-sm rounded-lg gap-2",
  md: "h-10 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium cursor-pointer",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
