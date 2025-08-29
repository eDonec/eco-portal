import { Suspense } from "react";
import ClientEcoPortalForm from "./ClientEcoPortalForm";

export default function EcoPortalForm() {
  return (
    <Suspense fallback={<div className="px-4 py-8">Chargement…</div>}>
      <ClientEcoPortalForm />
    </Suspense>
  );
}
