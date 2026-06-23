import { use } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import PricingTable from "@/components/paywall/PricingTable";

export default function SubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const L = locale as "en" | "fr";
  return (
    <PageWrapper>
      <PageShell>
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-extrabold text-white">
              {L === "fr" ? "Intelligence quotidienne illimitée" : "Unlimited Daily Intelligence"}
            </h1>
            <p style={{ color: "#9CA3AF" }}>
              {L === "fr"
                ? "Analyses de matchs en anglais et en français. Annulez à tout moment."
                : "Match analysis in English and French. Cancel anytime."}
            </p>
          </div>
          <PricingTable locale={L} />
        </div>
      </PageShell>
    </PageWrapper>
  );
}
