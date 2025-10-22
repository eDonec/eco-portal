import Link from "next/link";

const SERV3 = () => {
  return (
    <>
      <p>
        Le <strong>Service Economique Régional (SER)</strong> de Tunis,
        compétent pour la Tunisie et la Libye, appartient au réseau
        international de la DG Trésor. Sous la direction de l&rsquo;ambassadeur
        / ambassadrice, il coordonne l&rsquo;action de diplomatie économique du
        poste.
      </p>
      <p>
        Il assure les missions régaliennes en soutien des intérêts économiques
        de la France parmi lesquels:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Analyse de la situation économique (macroéconomie et risque-pays,
          échanges extérieurs, politiques publiques)
        </li>
        <li>Analyse du climat des affaires et de la règlementation locale</li>
        <li>Relations avec les autorités économiques & financières</li>
        <li>
          Soutien des entreprises françaises & promotion de l&rsquo;attractivité
          de la France
        </li>
        <li>Suivi et soutien des grands projets stratégiques</li>
      </ul>
      <p>
        Le Service Economique Régional publie chaque semaine une revue de
        l&rsquo;actualité économique en Tunisie et en Libye accessible sur sa
        page internet :{" "}
        <Link
          href="https://www.tresor.economie.gouv.fr/Pays/TN"
          className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          TUNISIE | Direction générale du Trésor
        </Link>
      </p>
    </>
  );
};

export default SERV3;
