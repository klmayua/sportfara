"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import CreatorStatCard from "@/components/creator/CreatorStatCard";
import ContentPublisher from "@/components/creator/ContentPublisher";
import ContentTable from "@/components/creator/ContentTable";
import EarningsDisplay from "@/components/creator/EarningsDisplay";
import PayoutStatus from "@/components/creator/PayoutStatus";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { DollarSign, Users, Eye, TrendingUp } from "lucide-react";
import type { Article } from "@/lib/types/content.types";
import type { PayoutRecord } from "@/lib/types/creator.types";

const SAMPLE_ARTICLES: Article[] = [
  { id: "a1", title: "Sundowns vs Chiefs: 12-game unbeaten run tells the story", titleFr: "Sundowns vs Chiefs : 12 matchs sans défaite, l'histoire est claire", bodyEn: "", bodyFr: "", paywall: "premium", language: "both", status: "published", publishedAt: "2026-06-22", creatorId: "usr_demo", views: 4821, conversions: 203, revenue: 284, readTime: 5 },
  { id: "a2", title: "Kenya Derby: Why Gor Mahia Over 1.5 Goals is the value pick", titleFr: "Derby du Kenya : Gor Mahia Plus de 1.5 buts, le choix de valeur", bodyEn: "", bodyFr: "", paywall: "free", language: "both", status: "published", publishedAt: "2026-06-21", creatorId: "usr_demo", views: 8103, conversions: 0, revenue: 0, readTime: 4 },
  { id: "a3", title: "Botola Pro Derby: 4 draws in 6 — the draw is back in play", titleFr: "Derby Botola Pro : 4 nuls en 6 matchs — le nul revient", bodyEn: "", bodyFr: "", paywall: "premium", language: "both", status: "published", publishedAt: "2026-06-20", creatorId: "usr_demo", views: 3241, conversions: 187, revenue: 261, readTime: 6 },
  { id: "a4", title: "West Africa Transfer Radar: Five players to watch this window", titleFr: "Radar transferts Afrique de l'Ouest : 5 joueurs à surveiller", bodyEn: "", bodyFr: "", paywall: "pro", language: "both", status: "published", publishedAt: "2026-06-18", creatorId: "usr_demo", views: 2196, conversions: 94, revenue: 329, readTime: 8 },
  { id: "a5", title: "ASEC Mimosas: The data behind Africa's most dangerous attack", titleFr: "ASEC Mimosas : Les données derrière l'attaque la plus dangereuse", bodyEn: "", bodyFr: "", paywall: "premium", language: "both", status: "published", publishedAt: "2026-06-15", creatorId: "usr_demo", views: 5934, conversions: 321, revenue: 449, readTime: 7 },
];

const PAYOUT_HISTORY: PayoutRecord[] = [
  { id: "p1", amount: 980, currency: "USD", method: "paystack", status: "paid", paidAt: "June 15, 2026", periodStart: "2026-05-01", periodEnd: "2026-05-31" },
  { id: "p2", amount: 743, currency: "USD", method: "paystack", status: "paid", paidAt: "May 15, 2026", periodStart: "2026-04-01", periodEnd: "2026-04-30" },
];

export default function CreatorPage() {
  const { locale } = useLanguage();
  const L = locale as "en" | "fr";

  return (
    <PageWrapper>
      <PageShell>
        <div className="space-y-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-extrabold text-white">
                {L === "fr" ? "Bon retour, James" : "Welcome back, James"}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {L === "fr" ? "Espace Créateur" : "Creator Hub"}
              </p>
            </div>
            <Badge variant="premium">
              {L === "fr" ? "Créateur fondateur" : "Founding Creator"}
            </Badge>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CreatorStatCard label={L === "fr" ? "Revenus" : "Revenue"} value="$1,247" change={12} icon={<DollarSign className="w-4 h-4" />} />
            <CreatorStatCard label={L === "fr" ? "Abonnés" : "Subscribers"} value="847" change={8} icon={<Users className="w-4 h-4" />} />
            <CreatorStatCard label="Views" value="24.5K" change={23} icon={<Eye className="w-4 h-4" />} />
            <CreatorStatCard label={L === "fr" ? "Conversion" : "Conversion"} value="4.2%" change={0.5} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          {/* Content Publisher */}
          <div className="glass-card p-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-6">
              {L === "fr" ? "Nouvel article" : "New Article"}
            </h2>
            <ContentPublisher locale={L} />
          </div>

          {/* Content table */}
          <ContentTable articles={SAMPLE_ARTICLES} locale={L} />

          {/* Earnings + Payout in 2-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EarningsDisplay
              monthlyEarnings={1247}
              nextPayoutDate={L === "fr" ? "15 juillet 2026" : "July 15, 2026"}
              payoutStatus="on_track"
              locale={L}
            />
            <PayoutStatus payouts={PAYOUT_HISTORY} locale={L} />
          </div>
        </div>
      </PageShell>
    </PageWrapper>
  );
}
