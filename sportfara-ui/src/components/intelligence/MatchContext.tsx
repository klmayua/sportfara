import { cn } from "@/lib/utils/cn";

interface MatchContextProps {
  homeTeam: string;
  awayTeam: string;
  locale?: "en" | "fr";
  className?: string;
}

function FormDot({ result }: { result: "W" | "D" | "L" }) {
  const classes = {
    W: "bg-trust-green text-white",
    D: "bg-warning text-white",
    L: "bg-error text-white",
  };
  return (
    <span
      className={cn("w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono", classes[result])}
      aria-label={result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"}
    >
      {result}
    </span>
  );
}

const MOCK_HOME_FORM: Array<"W" | "D" | "L"> = ["W", "W", "D", "W", "L"];
const MOCK_AWAY_FORM: Array<"W" | "D" | "L"> = ["D", "W", "L", "D", "L"];

export default function MatchContext({ homeTeam, awayTeam, locale = "en", className }: MatchContextProps) {
  return (
    <div className={cn("space-y-3 pt-3 border-t border-white/5", className)}>
      <p className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
        {locale === "fr" ? "Forme récente" : "Recent Form"}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-[#9CA3AF] truncate max-w-24">{homeTeam}</span>
          <div className="flex gap-1">
            {MOCK_HOME_FORM.map((r, i) => <FormDot key={i} result={r} />)}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-[#9CA3AF] truncate max-w-24">{awayTeam}</span>
          <div className="flex gap-1">
            {MOCK_AWAY_FORM.map((r, i) => <FormDot key={i} result={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
