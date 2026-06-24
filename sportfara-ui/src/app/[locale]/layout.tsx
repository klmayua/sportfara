"use client";
import { use } from "react";
import { Inter } from "next/font/google";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";
import GlassNav from "@/components/layout/GlassNav";
import BottomNav from "@/components/layout/BottomNav";
import TickerBar from "@/components/shell/TickerBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = use(params);
  const { locale, toggleLocale } = useLanguage((paramLocale as "en" | "fr") ?? "en");
  const { user, signOut } = useAuth();

  return (
    <div className={`${inter.variable} font-sans`}>
      {/* Ticker: fixed top-0, z-60, 32px */}
      <TickerBar />
      {/* Nav: fixed top-8 (32px offset), z-50 */}
      <div style={{ position: "fixed", top: "32px", left: 0, right: 0, zIndex: 50 }}>
        <GlassNav
          user={user}
          locale={locale as "en" | "fr"}
          onLocaleToggle={toggleLocale}
          onSignOut={signOut}
        />
      </div>
      {/* Content: pt accounts for ticker (32px) + nav (64px) = 96px */}
      <div className="pb-20 md:pb-0 min-h-dvh" style={{ paddingTop: "96px" }}>
        {children}
      </div>
      <BottomNav user={user} locale={locale} />
    </div>
  );
}
