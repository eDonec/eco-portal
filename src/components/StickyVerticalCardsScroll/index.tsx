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
      title: "Partenaires",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      logos: BANNER_IMAGES.slice(0, 6),
    },
    {
      title: "Marques",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      logos: BANNER_IMAGES.slice(6, 12),
    },
    {
      title: "Institutions",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      logos: BANNER_IMAGES.slice(12, 18),
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
                className="mr-auto w-11/12 sticky top-24 md:top-32 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
                style={{ zIndex: cards.length - idx }}
                aria-labelledby={`svc-title-${idx}`}
              >
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-500 via-blue-500 to-indigo-500 rounded-l-2xl"
                    aria-hidden="true"
                  />

                  <div className="p-6 md:p-8">
                    <h3
                      id={`svc-title-${idx}`}
                      className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-indigo-400"
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-600 dark:text-slate-300">
                      {card.description}
                    </p>

                    <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {card.logos.map((logo, logoIdx) => (
                        <Image
                          key={logoIdx}
                          src={`/${logo.filename}`}
                          alt={`Logo ${logoIdx + 1}`}
                          width={48}
                          height={48}
                          className="h-12 w-12 object-contain rounded-md border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-800/60 p-2 transition-all duration-200 hover:shadow"
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
