"use client";
import { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";
import { useSportStore } from "@/lib/stores/sportStore";
import { submitTrialSignup } from "@/lib/utils/trialSignup";

// ── Content tables ────────────────────────────────────────────

const LEFT: Record<ActiveMode, { headline: string; p1: string; p2: string; trust: string }> = {
  signal: {
    headline: "See the edge before you decide to pay for it.",
    p1: "7 days of full Signal access — verified probabilities, WHY reasoning, and best odds across every league and every sport. No card. No commitment. No guessing.",
    p2: "By Day 7, you will know exactly whether Signal changes how you bet. Most people do not cancel. Because the edge speaks for itself.",
    trust: "2,400 bettors in Nigeria and Kenya already have the edge. Join them.",
  },
  intel: {
    headline: "Try your briefing desk for 7 days. On us.",
    p1: "Full Intel access — structured match intelligence, T1–T3 sourced briefings, exportable data, and the full archive across football, rugby, athletics and more. No card. No commitment.",
    p2: "By the end of the week, you will have filed smarter, spoken more confidently on air, or published something you could not have written without it. That is when the decision becomes easy.",
    trust: "The briefing journalists in 8 African markets read before going on air.",
  },
  origin: {
    headline: "7 days fully connected to home. Free.",
    p1: "Full Origin access — every African league, every global tournament, in English and French. No card. No commitment. Just 7 days of never missing a moment.",
    p2: "The Springboks score. The NPFL result. Kipchoge's time. Girmay's stage. All of it, before your city's media covers it. Because you should not have to explain to people back home what you missed.",
    trust: "14,000 Africans abroad who refuse to miss a moment.",
  },
};

const CTA_TEXT: Record<ActiveMode, string> = {
  signal: "Get 7 days of edge — free",
  intel:  "Start your 7-day briefing desk — free",
  origin: "Stay connected for 7 days — free",
};

const SUCCESS: Record<ActiveMode, { headline: string; copy: string }> = {
  signal: {
    headline: "Your 7-day Signal trial is live.",
    copy: "Check your inbox — your first edge briefing is on its way. By tomorrow morning, you will know why 2,400 bettors made this their daily process.",
  },
  intel: {
    headline: "Your 7-day Intel trial is live.",
    copy: "Your first briefing lands in your inbox shortly. Sourced, structured, and ready before your next deadline.",
  },
  origin: {
    headline: "Your 7-day Origin trial is live.",
    copy: "Your first briefing is on its way — in English and French. Everything from home, starting now.",
  },
};

const MODE_OPTIONS: { key: ActiveMode; name: string; desc: string }[] = [
  { key: "signal", name: "The serious bettor — Signal",       desc: "I want verified edge on every match before I place." },
  { key: "intel",  name: "The analyst or journalist — Intel", desc: "I need structured, sourced intelligence before my deadline." },
  { key: "origin", name: "The diaspora fan — Origin",         desc: "I want African sports coverage wherever I am, in EN or FR." },
];

const PROOF_CARDS = [
  { number: "7",  label: "days full access, completely free" },
  { number: "0",  label: "card details required to start" },
  { number: "12", label: "sports covered from Day 1" },
];

const BULLETS = [
  "Full briefings across all leagues and sports",
  "Edge scores, WHY reasoning, odds comparison",
  "Cancel before Day 7 — pay nothing, ever",
  "After trial: from $5/month depending on your mode",
];

const COUNTRY_GROUPS: { label: string; countries: string[] }[] = [
  { label: "West Africa",     countries: ["Nigeria", "Ghana", "Senegal", "Ivory Coast", "Cameroon", "DRC"] },
  { label: "East Africa",     countries: ["Kenya", "Uganda", "Tanzania", "Ethiopia", "Eritrea"] },
  { label: "Southern Africa", countries: ["South Africa", "Zimbabwe", "Zambia", "Namibia"] },
  { label: "North Africa",    countries: ["Morocco", "Algeria", "Tunisia", "Egypt"] },
  { label: "Diaspora",        countries: ["United Kingdom", "United States", "France", "Canada", "UAE", "Other"] },
];

// ── Component ─────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export default function TrialSignup({ locale = "en" }: { locale?: string }) {
  const { activeMode, setMode } = useModeStore();
  const { activeSport } = useSportStore();

  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "", country: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const content = LEFT[activeMode];

  function handleField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) {
      setError(locale === "fr" ? "L'adresse e-mail est requise." : "Email address is required.");
      emailRef.current?.focus();
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await submitTrialSignup({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      country: form.country,
      selectedMode: activeMode,
      sourceSport: activeSport,
      utmSource: typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("utm_source") ?? undefined
        : undefined,
    });

    setIsLoading(false);

    if (result.ok) {
      setIsSuccess(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-7xl mx-auto" style={{ padding: "0 24px 16px" }}>
      <div
        className="overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          border: "1px solid #374151",
          borderRadius: "16px",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .trial-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
        <div className="trial-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
        }}>

          {/* LEFT PANEL */}
          <div
            style={{
              backgroundColor: "#1A1C26",
              padding: "28px",
              borderRight: "1px solid #374151",
            }}
          >
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#6B7280", marginBottom: "10px" }}>
              7-day free trial
            </p>

            <h2 className="font-bold text-white" style={{ fontSize: "1.2rem", lineHeight: 1.25, marginBottom: "14px" }}>
              {content.headline}
            </h2>

            <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF", marginBottom: "10px" }}>
              {content.p1}
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#9CA3AF", marginBottom: "16px" }}>
              {content.p2}
            </p>

            <div className="flex items-start gap-2" style={{ marginBottom: "16px" }}>
              <span
                className="inline-block rounded-full shrink-0 mt-1"
                style={{ width: "5px", height: "5px", backgroundColor: "#10B981" }}
                aria-hidden="true"
              />
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{content.trust}</p>
            </div>

            {/* Proof cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
              {PROOF_CARDS.map((card) => (
                <div
                  key={card.number}
                  style={{ backgroundColor: "#262938", borderRadius: "8px", padding: "8px 10px" }}
                >
                  <p className="font-bold text-white" style={{ fontSize: "1rem" }}>{card.number}</p>
                  <p className="text-xs leading-snug" style={{ color: "#9CA3AF", lineHeight: 1.3 }}>{card.label}</p>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div className="space-y-1.5">
              {BULLETS.map((b) => (
                <div key={b} className="flex items-start gap-2">
                  <span
                    className="rounded-full shrink-0 mt-1.5"
                    style={{ width: "4px", height: "4px", backgroundColor: "#F97316" }}
                    aria-hidden="true"
                  />
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ backgroundColor: "#262938", padding: "28px" }}>

            {isSuccess ? (
              /* Success state */
              <div className="flex flex-col items-center text-center h-full justify-center space-y-4 py-8">
                <CheckCircle
                  aria-hidden="true"
                  style={{ width: "32px", height: "32px", color: "#00C853" }}
                />
                <h3 className="font-bold text-white text-lg">{SUCCESS[activeMode].headline}</h3>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#9CA3AF" }}>
                  {SUCCESS[activeMode].copy}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Mode radio cards */}
                <div>
                  <p className="text-sm font-medium text-white" style={{ marginBottom: "10px" }}>
                    First, who are you?
                  </p>
                  <div className="space-y-2">
                    {MODE_OPTIONS.map(({ key, name, desc }) => {
                      const isActive = activeMode === key;
                      return (
                        <label
                          key={key}
                          className={cn(
                            "flex items-start gap-3 rounded-lg cursor-pointer transition-all duration-150",
                            "hover:border-white/30"
                          )}
                          style={{
                            padding: "10px 12px",
                            backgroundColor: "#1A1C26",
                            border: isActive ? "1px solid #F97316" : "1px solid #374151",
                          }}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={key}
                            checked={isActive}
                            onChange={() => setMode(key)}
                            className="sr-only"
                          />
                          {/* Custom radio */}
                          <div
                            className="shrink-0 rounded-full flex items-center justify-center mt-0.5"
                            style={{
                              width: "14px", height: "14px",
                              border: isActive ? "none" : "1px solid #4B5563",
                              backgroundColor: isActive ? "#F97316" : "transparent",
                            }}
                          >
                            {isActive && (
                              <div
                                className="rounded-full"
                                style={{ width: "5px", height: "5px", backgroundColor: "#FFFFFF" }}
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">{name}</p>
                            <p className="text-xs" style={{ color: "#9CA3AF" }}>{desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Name row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs font-medium" style={{ color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                        {field === "firstName" ? "First name" : "Last name"}
                      </label>
                      <input
                        type="text"
                        placeholder={field === "firstName" ? "Kwame" : "Mensah"}
                        value={form[field]}
                        onChange={(e) => handleField(field, e.target.value)}
                        className="w-full rounded-lg text-sm text-white placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-premium-orange transition-colors"
                        style={{ backgroundColor: "#1A1C26", border: "1px solid #374151", padding: "8px 10px" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium" style={{ color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Email address <span style={{ color: "#F97316" }}>*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={form.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    className="w-full rounded-lg text-sm text-white placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-premium-orange transition-colors"
                    style={{ backgroundColor: "#1A1C26", border: "1px solid #374151", padding: "8px 10px" }}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="text-xs font-medium" style={{ color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Country <span style={{ color: "#F97316" }}>*</span>
                  </label>
                  <select
                    required
                    value={form.country}
                    onChange={(e) => handleField("country", e.target.value)}
                    className="w-full rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-premium-orange transition-colors cursor-pointer"
                    style={{ backgroundColor: "#1A1C26", border: "1px solid #374151", padding: "8px 10px", color: form.country ? "#FFFFFF" : "#4B5563" }}
                  >
                    <option value="" disabled>Select your country</option>
                    {COUNTRY_GROUPS.map(({ label, countries }) => (
                      <optgroup key={label} label={label}>
                        {countries.map((c) => (
                          <option key={c} value={c} style={{ backgroundColor: "#1A1C26" }}>{c}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-xs" style={{ color: "#EF4444" }} role="alert">{error}</p>
                )}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full rounded-xl text-white font-bold text-sm transition-colors duration-200 cursor-pointer",
                    "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    isLoading ? "bg-premium-orange-hover" : "bg-premium-orange hover:bg-premium-orange-hover"
                  )}
                  style={{ padding: "10px 0" }}
                >
                  {isLoading ? "Starting your trial…" : CTA_TEXT[activeMode]}
                </button>

                {/* CTA note */}
                <p className="text-xs text-center leading-relaxed" style={{ color: "#6B7280", lineHeight: 1.5 }}>
                  No card needed. Cancel anytime before Day 7 and you pay nothing — ever.{" "}
                  After trial, from $5/month.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
