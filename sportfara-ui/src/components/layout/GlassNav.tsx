"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";
import { isEnabled } from "@/lib/utils/featureFlags";
import LanguageToggle from "@/components/intelligence/LanguageToggle";
import Avatar from "@/components/ui/Avatar";
import type { User } from "@/lib/types/user.types";

interface NavLink {
  label: string;
  labelFr: string;
  href: string;
  flag: keyof typeof import("@/lib/utils/featureFlags")["FLAGS"];
}

const NAV_LINKS: NavLink[] = [
  { label: "Feed", labelFr: "Fil d'actu", href: ROUTES.HOME, flag: "INTELLIGENCE_FEED" },
  { label: "Dashboard", labelFr: "Tableau de bord", href: ROUTES.DASHBOARD, flag: "BETTOR_DASHBOARD" },
  { label: "Matches", labelFr: "Matchs", href: ROUTES.MATCHES, flag: "MATCH_CENTER" },
  { label: "Betting", labelFr: "Paris", href: ROUTES.BETTING, flag: "BETTING_MODELS" },
  { label: "Community", labelFr: "Communauté", href: ROUTES.COMMUNITY, flag: "COMMUNITY_FORUMS" },
  { label: "Enterprise", labelFr: "Entreprise", href: ROUTES.ENTERPRISE, flag: "ENTERPRISE_API" },
];

interface GlassNavProps {
  user?: User | null;
  locale?: "en" | "fr";
  onLocaleToggle?: () => void;
  onSignOut?: () => void;
}

export default function GlassNav({ user, locale = "en", onLocaleToggle, onSignOut }: GlassNavProps) {
  const pathname = usePathname();
  const [_searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 shrink-0 focus:outline-none focus:ring-2 focus:ring-premium-orange rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-premium-orange flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" />
                <path d="M6 10 L10 6 L14 10 L10 14 Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">SPORTFARA</span>
          </Link>

          {/* Centre Nav — md+ */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const enabled = isEnabled(link.flag);
              const isActive = pathname?.includes(link.href) && link.href !== "/";
              const isHome = link.href === "/" && (pathname === "/" || pathname?.endsWith("/"));

              return (
                <Link
                  key={link.href}
                  href={enabled ? `/${locale}${link.href}` : "#"}
                  aria-disabled={!enabled}
                  tabIndex={enabled ? 0 : -1}
                  className={cn(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-premium-orange",
                    enabled ? "cursor-pointer" : "cursor-not-allowed opacity-40",
                    (isActive || isHome) && enabled
                      ? "text-premium-orange"
                      : enabled
                      ? "text-[#9CA3AF] hover:text-white"
                      : "text-[#9CA3AF]"
                  )}
                >
                  <span className="flex items-center gap-1">
                    {locale === "fr" ? link.labelFr : link.label}
                    {!enabled && <Lock className="w-3 h-3 inline" aria-label="locked" />}
                  </span>
                  {(isActive || isHome) && enabled && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-premium-orange rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} onToggle={onLocaleToggle ?? (() => {})} />

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              aria-label="Notifications"
              className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange"
            >
              <Bell className="w-5 h-5" />
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Avatar name={user.fullName} size="sm" />
                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="hidden sm:block text-xs text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                  >
                    Sign out
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}${ROUTES.AUTH_LOGIN}`}
                  className={cn(
                    "hidden sm:flex px-3 py-1.5 rounded-lg text-sm font-medium",
                    "text-[#9CA3AF] hover:text-white border border-white/10 hover:border-white/20",
                    "transition-colors duration-200 cursor-pointer",
                    "focus:outline-none focus:ring-2 focus:ring-premium-orange"
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href={`/${locale}${ROUTES.SUBSCRIBE}`}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-semibold",
                    "bg-premium-orange hover:bg-premium-orange-hover text-white",
                    "transition-colors duration-200 cursor-pointer",
                    "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark"
                  )}
                >
                  Get Premium
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
