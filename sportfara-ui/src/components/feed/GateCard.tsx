"use client";
import { useState, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { useModeStore, type ActiveMode } from "@/lib/stores/modeStore";
import { useSportStore } from "@/lib/stores/sportStore";
import { useAuth } from "@/lib/hooks/useAuth";
import { submitTrialSignup } from "@/lib/utils/trialSignup";
import { cn } from "@/lib/utils/cn";

// ── Content ───────────────────────────────────────────────────

const HEADLINE: Record<ActiveMode, string> = {
  signal: "You've seen what Signal looks like. The rest is one step away.",
  intel:  "Your briefing desk is one step away.",
  origin: "The rest of home is waiting.",
};

const COPY: Record<ActiveMode, string> = {
  signal: "Verified probabilities, WHY reasoning, and best odds across every league and every sport — delivered before the bookmakers adjust. No card. 7 days free.",
  intel:  "Unlimited T1–T3 sourced briefings, exportable data, and the full archive across every sport. No card. 7 days free.",
  origin: "Every African league, every global tournament, in English and French. No card. 7 days free.",
};

const CTA_TEXT: Record<ActiveMode, string> = {
  signal: "Get 7 days of edge — free",
  intel:  "Start 7-day briefing desk — free",
  origin: "Stay connected — 7 days free",
};

const SUCCESS: Record<ActiveMode, { headline: string; copy: string }> = {
  signal: {
    headline: "Your 7-day Signal trial is live.",
    copy: "Check your inbox — your first edge briefing is on its way.",
  },
  intel: {
    headline: "Your 7-day Intel trial is live.",
    copy: "Your first briefing lands shortly. Sourced, structured, ready.",
  },
  origin: {
    headline: "Your 7-day Origin trial is live.",
    copy: "Your first briefing is on its way — in English and French.",
  },
};

const STATS = [
  { number: "7",  label: "days free" },
  { number: "0",  label: "card required" },
  { number: "12", label: "sports covered" },
];

const MODE_OPTIONS: { key: ActiveMode; name: string; desc: string }[] = [
  { key: "signal", name: "Signal", desc: "The serious bettor" },
  { key: "intel",  name: "Intel",  desc: "Analyst · Journalist" },
  { key: "origin", name: "Origin", desc: "Diaspora fan" },
];

const COUNTRY_GROUPS: { label: string; countries: string[] }[] = [
  { label: "West Africa",     countries: ["Nigeria","Ghana","Senegal","Ivory Coast","Cameroon","DRC"] },
  { label: "East Africa",     countries: ["Kenya","Uganda","Tanzania","Ethiopia","Eritrea"] },
  { label: "Southern Africa", countries: ["South Africa","Zimbabwe","Zambia","Namibia"] },
  { label: "North Africa",    countries: ["Morocco","Algeria","Tunisia","Egypt"] },
  { label: "Diaspora",        countries: ["United Kingdom","United States","France","Canada","UAE","Other"] },
];

// ── Component ─────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

interface GateCardProps {
  locale?: "en" | "fr";
}

export default function GateCard({ locale = "en" }: GateCardProps) {
  const { activeMode, setMode } = useModeStore();
  const { activeSport } = useSportStore();
  const { user } = useAuth();

  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "", country: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  if (user?.tier === "premium" || user?.tier === "pro") return null;

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
      utmSource:
        typeof window !== "undefined"
          ? (new URLSearchParams(window.location.search).get("utm_source") ?? undefined)
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
    <div
      id="gate-card"
      style={{
        padding: "14px",
        margin: "0 14px 12px",
        border: "1.5px solid #4B5563",
        borderRadius: "10px",
        backgroundColor: "#1A1C26",
      }}
    >
      {/* Headline */}
      <p
        id="gate-hl"
        className="font-bold text-white"
        style={{ fontSize: "15px", lineHeight: 1.3, marginBottom: "5px" }}
      >
        {HEADLINE[activeMode]}
      </p>

      {/* Copy */}
      <p
        id="gate-copy"
        style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: 1.6, marginBottom: "5px" }}
      >
        {COPY[activeMode]}
      </p>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
          margin: "10px 0",
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: "#262938",
              border: "0.5px solid #374151",
              borderRadius: "4px",
              padding: "6px",
              textAlign: "center",
            }}
          >
            <p className="font-bold text-white" style={{ fontSize: "15px" }}>{s.number}</p>
            <p style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "1px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {isSuccess ? (
        /* Success state */
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <CheckCircle aria-hidden="true" style={{ width: "28px", height: "28px", color: "#00C853" }} />
          <p className="font-bold text-white" style={{ fontSize: "14px" }}>
            {SUCCESS[activeMode].headline}
          </p>
          <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.5 }}>
            {SUCCESS[activeMode].copy}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>

          {/* Mode selector */}
          <p
            className="text-white font-medium"
            style={{ fontSize: "11px", marginBottom: "7px" }}
          >
            You are reading as:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "10px" }}>
            {MODE_OPTIONS.map(({ key, name, desc }) => {
              const isActive = activeMode === key;
              return (
                <label
                  key={key}
                  className="cursor-pointer transition-colors duration-150"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "6px 8px",
                    border: isActive ? "1px solid #F97316" : "1px solid #374151",
                    borderRadius: "4px",
                  }}
                >
                  <input
                    type="radio"
                    name="gate-mode"
                    value={key}
                    checked={isActive}
                    onChange={() => setMode(key)}
                    className="sr-only"
                  />
                  {/* Custom radio */}
                  <div
                    className="shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      width: "12px",
                      height: "12px",
                      border: isActive ? "none" : "1px solid #4B5563",
                      backgroundColor: isActive ? "#F97316" : "transparent",
                    }}
                  >
                    {isActive && (
                      <div className="rounded-full" style={{ width: "4px", height: "4px", backgroundColor: "#FFFFFF" }} />
                    )}
                  </div>
                  <span className="text-white font-medium" style={{ fontSize: "11px" }}>{name}</span>
                  <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{desc}</span>
                </label>
              );
            })}
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field}>
                  <label
                    style={{ fontSize: "10px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}
                  >
                    {field === "firstName" ? "First name" : "Last name"}
                  </label>
                  <input
                    type="text"
                    placeholder={field === "firstName" ? "Kwame" : "Mensah"}
                    value={form[field]}
                    onChange={(e) => handleField(field, e.target.value)}
                    className="w-full text-white placeholder-[#4B5563] focus:outline-none transition-colors"
                    style={{
                      backgroundColor: "#262938",
                      border: "1px solid #374151",
                      borderRadius: "4px",
                      padding: "7px 10px",
                      fontSize: "12px",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F97316"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#374151"; }}
                  />
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "10px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                Email address <span style={{ color: "#F97316" }}>*</span>
              </label>
              <input
                id="gate-email"
                ref={emailRef}
                type="email"
                placeholder="you@email.com"
                required
                value={form.email}
                onChange={(e) => handleField("email", e.target.value)}
                className="w-full text-white placeholder-[#4B5563] focus:outline-none transition-colors"
                style={{
                  backgroundColor: "#262938",
                  border: "1px solid #374151",
                  borderRadius: "4px",
                  padding: "7px 10px",
                  fontSize: "12px",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#F97316"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#374151"; }}
              />
            </div>

            {/* Country */}
            <div>
              <label style={{ fontSize: "10px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                Country <span style={{ color: "#F97316" }}>*</span>
              </label>
              <select
                required
                value={form.country}
                onChange={(e) => handleField("country", e.target.value)}
                className="w-full cursor-pointer focus:outline-none transition-colors"
                style={{
                  backgroundColor: "#262938",
                  border: "1px solid #374151",
                  borderRadius: "4px",
                  padding: "7px 10px",
                  fontSize: "12px",
                  color: form.country ? "#FFFFFF" : "#4B5563",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#F97316"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#374151"; }}
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
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs" style={{ color: "#EF4444", marginTop: "6px" }} role="alert">
              {error}
            </p>
          )}

          {/* CTA */}
          <button
            id="gate-cta"
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full font-bold text-white cursor-pointer transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-premium-orange focus:ring-offset-2",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              isLoading ? "bg-premium-orange-hover" : "bg-premium-orange hover:bg-premium-orange-hover"
            )}
            style={{
              fontSize: "13px",
              borderRadius: "6px",
              padding: "9px",
              marginTop: "10px",
              border: "none",
            }}
          >
            {isLoading ? "Starting your trial…" : CTA_TEXT[activeMode]}
          </button>

          {/* Note */}
          <p
            className="text-center"
            style={{ fontSize: "10px", color: "#6B7280", lineHeight: 1.4, marginTop: "5px" }}
          >
            No card needed · Cancel before Day 7 and pay nothing · After trial from $5/month
          </p>
        </form>
      )}
    </div>
  );
}
