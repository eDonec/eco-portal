import { useModal } from "@/components/ui/ModalContext";

const CFCard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        <strong>Business France Invest</strong> accompagne de manière gracieuse
        et confidentielle les projets d’investissement en France, en lien étroit
        avec les Régions de France.
      </p>
      <ul className="list-disc pl-6">
        <li>
          <a href="mailto:walid.baltagi@businessfrance.fr">
            Contact: walid.baltagi@businessfrance.fr
          </a>
        </li>
      </ul>
      <a
        href="https://investinfrance.fr/fr/"
        onClick={(e) => {
          e.preventDefault();
          openModal("https://investinfrance.fr/fr/");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://investinfrance.fr/fr/
      </a>
    </>
  );
};

export default CFCard;
