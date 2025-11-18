import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="dark:bg-gray-900 transition-colors">
      <div className="mx-auto px-4 py-4 sm:py-6">
        <div className="mx-8 flex justify-between flex-col md:flex-row lg:items-end gap-3 mb-3 space-y-4">
          <div className="w-full lg:w-3/5 xl:w-2/5 flex items-center gap-3 text-center justify-self-center md:text-start lg:justify-self-start">
              <Image
                src={`/${encodeURIComponent("Eco-portal-logo.svg")}`}
                alt={`Logo Eco Portal`}
                width={200}
                height={56}
                className="w-12 sm:w-20 md:w-16 lg:w-20 h-auto object-contain"
              />
              <Image
                src={`/${encodeURIComponent("Marianne.svg")}`}
                alt={`Logo Marianne`}
                width={200}
                height={56}
                className="w-14 sm:w-20 md:w-24 lg:w-24 h-auto object-contain"
              />
            <Link
              href="/"
              className="block text-[0.85rem] leading-[initial] font-bold text-primary lg:ml-4 ml-0"
            >
              Portail web d&rsquo;orientation des acteurs économiques de la
              relation franco-tunisienne
            </Link>
          </div>

          <nav className="w-full lg:w-2/5 justify-self-center lg:justify-self-end">
            <ul className="flex items-center gap-3 sm:gap-4 justify-center md:justify-end">
              <li>
                <Link
                  href="/"
                  style={{
                    transitionDelay: "0ms",
                    transitionDuration: "600ms",
                  }}
                  className="transition-all inline-flex items-center gap-2 rounded-lg px-4 py-2 text-base sm:text-lg font-semibold bg-transparent dark:bg-gray-800/70 border dark:border-gray-700 border-primary text-primary dark:text-blue-400 hover:shadow-lg dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
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
                  className="transition-all inline-flex items-center gap-2 rounded-lg px-4 py-2 text-base sm:text-lg font-semibold text-white bg-primary shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Laissez-vous guider
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
