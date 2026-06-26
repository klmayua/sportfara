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
    <aside className={cn("hidden lg:flex flex-col gap-4 w-80 shrink-0", className)}>
      {children}
    </aside>
  );
}

export function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-4 space-y-3">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "#6B7280" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

type PickResult = "W" | "L" | "D";

const DOT_COLOUR: Record<PickResult, string> = {
  W: "#00C853",
  L: "#FF1744",
  D: "#4B5563",
};

export function AnalystCard({
  name, winRate, picks, href, signature, last5,
}: {
  name: string;
  winRate: number;
  picks: number;
  href: string;
  signature?: string;
  last5?: PickResult[];
}) {
  return (
    <div className="py-2 border-b border-white/5 last:border-0 space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-premium-orange/20 flex items-center justify-center text-premium-orange text-xs font-bold shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{name}</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              {picks} picks · {winRate}% win
            </p>
          </div>
        </div>
        <Link
          href={href}
          className="text-xs text-premium-orange hover:text-premium-orange-hover font-medium transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-premium-orange rounded shrink-0"
        >
          Follow
        </Link>
      </div>

      {signature && (
        <p
          className="italic leading-snug"
          style={{ fontSize: "10px", color: "#9CA3AF", lineHeight: 1.3, paddingLeft: "44px" }}
        >
          &ldquo;{signature}&rdquo;
        </p>
      )}

      {last5 && last5.length > 0 && (
        <div className="flex items-center gap-1" style={{ paddingLeft: "44px" }}>
          {last5.map((result, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-full"
              style={{
                width: "16px", height: "16px",
                backgroundColor: DOT_COLOUR[result],
                fontSize: "8px", fontWeight: 700, color: "#FFFFFF",
              }}
              aria-label={result === "W" ? "Win" : result === "L" ? "Loss" : "Draw"}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
