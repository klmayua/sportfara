import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#262938",
          DEFAULT: "#262938",
        },
        surface: {
          dark: "#1A1C26",
          DEFAULT: "#1A1C26",
        },
        elevated: {
          dark: "#2D3045",
          DEFAULT: "#2D3045",
        },
        light: {
          bg: "#F5F6F8",
        },
        "premium-orange": {
          DEFAULT: "#F97316",
          hover: "#EA580C",
        },
        "trust-green": {
          DEFAULT: "#10B981",
          hover: "#047857",
        },
        border: {
          subtle: "#374151",
          medium: "#4B5563",
        },
        info: "#3B82F6",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      lineHeight: {
        body: "1.625",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "orange-glow":
          "radial-gradient(circle at center, rgba(249,115,22,0.15) 0%, transparent 70%)",
        "green-glow":
          "radial-gradient(circle at center, rgba(16,185,129,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-lg": "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "orange-glow": "0 0 20px rgba(249,115,22,0.3), 0 4px 12px rgba(0,0,0,0.2)",
        "orange-glow-lg": "0 0 40px rgba(249,115,22,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "green-glow": "0 0 20px rgba(16,185,129,0.3), 0 4px 12px rgba(0,0,0,0.2)",
        "inner-highlight": "inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "bar-grow": "barGrow 0.8s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        barGrow: {
          from: { width: "0%" },
          to: { width: "var(--bar-width)" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
      },
      zIndex: {
        nav: "50",
        modal: "60",
        toast: "70",
        tooltip: "80",
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};

export default config;
