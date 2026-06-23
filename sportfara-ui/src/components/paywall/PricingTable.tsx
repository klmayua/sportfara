"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import PricingCard from "./PricingCard";
import { TIERS } from "@/lib/constants/tiers";
import Switch from "@/components/ui/Switch";

interface PricingTableProps {
  locale?: "en" | "fr";
}

export default function PricingTable({ locale = "en" }: PricingTableProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="space-y-8">
      {/* Annual toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={cn("text-sm", !isAnnual ? "text-white" : "text-[#9CA3AF]")}>
          {locale === "fr" ? "Mensuel" : "Monthly"}
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          id="billing-toggle"
        />
        <span className={cn("text-sm flex items-center gap-2", isAnnual ? "text-white" : "text-[#9CA3AF]")}>
          {locale === "fr" ? "Annuel" : "Annual"}
          <span className="text-xs text-trust-green font-medium bg-trust-green/10 px-2 py-0.5 rounded-full">
            {locale === "fr" ? "−33 %" : "Save 33%"}
          </span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            isAnnual={isAnnual}
            featured={tier.id === "premium"}
            locale={locale}
          />
        ))}
      </div>

      <p className="text-center text-xs text-[#6B7280]">
        {locale === "fr"
          ? "Devise locale disponible à la caisse. Annulation à tout moment."
          : "Local currency available at checkout. Cancel anytime."}
      </p>
    </div>
  );
}
