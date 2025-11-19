import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 dark:bg-gray-900 transition-colors">
      <div className="mx-auto px-4 py-4 sm:py-6">
        <div className="mb-8 h-1 w-full bg-gradient-to-r from-blue-600 via-white to-red-600 dark:from-blue-500 dark:via-transparent dark:to-rose-500 rounded-full opacity-60" />
        <div className="mx-8 flex justify-between flex-col lg:flex-row lg:items-center gap-3 mt-3">
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
              target="_blank"
            >
              Portail web d&rsquo;orientation des acteurs économiques de la
              relation franco-tunisienne
            </Link>
          </div>
          <div className="w-full lg:w-2/5 "></div>
        </div>
        <div className="mt-20 h-1 w-full ">
          <p className="mb-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            © Tous droits réservés Ambassade de France à Tunis
            <br />
            Avec le support du Comité Tunisie des Conseillers du commerce
            extérieur de la France.
          </p>
          <div className="my-3 items-baseline gap-8 pt-8 text-center text-sm ">
            <Link
              className="py-[20px]"
              href="https://edonec.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with ♥ by - eDonec
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
