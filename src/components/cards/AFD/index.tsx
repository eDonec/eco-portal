const AFDCard = () => {
  return (
    <>
      <p>
        Institution financière publique et solidaire,{" "}
        <strong>l&apos;Agence Française de Développement</strong> est l’acteur
        central de la politique de développement de la France. Elle s’engage sur
        des projets qui améliorent le quotidien des populations dans les pays en
        développement, émergents et l’Outre-mer.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Présence en Tunisie depuis 1992</li>
        <li>200 projets et programmes soutenus</li>
        <li>4 milliards d’€ d’engagements financiers</li>
      </ul>
      <a
        href="https://www.afd.fr/fr/page-region-pays/tunisie"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        https://www.afd.fr/fr/page-region-pays/tunisie
      </a>
    </>
  );
};

export default AFDCard;
