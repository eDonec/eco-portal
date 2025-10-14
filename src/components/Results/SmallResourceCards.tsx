"use client";
import Image from "next/image";
import Link from "next/link";

type SmallCard = {
  id: string;
  title: string;
  href: string;
  logo: string; // path relative to public
};

const PLACEHOLDER_CARDS: SmallCard[] = [
  {
    id: "res-1",
    title: "Ressource A",
    href: "https://example.com/a",
    logo: "/1.png",
  },
  {
    id: "res-2",
    title: "Ressource B",
    href: "https://example.com/b",
    logo: "/2.png",
  },
  {
    id: "res-3",
    title: "Ressource C",
    href: "https://example.com/c",
    logo: "/3.png",
  },
];

export default function SmallResourceCards() {
  return (
    <section aria-labelledby="small-resources-heading" className="mt-12">
      <h2
        id="small-resources-heading"
        className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
      >
        Autres ressources
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_CARDS.map((card) => (
          <article
            key={card.id}
            className="group relative rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex items-center justify-center rounded-md bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 overflow-hidden">
                <Image
                  src={card.logo}
                  alt={card.title}
                  width={64}
                  height={64}
                  className="object-contain max-h-12 max-w-12"
                />
              </div>
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 leading-snug">
                {card.title}
              </h3>
            </div>
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
