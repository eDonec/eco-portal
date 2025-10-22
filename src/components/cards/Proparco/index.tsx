import { useModal } from "@/components/ui/ModalContext";

const PROPARCOCard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        <strong>Proparco</strong> est la filiale de l’AFD dédiée au financement
        du secteur privé. Son action se concentre sur les secteurs clés du
        développement et contribue à la réalisation des Objectifs de
        Développement Durable.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Créer des emplois et des revenus décents</li>
        <li>Fournir des biens et des services essentiels</li>
        <li>Lutter contre le changement climatique</li>
      </ul>
      <a
        href="https://www.proparco.fr/fr/nos-offres-par-profil"
        onClick={(e) => {
          e.preventDefault();
          openModal("https://www.proparco.fr/fr/nos-offres-par-profil");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://www.proparco.fr/fr/nos-offres-par-profil
      </a>
    </>
  );
};

export default PROPARCOCard;
