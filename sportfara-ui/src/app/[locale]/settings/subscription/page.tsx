import { use } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import PricingTable from "@/components/paywall/PricingTable";

export default function SubscriptionSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const L = locale as "en" | "fr";
  return (
    <PageWrapper>
      <PageShell>
        <div className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white">
            {L === "fr" ? "Gérer l'abonnement" : "Manage Subscription"}
          </h1>
          <PricingTable locale={L} />
        </div>
      </PageShell>
    </PageWrapper>
  );
}
