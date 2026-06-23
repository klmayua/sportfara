"use client";
import { use } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import Switch from "@/components/ui/Switch";
import { useTheme } from "@/lib/hooks/useTheme";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

export default function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: paramLocale } = use(params);
  const L = paramLocale as "en" | "fr";
  const { isDark, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage(L);
  const { user } = useAuth();

  return (
    <PageWrapper>
      <PageShell>
        <div className="max-w-xl space-y-6">
          <h1 className="text-2xl font-extrabold text-white">
            {L === "fr" ? "Paramètres" : "Settings"}
          </h1>

          <div className="glass-card p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>
              {L === "fr" ? "Apparence" : "Appearance"}
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">{L === "fr" ? "Mode sombre" : "Dark mode"}</span>
              <Switch checked={isDark} onCheckedChange={toggleTheme} id="dark-toggle" />
            </div>
          </div>

          <div className="glass-card p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>
              {L === "fr" ? "Langue" : "Language"}
            </h2>
            <div className="flex gap-2">
              {(["en", "fr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={toggleLocale}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-sm font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-premium-orange",
                    locale === lang
                      ? "bg-premium-orange text-white"
                      : "border text-secondary"
                  )}
                  style={locale !== lang ? { borderColor: "rgba(255,255,255,0.1)", color: "#9CA3AF" } : {}}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>
              {L === "fr" ? "Abonnement" : "Subscription"}
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">{user?.tier === "premium" ? "Premium" : "Free"}</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{user?.email}</p>
              </div>
              <Link
                href={`/${L}${ROUTES.SETTINGS_SUBSCRIPTION}`}
                className="text-xs cursor-pointer"
                style={{ color: "#F97316" }}
              >
                {L === "fr" ? "Gérer" : "Manage"}
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    </PageWrapper>
  );
}
