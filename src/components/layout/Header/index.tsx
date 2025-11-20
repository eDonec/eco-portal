import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="dark:bg-gray-900 transition-colors">
      <div className="mx-auto px-4 py-4 sm:py-6">
        <div className="mx-8 flex justify-between flex-col lg:flex-row lg:items-center gap-6 my-3 space-y-4">
          {/* Left section: Logos and text */}
          <div className="w-full lg:w-3/5 xl:w-2/5 flex flex-col sm:flex-row items-center gap-3 text-center md:text-start">
            {/* Icons row */}
            <div className="flex flex-row gap-3 items-center w-full sm:w-auto justify-center">
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
            </div>
            <Link
              href="/"
              className="block text-[0.85rem] leading-[initial] font-bold text-primary lg:ml-4 ml-0"
            >
              Portail web d&rsquo;orientation des acteurs économiques de la
              relation franco-tunisienne
            </Link>
          </div>

          <nav className="w-full lg:w-2/5 justify-self-center lg:flex-none">
            <ul className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end w-full sm:w-auto items-stretch md:items-center">
              <li>
                <Link
                  href="/"
                  style={{
                    transitionDelay: "0ms",
                    transitionDuration: "600ms",
                  }}
                  className="transition-all inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[0.85rem] font-bold bg-transparent dark:bg-gray-800/70 border dark:border-gray-700 border-primary text-primary dark:text-blue-400 hover:shadow-lg dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm w-full sm:w-auto"
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
                  className="transition-all inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[0.85rem] font-bold text-white bg-primary shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 w-full sm:w-auto"
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
