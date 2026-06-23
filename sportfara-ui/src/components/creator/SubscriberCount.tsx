import { cn } from "@/lib/utils/cn";
import { Users } from "lucide-react";

interface SubscriberCountProps {
  count: number;
  growth: number;
  locale?: "en" | "fr";
  className?: string;
}

export default function SubscriberCount({ count, growth, locale = "en", className }: SubscriberCountProps) {
  return (
    <div className={cn("flex items-center gap-4 glass-card p-4", className)}>
      <div className="w-10 h-10 rounded-xl bg-premium-orange/10 flex items-center justify-center">
        <Users className="w-5 h-5 text-premium-orange" />
      </div>
      <div>
        <p className="font-mono font-extrabold text-xl text-white tabular-nums">
          {count.toLocaleString()}
        </p>
        <p className="text-xs text-[#9CA3AF]">
          {locale === "fr" ? "Abonnés" : "Subscribers"} ·{" "}
          <span className="text-trust-green font-medium">+{growth}%</span>
        </p>
      </div>
    </div>
  );
}
