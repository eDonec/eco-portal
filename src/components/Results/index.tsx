"use client";

import Recap, { type QAItem } from "@/components/Recap";
import { RECOMMENDATION_CONTENT } from "@/components/RecommendationCard";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type ComponentType } from "react";
import GradientCard from "../ui/GradientCard";

export default function Results() {
  const searchParams = useSearchParams();

  const recsRaw = searchParams.get("recs");
  let recommendations: string[] = [];
  if (recsRaw) {
    try {
      recommendations = JSON.parse(recsRaw) as string[];
    } catch {
      recommendations = [];
    }
  }

  const respRaw = searchParams.get("resp");
  let responses: QAItem[] = [];
  if (respRaw) {
    try {
      const parsed = JSON.parse(respRaw) as unknown;
      if (Array.isArray(parsed)) {
        const toQA = (x: unknown): QAItem | null => {
          if (
            typeof x === "object" &&
            x !== null &&
            "question" in x &&
            "answer" in x
          ) {
            const obj = x as Record<string, unknown>;
            return {
              question: String(obj.question),
              answer: String(obj.answer),
            };
          }
          return null;
        };
        responses = parsed.map(toQA).filter((x): x is QAItem => x !== null);
      }
    } catch {
      responses = [];
    }
  }

  const known = recommendations.filter((key) => key in RECOMMENDATION_CONTENT);
  const unknown = recommendations.filter(
    (key) => !(key in RECOMMENDATION_CONTENT)
  );

  const { cards, noCardRecs } = (() => {
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
  })();

  const keyFor = (Comp: ComponentType, idx: number) =>
    (Comp as { displayName?: string; name?: string }).displayName ||
    (Comp as { displayName?: string; name?: string }).name ||
    String(idx);

  const altFrom = (src: string) => {
    const file = src.split("/").pop() || src;
    return file.replace(/\.[^.]+$/, "");
  };

  return (
    <div className="transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="min-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main first, recap second (right on lg, bottom on small) */}
            <div className="order-2 mt-6 lg:mt-0 lg:order-1 lg:col-span-2 max-w-4xl w-full space-y-6 bg-transparent">
              <h1 className="text-2xl font-bold text-gray-500 pl-2">
                Recommandations:
              </h1>
              {recommendations.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">
                  Aucune recommandation trouvée.
                </p>
              ) : (
                <>
                  {cards.length > 0 && (
                    <div className="flex flex-col gap-5">
                      {cards.map(({ Comp, title, logos }, idx) => (
                        <GradientCard key={keyFor(Comp, idx)}>
                          <div className="space-y-3 break-words prose-wrap">
                            {title && (
                              <h1 className="mb-8 text-2xl font-bold text-gray-500">
                                {title}
                              </h1>
                            )}
                            <Comp />
                            {logos.length > 0 && (
                              <div>
                                <span className="inline-flex items-center justify-center px-2.5 py-1 text-sm font-medium text-white bg-red-400 rounded-full">
                                  Partenaire{logos.length > 1 ? "s" : ""}
                                </span>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                  {logos.map((src, i) => (
                                    <Image
                                      key={`${keyFor(Comp, idx)}-logo-${i}`}
                                      src={src}
                                      alt={altFrom(src)}
                                      width={308}
                                      height={154}
                                      quality={100}
                                      className="h-[4.8rem] w-auto object-contain bg-white rounded border border-gray-200 dark:border-gray-700 p-1"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </GradientCard>
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
            <div className="order-1 lg:order-2">
              <GradientCard>
                <Recap items={responses} />
              </GradientCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
