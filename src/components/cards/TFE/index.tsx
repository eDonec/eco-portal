import { useModal } from "@/components/ui/ModalContext";

const TFECard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        Dispositif{" "}
        <strong>
          d’accompagnement des entreprises françaises à l’international
        </strong>
        , rassemblant Business France, les Chambres de Commerce et d’Industrie,
        les Régions françaises et Bpifrance, ainsi que les partenaires publics
        et privés (CCE, CCIFI, OSCI). Sa plateforme numérique propose des outils
        et des informations sur les marchés/opportunités.
      </p>
      <a
        href="https://world.businessfrance.fr/afrique-du-nord/made-in-france/"
        onClick={(e) => {
          e.preventDefault();
          openModal(
            "https://world.businessfrance.fr/afrique-du-nord/made-in-france/"
          );
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://world.businessfrance.fr/afrique-du-nord/made-in-france/
      </a>
      <p>
        <strong>7 prestataires d’ancrage commercial</strong> sont référencés en
        Tunisie et proposent des solutions pour l’implantation (domiciliation,
        droit, fiscalité).
      </p>
      <p>
        voir:{" "}
        <a
          href="https://www.teamfrance-export.fr/auvergnerhonealpes/services?pays=TN"
          onClick={(e) => {
            e.preventDefault();
            openModal(
              "https://www.teamfrance-export.fr/auvergnerhonealpes/services?pays=TN"
            );
          }}
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
