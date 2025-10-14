import { useModal } from "@/components/ui/ModalContext";

const VIECard = () => {
  const { openModal } = useModal();
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal("https://mon-vie-via.businessfrance.fr/");
  };
  return (
    <>
      <p>
        <strong>Mobilité internationale</strong> permettant à une entreprise de
        droit français de confier une mission à un jeune talent de moins de 28
        ans. Les missions (forme de service civique) peuvent se dérouler dans
        une filiale ou un partenaire en Tunisie.
      </p>
      <ul className="list-disc pl-6">
        <li>
          <a href="mailto:selma.kaffel@businessfrance.fr">
            Contact: selma.kaffel@businessfrance.fr
          </a>
        </li>
      </ul>
      <a
        href="https://mon-vie-via.businessfrance.fr/"
        onClick={handleOpen}
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://mon-vie-via.businessfrance.fr/
      </a>
    </>
  );
};

export default VIECard;
