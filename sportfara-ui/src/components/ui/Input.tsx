import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";
import { Search } from "lucide-react";

type InputVariant = "default" | "search" | "glass";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", label, error, leftIcon, className, id, ...props }, ref) => {
    const inputClasses = cn(
      "w-full h-10 rounded-xl text-sm text-white placeholder:text-[#6B7280]",
      "transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:border-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      leftIcon || variant === "search" ? "pl-10 pr-4" : "px-4",
      variant === "glass"
        ? "bg-white/5 border border-white/10 hover:border-white/20"
        : "bg-surface-dark border border-white/10 hover:border-white/20",
      error && "border-error focus:ring-error",
      className
    );

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[#9CA3AF]">
            {label}
          </label>
        )}
        <div className="relative">
          {(leftIcon || variant === "search") && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {leftIcon ?? <Search className="w-4 h-4" />}
            </div>
          )}
          <input ref={ref} id={id} className={inputClasses} {...props} />
        </div>
        {error && (
          <p className="text-xs text-error" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
