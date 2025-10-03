import Link from "next/link";

export default function Header() {
  return (
    <header className="dark:bg-gray-900 transition-colors">
      <div className="mx-auto px-4 py-4 sm:py-6">
        <div className="mx-8 grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-3 mb-3 space-y-4">
          <div className="text-center justify-self-center lg:text-start lg:justify-self-start min-w-0">
            <Link
              href="/"
              className="block text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-blue-500 drop-shadow-xl"
            >
              Portail Économique
            </Link>
          </div>

          <nav className="justify-self-center lg:justify-self-end">
            <ul className="flex items-center gap-6 text-lg font-bold text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-blue-400 text-blue-500">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/eco-portal"
                  className="hover:text-blue-400 text-blue-500"
                >
                  Questionnaire
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Tricolor accent */}
        <div className="mt-8 h-1 w-full bg-gradient-to-r from-blue-600 via-white to-red-600 dark:from-blue-500 dark:via-transparent dark:to-rose-500 rounded-full opacity-60" />
      </div>
    </header>
  );
}
