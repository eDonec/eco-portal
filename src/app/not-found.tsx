import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Page non trouvée</h1>
          <p className="text-gray-700 dark:text-gray-300">
            Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Accueil
            </Link>
            <Link
              href="/eco-portal"
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Questionnaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
