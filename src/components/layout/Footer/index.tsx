import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 dark:bg-gray-900 transition-colors">
      <div className="mx-auto px-4 py-4 sm:py-6">
        <div className="mb-8 h-1 w-full bg-gradient-to-r from-blue-600 via-white to-red-600 dark:from-blue-500 dark:via-transparent dark:to-rose-500 rounded-full opacity-60" />
        <div className="mx-8 flex justify-between flex-col lg:flex-row lg:items-center gap-3 mt-3">
          <div className="w-full lg:w-2/5 flex items-center gap-3 text-center justify-self-center lg:text-start lg:justify-self-start min-w-0">
            <Image
              src={`/${encodeURIComponent("Marianne.svg")}`}
              alt={`Logo Marianne`}
              width={200}
              height={56}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <Link
              href="/"
              className="block text-sm sm:text-lg md:text-xl font-bold leading-tight text-blue-500 drop-shadow-xl"
            >
              Portail web d&rsquo;orientation des acteurs économiques de la
              relation franco-tunisienne
            </Link>
          </div>
          <div className="w-full lg:w-2/5 ">
            
          </div>
        </div>
        <div className="mt-20 h-1 w-full ">
          <p className="mb-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              © Tous droits réservés Ambassade de France à Tunis
              <br />
              Avec le support du Comité Tunisie des Conseillers du commerce
              extérieur de la France.
            </p>
          <p className="text-center">Made with ♥ by - eDonec</p>
        </div>
      </div>
    </footer>
  );
}
