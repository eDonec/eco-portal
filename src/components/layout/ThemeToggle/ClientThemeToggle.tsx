"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { memo, useMemo } from "react";

const SunIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
));

const MoonIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
));

const MonitorIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
));

const THEMES = [
  { value: "light" as const, icon: <SunIcon /> },
  { value: "dark" as const, icon: <MoonIcon /> },
  { value: "system" as const, icon: <MonitorIcon /> },
];

const ClientThemeToggle = memo(() => {
  const { theme, setTheme } = useTheme();

  const activeIndex = useMemo(() => {
    return THEMES.findIndex((t) => t.value === theme);
  }, [theme]);

  const transformStyle = useMemo(
    () => ({
      transform: `translateX(${activeIndex * 40}px)`,
    }),
    [activeIndex]
  );

  return (
    <div className="relative flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors shadow-sm">
      {/* Animated background */}
      <div
        className="absolute w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-sm transition-transform duration-300 ease-out"
        style={transformStyle}
      />

      {/* Theme buttons */}
      {THEMES.map((themeOption) => (
        <ThemeButton
          key={themeOption.value}
          themeOption={themeOption}
          isActive={theme === themeOption.value}
          onClick={setTheme}
        />
      ))}
    </div>
  );
});

const ThemeButton = memo(
  ({
    themeOption,
    isActive,
    onClick,
  }: {
    themeOption: (typeof THEMES)[0];
    isActive: boolean;
    onClick: (theme: "light" | "dark" | "system") => void;
  }) => (
    <button
      onClick={() => onClick(themeOption.value)}
      className={`
      relative z-10 flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-full
      ${
        isActive
          ? "text-gray-900 dark:text-gray-100 bg-white/20 dark:bg-gray-800/20"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-500/50"
      }
    `}
      title={`Switch to ${themeOption.value} mode`}
    >
      {themeOption.icon}
    </button>
  )
);

SunIcon.displayName = "SunIcon";
MoonIcon.displayName = "MoonIcon";
MonitorIcon.displayName = "MonitorIcon";
ClientThemeToggle.displayName = "ClientThemeToggle";
ThemeButton.displayName = "ThemeButton";

export default ClientThemeToggle;
