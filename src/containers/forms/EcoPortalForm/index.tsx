import Loader from "@/components/Loader";
import { Suspense } from "react";
import ClientEcoPortalForm from "./ClientEcoPortalForm";

export default function EcoPortalForm() {
  return (
    <Suspense fallback={<Loader label="Chargement du formulaire…" />}>
      <ClientEcoPortalForm />
    </Suspense>
  );
}
