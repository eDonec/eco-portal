const SERCard = () => {
  return (
    <>
      <p>
        Le <strong>Service Economique Régional (SER)</strong> de Tunis,
        compétent pour la Tunisie et la Libye (avec un service économique à
        Tripoli), appartient au réseau international de la DG Trésor. Sous la
        direction de l&rsquo;ambassadeur / ambassadrice, il coordonne l&rsquo;action de
        diplomatie économique du poste.
      </p>
      <p>
        Il assure les missions régaliennes en soutien des intérêts économiques
        de la France et met en œuvre des instruments financiers (ligne de crédit
        pour l’importation d’équipements français, FASEP, prêts du Trésor).
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Analyse de la situation économique (macroéconomie et risque-pays,
          échanges extérieurs, politiques publiques)
        </li>
        <li>Analyse du climat des affaires et de la règlementation locale</li>
        <li>Relations avec les autorités économiques & financières</li>
        <li>
          Soutien des entreprises françaises & promotion de l’attractivité de la
          France
        </li>
        <li>Suivi et soutien des grands projets stratégiques</li>
        <li>
          Gestion du{" "}
          <a
            href="https://www.tresor.economie.gouv.fr/services-aux-entreprises/le-fasep"
            className="inline-block cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
          >
            FASEP
          </a>{" "}
          et des autres instruments financiers du Trésor
        </li>
      </ul>
      <a
        href="https://www.tresor.economie.gouv.fr/Pays/TN"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://www.tresor.economie.gouv.fr/Pays/TN
      </a>
    </>
  );
};

export default SERCard;
