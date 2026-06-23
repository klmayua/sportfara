"use client";

export function useGlassmorphism() {
  const card = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl";
  const nav = "bg-primary-dark/80 backdrop-blur-xl border-b border-white/10";
  const orange = "bg-premium-orange/10 backdrop-blur-sm border border-premium-orange/20 rounded-2xl";
  const green = "bg-trust-green/10 backdrop-blur-sm border border-trust-green/20 rounded-2xl";
  const modal = "bg-surface-dark/95 backdrop-blur-2xl border border-white/10 rounded-3xl";

  return { card, nav, orange, green, modal };
}
