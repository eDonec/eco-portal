"use client";

import { BANNER_IMAGES } from "@/constants/banner";
import Image from "next/image";

export type VerticalCard = {
  title: string;
  description: string;
  logos: typeof BANNER_IMAGES;
};

export default function StickyVerticalCardsScroll() {
  const cards: VerticalCard[] = [
    {
      title: "Services & opérateurs",
      description:
        "L'équipe économique France en Tunisie comprend plusieurs services et opérateurs à vocation économique qui accompagnent les entreprises et les pouvoirs publics : le Service Economique Régional, Business France, l’Agence Française de Développement, Proparco et Expertise France. (Le bureau régional de BPI France est basé à Casablanca).",
      logos: BANNER_IMAGES.slice(0, 6),
    },
    {
      title: "Partenaires",
      description:
        "Le Comité Tunisie des Conseillers du Commerce Extérieur de la France (CCEF), la Chambre de Commerce et d’Industrie Tuniso-Française (CCITF) et les opérateurs privés référencés complètent ce dispositif.",
      logos: BANNER_IMAGES.slice(6, 9),
    },
    {
      title: "Marques France, labels et initiatives ",
      description:
        "",
      logos: BANNER_IMAGES.slice(9, 15),
    },
  ];
  return (
    <section className="relative">
      <div className="mx-auto py-24 md:py-32">
        <div className="relative flex flex-col gap-24 md:gap-32">
          {cards.map((card, idx) => {
            return (
              <article
                key={`sticky-card-${idx}`}
                className="mx-auto w-11/12 top-24 md:top-32 rounded-2xl border border-black/10 dark:border-white/10 bg-sky-50 dark:bg-neutral-900/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
                style={{ zIndex: cards.length + idx }}
                aria-labelledby={`svc-title-${idx}`}
              >
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-blue-500 to-indigo-500 rounded-l-2xl"
                    aria-hidden="true"
                  />

                  <div className="p-6 md:p-8 glass-panel">
                    <h3
                      id={`svc-title-${idx}`}
                      className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-primary dark:text-blue-400"
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[1.5rem] leading-[2.25rem] font-extralight text-slate-600 dark:text-slate-300">
                      {card.description}
                    </p>
                    <div className="mt-12 grid grid-cols-3 lg:grid-cols-6 gap-1 place-items-center">
                      {card.logos.map((logo, logoIdx) => (
                        <Image
                          key={logoIdx}
                          src={`/${logo.filename}`}
                          alt={`Logo ${logoIdx + 1}`}
                          width={96}
                          height={96}
                          quality={100}
                          className="h-24 w-32 object-contain rounded-md border mx-auto border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-800/60 p-1 transition-all duration-200 hover:shadow"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
