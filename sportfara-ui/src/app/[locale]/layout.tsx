"use client";
import { use } from "react";
import { Inter } from "next/font/google";
import { useLanguage } from "@/lib/hooks/useLanguage";
import { useAuth } from "@/lib/hooks/useAuth";
import GlassNav from "@/components/layout/GlassNav";
import BottomNav from "@/components/layout/BottomNav";

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
      <GlassNav
        user={user}
        locale={locale as "en" | "fr"}
        onLocaleToggle={toggleLocale}
        onSignOut={signOut}
      />
      <div className="pt-16 pb-20 md:pb-0 min-h-dvh">
        {children}
      </div>
      <BottomNav user={user} locale={locale} />
    </div>
  );
}
