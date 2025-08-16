import ClientEcoPortalForm from "@/containers/forms/EcoPortalForm";

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
