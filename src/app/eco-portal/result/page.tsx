import Loader from "@/components/Loader";
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
    <Suspense fallback={<Loader label="Chargement des résultats…" />}>
      <Results />
    </Suspense>
  );
}
