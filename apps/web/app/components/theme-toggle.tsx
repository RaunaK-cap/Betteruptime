"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "betteruptime-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const nextTheme = getPreferredTheme();
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-label">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
