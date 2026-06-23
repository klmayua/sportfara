"use client";
import { cn } from "@/lib/utils/cn";
import type { PaywallGate } from "@/lib/types/content.types";

interface PaywallSelectorProps {
  value: PaywallGate;
  onChange: (gate: PaywallGate) => void;
  locale?: "en" | "fr";
}

const OPTIONS: Array<{ value: PaywallGate; label: string; labelFr: string; description: string }> = [
  { value: "free", label: "Free", labelFr: "Gratuit", description: "Visible to all readers" },
  { value: "premium", label: "Premium", labelFr: "Premium", description: "Premium subscribers only" },
  { value: "pro", label: "Pro", labelFr: "Pro", description: "Pro tier only" },
];

export default function PaywallSelector({ value, onChange, locale = "en" }: PaywallSelectorProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="Paywall gate">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            "flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-premium-orange",
            value === opt.value
              ? "bg-premium-orange text-white shadow-orange-glow"
              : "bg-transparent border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/20"
          )}
        >
          {locale === "fr" ? opt.labelFr : opt.label}
        </button>
      ))}
    </div>
  );
}
