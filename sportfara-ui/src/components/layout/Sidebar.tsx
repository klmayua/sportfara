import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { User } from "@/lib/types/user.types";

interface SidebarProps {
  user?: User | null;
  locale?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col gap-4 w-80 shrink-0",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-4 space-y-3">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function AnalystCard({
  name,
  winRate,
  picks,
  href,
}: {
  name: string;
  winRate: number;
  picks: number;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-premium-orange/20 flex items-center justify-center text-premium-orange text-xs font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-[#6B7280]">{picks} picks · {winRate}% win</p>
        </div>
      </div>
      <Link
        href={href}
        className="text-xs text-premium-orange hover:text-premium-orange-hover font-medium transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-premium-orange rounded"
      >
        Follow
      </Link>
    </div>
  );
}
