import Link from "next/link";

const LCTPMEPMICard = () => {
  return (
    <>
      <p>
        Ligne de crédit de <strong>30 millions €</strong> gérée par le Trésor
        français en lien avec la Banque centrale de Tunisie, destinée aux PME et
        PMI tunisiennes souhaitant financer avec des conditions favorables
        l’acquisition de biens et services d’origine française.
      </p>
      <ul className="list-disc pl-6">
        <li>
          <a href="mailto:tunis@dgtresor.gouv.fr">tunis@dgtresor.gouv.fr</a>
        </li>
      </ul>
      <p>
        voir:
        <Link
          href="https://www.tresor.economie.gouv.fr/Articles/2021/04/16/une-ligne-de-credit-attractive-pour-soutenir-les-pme-et-pmi-tunisiennes"
          className="inline-block cursor-pointer ml-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ligne de crédit
        </Link>
        <Link
          href="https://www.tresor.economie.gouv.fr/services-aux-entreprises/le-pret-du-tresor"
          className="inline-block cursor-pointer ml-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pret du Trésor
        </Link>
      </p>
    </>
  );
};

export default LCTPMEPMICard;
