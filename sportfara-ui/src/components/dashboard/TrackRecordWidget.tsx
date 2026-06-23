"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

interface TrackRecordWidgetProps {
  analystName: string;
  winRate: number;
  roi: number;
  totalPicks: number;
  pnlData: Array<{ date: string; units: number }>;
  locale?: "en" | "fr";
  className?: string;
}

export default function TrackRecordWidget({
  analystName,
  winRate,
  roi,
  totalPicks,
  pnlData,
  locale = "en",
  className,
}: TrackRecordWidgetProps) {
  return (
    <div className={cn("glass-card border-l-4 border-l-trust-green shadow-green-glow p-5 space-y-5", className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar name={analystName} size="md" />
        <div>
          <p className="font-bold text-white">{analystName}</p>
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-trust-green bg-trust-green/10 border border-trust-green/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {locale === "fr" ? "Analyste vérifié" : "Verified Analyst"}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5">
        {[
          { label: locale === "fr" ? "Taux victoire" : "Win Rate", value: `${winRate}%` },
          { label: locale === "fr" ? "ROI 30j" : "30d ROI", value: `+${roi}u` },
          { label: locale === "fr" ? "Sélections" : "Total Picks", value: String(totalPicks) },
        ].map(({ label, value }) => (
          <div key={label} className="text-center space-y-1">
            <p className="font-mono font-extrabold text-2xl text-premium-orange tabular-nums">{value}</p>
            <p className="text-2xs font-mono uppercase tracking-wider text-[#9CA3AF]">{label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-3">
          {locale === "fr" ? "P&L 90 derniers jours" : "P&L Last 90 Days"}
        </p>
        <div className="h-40" aria-label="Profit and loss chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pnlData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#1A1C26", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                labelStyle={{ color: "#9CA3AF", fontSize: 11 }}
                itemStyle={{ color: "#F97316", fontFamily: "JetBrains Mono, monospace", fontWeight: "bold" }}
              />
              <Area type="monotone" dataKey="units" stroke="#F97316" strokeWidth={2} fill="url(#pnlGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-[#6B7280] italic">
        {locale === "fr"
          ? "Le palmarès est immuable et publiquement vérifiable."
          : "Track record is immutable and publicly verifiable."}
      </p>
    </div>
  );
}
