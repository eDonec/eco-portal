const TFECard = () => {
  return (
    <>
      <p>
        Dispositif{" "}
        <strong>
          d&rsquo;accompagnement des entreprises françaises à l&rsquo;international
        </strong>
        , rassemblant Business France, les Chambres de Commerce et d&rsquo;Industrie,
        les Régions françaises et Bpifrance, ainsi que les partenaires publics
        et privés (CCE, CCIFI, OSCI). Sa plateforme numérique propose des outils
        et des informations sur les marchés/opportunités.
      </p>
      <a
        href="https://world.businessfrance.fr/afrique-du-nord/made-in-france/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://world.businessfrance.fr/afrique-du-nord/made-in-france/
      </a>
      <p>
        <strong>7 prestataires d&rsquo;ancrage commercial</strong> sont référencés en
        Tunisie et proposent des solutions pour l&rsquo;implantation (domiciliation,
        droit, fiscalité).
      </p>
      <p>
        voir:{" "}
        <a
          href="https://www.teamfrance-export.fr/auvergnerhonealpes/services?pays=TN"
          className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
        >
          Prestataires Ancrage Tunisie
        </a>
      </p>
      {/* TODO! Add logos */}
    </>
  );
};

export default TFECard;
