import Results from "@/components/Results";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Recommandations",
  description:
    "Vos recommandations personnalisées et partenaires correspondant à votre profil.",
};

export default function EcoPortalResultPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8">Chargement…</div>}>
      <Results />
    </Suspense>
  );
}
