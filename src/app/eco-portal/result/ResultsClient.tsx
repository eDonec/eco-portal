"use client";

import { RECOMMENDATION_CONTENT } from "@/components/RecommendationCard";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, type ComponentType } from "react";

export default function ResultsClient() {
  const searchParams = useSearchParams();

  const recommendations = useMemo(() => {
    const raw = searchParams.get("recs");
    if (!raw) return [] as string[];
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [] as string[];
    }
  }, [searchParams]);

  const known = recommendations.filter((key) => key in RECOMMENDATION_CONTENT);
  const unknown = recommendations.filter(
    (key) => !(key in RECOMMENDATION_CONTENT)
  );

  const { cards, noCardRecs } = useMemo(() => {
    type CardEntry = { Comp: ComponentType; title?: string; logos: string[] };
    const order: ComponentType[] = [];
    const logosMap = new Map<ComponentType, Set<string>>();
    const titleMap = new Map<ComponentType, string>();
    const noCards: string[] = [];

    const normalize = (p: string) => p.replace(/^\/public\/?/, "/");

    for (const key of known) {
      const conf =
        RECOMMENDATION_CONTENT[key as keyof typeof RECOMMENDATION_CONTENT];
      const list = conf?.Cards ?? [];
      if (list.length === 0) {
        noCards.push(key);
        continue;
      }
      for (const { title, card, logos } of list) {
        if (!logosMap.has(card)) {
          logosMap.set(card, new Set());
          order.push(card);
          if (title) titleMap.set(card, title);
        }
        const set = logosMap.get(card)!;
        for (const src of logos ?? []) set.add(normalize(src));
      }
    }

    const result: CardEntry[] = order.map((Comp) => ({
      Comp,
      title: titleMap.get(Comp),
      logos: Array.from(logosMap.get(Comp) ?? new Set<string>()),
    }));

    return { cards: result, noCardRecs: noCards };
  }, [known]);

  const keyFor = (Comp: ComponentType, idx: number) =>
    (Comp as { displayName?: string; name?: string }).displayName ||
    (Comp as { displayName?: string; name?: string }).name ||
    String(idx);

  const altFrom = (src: string) => {
    const file = src.split("/").pop() || src;
    return file.replace(/\.[^.]+$/, "");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="min-h-[60vh] flex items-center">
          <div className="max-w-4xl mx-auto w-full p-6 space-y-6 bg-transparent">
            {recommendations.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">
                Aucune recommandation trouvée.
              </p>
            ) : (
              <>
                {cards.length > 0 && (
                  <div className="flex flex-col gap-5">
                    {cards.map(({ Comp, title, logos }, idx) => (
                      <div
                        key={keyFor(Comp, idx)}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-6 space-y-3 break-words prose-wrap"
                      >
                        {title && (
                          <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {title}
                          </h1>
                        )}
                        <Comp />
                        {logos.length > 0 && (
                          <div>
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-red-400 rounded-full">
                              Partenaire{logos.length > 1 ? "s" : ""}
                            </span>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              {logos.map((src, i) => (
                                <Image
                                  key={`${keyFor(Comp, idx)}-logo-${i}`}
                                  src={src}
                                  alt={altFrom(src)}
                                  // Provide larger intrinsic size so browser downscales (avoids blur on DPR displays)
                                  width={256}
                                  height={128}
                                  quality={100}
                                  className="h-12 sm:h-16 w-auto object-contain bg-white rounded border border-gray-200 dark:border-gray-700 p-1"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {unknown.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4">
                      Autres recommandations
                    </h2>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      {unknown.map((rec, idx) => (
                        <li
                          key={idx}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {unknown.length === 0 && noCardRecs.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4">
                      Recommandations sans cartes dédiées
                    </h2>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      {noCardRecs.map((rec, idx) => (
                        <li
                          key={idx}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <div className="pt-4">
              <Link
                href="/eco-portal"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Revenir au formulaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
