"use client";

import dynamic from "next/dynamic";

// Dynamically import the client component with no SSR
const ClientThemeToggle = dynamic(() => import("./ClientThemeToggle"), {
  ssr: false,
  loading: () => (
    // Fallback skeleton that matches the real component dimensions
    <div className="relative flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full shadow-sm">
      <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-sm" />
      <div className="w-10 h-10" />
      <div className="w-10 h-10" />
    </div>
  ),
});

export default function ThemeToggle() {
  return <ClientThemeToggle />;
}
