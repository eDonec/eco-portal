import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recommandations",
  description:
    "Vos recommandations personnalisées et partenaires correspondant à votre profil.",
};

export default function ResultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
