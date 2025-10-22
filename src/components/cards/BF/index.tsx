const BFCard = () => {
  return (
    <>
      <p>
        Le <strong>Bureau Business France de Tunis</strong> est le correspondant
        de la Team France Export en Tunisie. Grâce à des équipes sectorielles et
        des solutions opérationnelles, il soutient l&apos;internationalisation
        des entrepreneurs français et anime le réseau local des partenaires.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Recherche de partenaires et de fournisseurs français</li>
        <li>Gestion du Volontariat International en Entreprise (V. I. E)</li>
        <li>Organisation de Forum d&apos;affaires en France et en Tunisie</li>
        <li>
          Accompagnement des projets d&rsquo;investissements en France –{" "}
          <strong>Team France Invest</strong>
        </li>
        <li>
          Accompagnement des entreprises françaises en Tunisie Codéveloppement
          Afrique du Nord – <strong>Team France Export</strong>
        </li>
        <li>
          Promotion des solutions et technologies <strong>France 2030</strong>{" "}
          et des marques sectorielles Françaises
        </li>
      </ul>
      <a
        href="https://world.businessfrance.fr/afrique-du-nord/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        https://world.businessfrance.fr/afrique-du-nord/
      </a>
    </>
  );
};

export default BFCard;
