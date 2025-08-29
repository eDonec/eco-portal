import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export default function EcoPortalResultPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8">Chargement…</div>}>
      <ResultsClient />
    </Suspense>
  );
}
