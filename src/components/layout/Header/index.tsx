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
            <ul className="flex items-center gap-3 sm:gap-4">
              <li>
                <Link
                  href="/"
                  style={{
                    transitionDelay: "0ms",
                    transitionDuration: "600ms",
                  }}
                  className="transition-all inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm sm:text-base font-semibold bg-transparent dark:bg-gray-800/70 border dark:border-gray-700 border-blue-600 text-blue-600 dark:text-blue-400 hover:shadow-lg dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/eco-portal"
                  style={{
                    transitionDelay: "0ms",
                    transitionDuration: "600ms",
                  }}
                  className="transition-all inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm sm:text-base font-semibold text-white bg-blue-600 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
