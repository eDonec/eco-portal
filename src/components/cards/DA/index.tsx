import Link from "next/link";

const DACard = () => {
  return (
    <>
      <p>
        Digital Africa est une initiative lancée en 2018 visant à renforcer la
        capacité des entrepreneurs numériques africains pour concevoir et
        déployer, à grande échelle, des innovations de rupture au service de
        l&rsquo;économie réelle.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Financement</li>
        <li>Compétences </li>
        <li>Communautés</li>
      </ul>
      <Link
        href="https://world.businessfrance.fr/afrique-du-nord/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://world.businessfrance.fr/afrique-du-nord/
      </Link>
    </>
  );
};

export default DACard;
