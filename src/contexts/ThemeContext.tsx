"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Memoize setTheme callback to prevent unnecessary re-renders
  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);

    // Load theme from localStorage on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    const root = window.document.documentElement;

    // Remove existing dark class
    root.classList.remove("dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
      }
      setResolvedTheme(systemTheme);
    } else {
      if (theme === "dark") {
        root.classList.add("dark");
      }
      setResolvedTheme(theme);
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    // Listen for system theme changes when in system mode
    if (typeof window === "undefined" || !mounted) return;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        const root = window.document.documentElement;
        root.classList.remove("dark");
        if (systemTheme === "dark") {
          root.classList.add("dark");
        }
        setResolvedTheme(systemTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme: handleSetTheme,
      resolvedTheme,
    }),
    [theme, handleSetTheme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
