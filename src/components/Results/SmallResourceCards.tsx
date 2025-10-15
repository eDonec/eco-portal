"use client";
import Image from "next/image";
import Link from "next/link";
import BAISVG from "./BAISVG";

type SmallCard = {
  id: string;
  title: string;
  href: string;
  logo: React.ReactNode; // path relative to public
};

const PLACEHOLDER_CARDS: SmallCard[] = [
  {
    id: "Banque Européenne d’Investissement",
    title: "Banque Européenne d’Investissement",
    href: "https://www.eib.org/fr/projects/country/tunisia",
    logo: (
      <div className="relative h-24 w-32 flex items-center rounded-md bg-white dark:bg-neutral-800 overflow-hidden">
        <BAISVG />
      </div>
    ),
  },
  {
    id: "Banque Européenne pour la Reconstruction et le Développement",
    title: "Banque Européenne pour la Reconstruction et le Développement",
    href: "https://www.ebrd.com/home/what-we-do/where-we-invest/tunisia.html",
    logo: (
      <div className="relative h-24 w-32 flex items-center rounded-md bg-white dark:bg-neutral-800 overflow-hidden">
        <Image
          src={"/ebrd.svg"}
          alt={"Banque Européenne pour la Reconstruction et le Développement"}
          width={96}
          height={128}
          quality={100}
          className="object-contain bg-[#1d3a58] h-20 w-32 p-2 rounded"
        />
      </div>
    ),
  },
  {
    id: "Banque mondiale",
    title: "Banque mondiale",
    href: "https://www.banquemondiale.org/fr/country/tunisia",
    logo: (
      <div className="relative h-24 w-44 rounded-md bg-white dark:bg-neutral-800 overflow-hidden">
        <Image
          src={"/bankMT.svg"}
          alt={"Banque mondiale"}
          width={96}
          height={176}
          quality={100}
          className="object-contain h-24 w-44"
        />
      </div>
    ),
  },
];

export default function SmallResourceCards() {
  return (
    <section
      aria-labelledby="small-resources-heading "
      className="mt-12 rounded-xl border border-black/10 dark:border-white/10 bg-white shadow-sm hover:shadow-lg transition-shadow p-4"
    >
      <h2
        id="small-resources-heading"
        className="text-md md:text-lg lg:text-xl font-normal text-gray-800 dark:text-gray-100 mb-4"
      >
        Au-delà de l’équipe économique France, d’autres bailleurs européens et
        internationaux proposent des financements à taux préférentiels.
        N’hésitez pas à consulter les sites web de :
      </h2>
      <div className="grid gap-4 md:w-3/4 lg:w-full lg:grid-cols-3">
        {PLACEHOLDER_CARDS.map((card) => (
          <article
            key={card.id}
            className="group relative rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col"
          >
            {card.logo}
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 leading-snug">
              {card.title}
            </h3>
            <div className="mt-3">
              <Link
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                Visiter le site
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
