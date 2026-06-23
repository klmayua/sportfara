import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { Article } from "@/lib/types/content.types";

interface ContentTableProps {
  articles: Article[];
  locale?: "en" | "fr";
  className?: string;
}

const paywallColors = {
  free: "text-[#9CA3AF]",
  premium: "text-premium-orange",
  pro: "text-trust-green",
};

export default function ContentTable({ articles, locale = "en", className }: ContentTableProps) {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      <div className="p-5 border-b border-white/5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
          {locale === "fr" ? "Performance des articles" : "Article Performance"}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Content performance table">
          <thead>
            <tr className="border-b border-white/5">
              {[locale === "fr" ? "Titre" : "Title",
                locale === "fr" ? "Vues" : "Views",
                locale === "fr" ? "Conversions" : "Conversions",
                locale === "fr" ? "Revenus" : "Revenue",
                "Gate"
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-[#6B7280]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-white font-medium max-w-48 truncate">{article.title}</td>
                <td className="px-4 py-3 font-mono tabular-nums text-[#9CA3AF]">
                  {article.views.toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-[#9CA3AF]">
                  {article.conversions.toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-trust-green">
                  {formatCurrency(article.revenue)}
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-mono font-bold uppercase", paywallColors[article.paywall])}>
                    {article.paywall}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
