"use client";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import PaywallSelector from "./PaywallSelector";
import Switch from "@/components/ui/Switch";
import type { PaywallGate, ContentLanguage } from "@/lib/types/content.types";

interface ContentPublisherProps {
  locale?: "en" | "fr";
  onPublish?: (data: { title: string; bodyEn: string; bodyFr: string; paywall: PaywallGate }) => void;
  className?: string;
}

type LangTab = "en" | "fr" | "both";

export default function ContentPublisher({ locale = "en", onPublish, className }: ContentPublisherProps) {
  const [title, setTitle] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [bodyFr, setBodyFr] = useState("");
  const [langTab, setLangTab] = useState<LangTab>("both");
  const [paywall, setPaywall] = useState<PaywallGate>("free");
  const [publishNow, setPublishNow] = useState(true);

  const wordCount = useMemo(() => {
    const combined = `${bodyEn} ${bodyFr}`.trim();
    return combined ? combined.split(/\s+/).length : 0;
  }, [bodyEn, bodyFr]);

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handlePublish = () => {
    if (!title) return;
    onPublish?.({ title, bodyEn, bodyFr, paywall });
  };

  return (
    <div className={cn("space-y-5", className)}>
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={locale === "fr" ? "Titre de l'article..." : "Article title..."}
        aria-label={locale === "fr" ? "Titre de l'article" : "Article title"}
        className={cn(
          "w-full bg-transparent border-b border-white/10 hover:border-white/20 py-3",
          "text-2xl font-bold text-white placeholder:text-[#4B5563]",
          "focus:outline-none focus:border-premium-orange transition-colors duration-200"
        )}
      />

      {/* Language selector */}
      <div className="flex gap-2">
        {(["en", "fr", "both"] as LangTab[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLangTab(l)}
            aria-pressed={langTab === l}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-premium-orange",
              langTab === l
                ? "bg-premium-orange text-white"
                : "bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white"
            )}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Body editors */}
      <div className="space-y-4">
        {(langTab === "en" || langTab === "both") && (
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">EN</label>
            <textarea
              value={bodyEn}
              onChange={(e) => setBodyEn(e.target.value)}
              placeholder="Write your match analysis in English..."
              aria-label="Article body (English)"
              rows={10}
              className={cn(
                "w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4",
                "text-sm text-white placeholder:text-[#4B5563] font-mono resize-y min-h-[200px]",
                "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:border-transparent",
                "transition-colors duration-200"
              )}
            />
          </div>
        )}
        {(langTab === "fr" || langTab === "both") && (
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">FR</label>
            <textarea
              value={bodyFr}
              onChange={(e) => setBodyFr(e.target.value)}
              placeholder="Rédigez votre analyse en français..."
              aria-label="Article body (French)"
              rows={10}
              className={cn(
                "w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4",
                "text-sm text-white placeholder:text-[#4B5563] font-mono resize-y min-h-[200px]",
                "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:border-transparent",
                "transition-colors duration-200"
              )}
            />
          </div>
        )}
      </div>

      {/* Paywall selector */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
          {locale === "fr" ? "Mur payant" : "Paywall Gate"}
        </label>
        <PaywallSelector value={paywall} onChange={setPaywall} locale={locale} />
      </div>

      {/* Publish toggle */}
      <Switch
        checked={publishNow}
        onCheckedChange={setPublishNow}
        label={locale === "fr" ? "Publier maintenant" : "Publish now"}
        id="publish-now"
      />

      {/* Footer bar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <p className="text-xs text-[#6B7280] font-mono">
          {wordCount} {locale === "fr" ? "mots" : "words"} · {readTime} min {locale === "fr" ? "de lecture" : "read"}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className={cn(
              "px-4 py-2 rounded-xl text-sm border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/20",
              "transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-premium-orange"
            )}
          >
            {locale === "fr" ? "Enregistrer" : "Save draft"}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={!title}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold bg-premium-orange hover:bg-premium-orange-hover text-white",
              "transition-colors duration-200 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2 focus:ring-offset-primary-dark",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {locale === "fr" ? "Publier" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
