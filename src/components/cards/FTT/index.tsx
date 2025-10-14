import { useModal } from "@/components/ui/ModalContext";

const FTTCard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        La communauté <strong>French Tech Tunis</strong> est un réseau
        réunissant des acteurs de l’écosystème startups & innovation tunisien
        désireux de promouvoir l&apos;innovation et de l&apos;entreprenariat.
      </p>
      <p>
        Elle soutient les secteurs d’innovation technologique et les talents
        d’entrepreneurs locaux, d’où qu’ils viennent ainsi que les différents
        acteurs francophones des technologies innovantes établies en Tunisie.
      </p>
      <a
        href="http://www.lafrenchtech-tunis.com/"
        onClick={(e) => {
          e.preventDefault();
          openModal("http://www.lafrenchtech-tunis.com/");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        http://www.lafrenchtech-tunis.com/
      </a>
    </>
  );
};

export default FTTCard;
