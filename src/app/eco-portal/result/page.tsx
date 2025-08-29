import Results from "@/components/Results";
import Loader from "@/components/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Recommandations",
  description:
    "Vos recommandations personnalisées et partenaires correspondant à votre profil.",
};

export default function EcoPortalResultPage() {
  return (
    <Suspense fallback={<Loader label="Chargement des résultats…" /> }>
      <Results />
    </Suspense>
  );
}
