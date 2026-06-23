"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, TrendingUp, User, PenSquare, Lock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/constants/routes";
import { isEnabled } from "@/lib/utils/featureFlags";
import type { User as UserType } from "@/lib/types/user.types";

interface BottomNavProps {
  user?: UserType | null;
  locale?: string;
}

interface NavItem {
  label: string;
  labelFr: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  flag: Parameters<typeof isEnabled>[0];
  requiresCreator?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", labelFr: "Accueil", href: ROUTES.HOME, Icon: Home, flag: "INTELLIGENCE_FEED" },
  { label: "Matches", labelFr: "Matchs", href: ROUTES.MATCHES, Icon: Calendar, flag: "MATCH_CENTER" },
  { label: "Betting", labelFr: "Paris", href: ROUTES.BETTING, Icon: TrendingUp, flag: "BETTING_MODELS" },
  { label: "Creator", labelFr: "Créateur", href: ROUTES.CREATOR, Icon: PenSquare, flag: "CREATOR_DASHBOARD", requiresCreator: true },
  { label: "Profile", labelFr: "Profil", href: ROUTES.DASHBOARD, Icon: User, flag: "BETTOR_DASHBOARD" },
];

export default function BottomNav({ user, locale = "en" }: BottomNavProps) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.requiresCreator && user?.role !== "creator") return false;
    return true;
  });

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface-dark/90 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {visibleItems.map((item) => {
          const enabled = isEnabled(item.flag);
          const isActive = pathname?.includes(item.href) && item.href !== "/";
          const isHome = item.href === "/" && (pathname === "/" || pathname?.endsWith("/"));
          const active = isActive || isHome;

          return (
            <Link
              key={item.href}
              href={enabled ? `/${locale}${item.href}` : "#"}
              aria-disabled={!enabled}
              tabIndex={enabled ? 0 : -1}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-premium-orange",
                !enabled && "opacity-40 cursor-not-allowed",
                enabled && "cursor-pointer"
              )}
            >
              <div className="relative">
                <item.Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    active && enabled ? "text-premium-orange" : "text-[#9CA3AF]"
                  )}
                />
                {!enabled && (
                  <Lock className="w-2.5 h-2.5 text-[#6B7280] absolute -top-1 -right-1" />
                )}
              </div>
              <span
                className={cn(
                  "text-2xs font-medium transition-colors duration-200",
                  active && enabled ? "text-premium-orange" : "text-[#9CA3AF]"
                )}
              >
                {locale === "fr" ? item.labelFr : item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
