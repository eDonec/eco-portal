import ClientEcoPortalForm from "@/containers/forms/EcoPortalForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire",
  description:
    "Questionnaire du Portail Économique pour orienter votre projet vers les bons interlocuteurs et dispositifs.",
};

export default function EcoPortalPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="min-h-[60vh] flex items-center">
          <ClientEcoPortalForm />
        </div>
      </div>
    </div>
  );
}
