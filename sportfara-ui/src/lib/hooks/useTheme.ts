"use client";
import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("sf-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("light", stored === "light");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("sf-theme", next);
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  }, []);

  return { theme, toggleTheme, isDark: theme === "dark" };
}
