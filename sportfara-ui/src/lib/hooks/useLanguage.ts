"use client";
import { useState, useEffect, useCallback } from "react";

type Locale = "en" | "fr";

export function useLanguage(defaultLocale: Locale = "en") {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem("sf-locale") as Locale | null;
    if (stored === "en" || stored === "fr") setLocale(stored);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "fr" : "en";
      localStorage.setItem("sf-locale", next);
      return next;
    });
  }, []);

  const setLanguage = useCallback((lang: Locale) => {
    setLocale(lang);
    localStorage.setItem("sf-locale", lang);
  }, []);

  return { locale, toggleLocale, setLanguage, isFrench: locale === "fr" };
}
