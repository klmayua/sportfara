"use client";
import { cn } from "@/lib/utils/cn";

interface LanguageToggleProps {
  locale: "en" | "fr";
  onToggle: () => void;
  className?: string;
}

export default function LanguageToggle({ locale, onToggle, className }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch language. Current: ${locale === "en" ? "English" : "French"}`}
      className={cn(
        "flex items-center h-7 rounded-lg overflow-hidden border border-white/10",
        "bg-white/5 font-mono text-xs font-bold tracking-wider",
        "transition-colors duration-200 hover:border-white/20 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-premium-orange",
        className
      )}
    >
      <span
        className={cn(
          "px-2.5 py-1 transition-colors duration-200",
          locale === "en" ? "bg-premium-orange text-white" : "text-[#9CA3AF]"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "px-2.5 py-1 transition-colors duration-200",
          locale === "fr" ? "bg-premium-orange text-white" : "text-[#9CA3AF]"
        )}
      >
        FR
      </span>
    </button>
  );
}
