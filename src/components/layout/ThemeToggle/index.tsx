"use client";

import dynamic from "next/dynamic";

// Dynamically import the client component with no SSR
const ClientThemeToggle = dynamic(() => import("./ClientThemeToggle"), {
  ssr: false,
  // Render nothing during loading so SSR markup (empty) matches initial client render
  loading: () => null,
});

export default function ThemeToggle() {
  return <ClientThemeToggle />;
}
