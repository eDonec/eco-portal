const CCITFCard = () => {
  return (
    <>
      <p>
        La{" "}
        <strong>
          Chambre de Commerce et d&apos;Industrie Tuniso-Française (CCITF)
        </strong>{" "}
        a pour objet de promouvoir et de développer durablement les relations
        économiques et commerciales entre partenaires tunisiens et français.
      </p>
      <p>
        Elle compte plus de 2000 adhérents et propose différents services à ses
        membres :
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Animation de la communauté des adhérents et fourniture de services
          (séminaires, réunions techniques, webinaires…)
        </li>
        <li>
          Domiciliation et hébergement pour les entreprises françaises – V.I.E
        </li>
        <li>Promotion des salons français</li>
        <li>
          Assistance aux entreprises françaises implantées en Tunisie auprès des
          administrations tunisiennes
        </li>
        <li>
          Formations : Français des affaires, RSE, transition énergétique et
          écologique, impact carbone...
        </li>
        <li>
          Accompagnement des adhérents souhaitant prospecter les marchés
          extérieurs
        </li>
      </ul>
      <a
        href="https://www.ctfci.org/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        https://www.ctfci.org/
      </a>
    </>
  );
};

export default CCITFCard;
