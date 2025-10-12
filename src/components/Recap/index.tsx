"use client";

export type QAItem = { question: string; answer: string };

export default function Recap({
  items,
  title = "Vos réponses",
}: {
  items: QAItem[];
  title?: string;
}) {
  return (
    <aside className="w-full lg:w-auto lg:col-span-1">
      <div className="sticky top-24 rounded-xl  p-4">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">
          {title}
        </h2>
        {items.length === 0 ? (
          <p className="text-base text-gray-500 dark:text-gray-400">
            Aucune réponse sélectionnée.
          </p>
        ) : (
          <ol className="space-y-2">
            {items.map((r, idx) => (
              <li
                key={idx}
                className="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {r.question}
                </div>
                <div className="text-base font-medium text-gray-800 dark:text-gray-100">
                  {r.answer}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </aside>
  );
}
