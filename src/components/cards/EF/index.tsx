import { useModal } from "@/components/ui/ModalContext";

const EFCard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        Expertise France est l’agence française d’expertise technique
        internationale. Elle est engagée aux côtés des institutions tunisiennes
        et de la société civile dans différents projets innovants qui visent le
        renforcement des capacités des personnes et des territoires ainsi que la
        dynamisation de l’économie, dans une perspective de développement
        durable. La Tunisie constitue le premier pays d’intervention d’Expertise
        France en Afrique du Nord.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Gouvernance démocratique, économique et numérique</li>
        <li>Développement humain et santé</li>
        <li>Développement durable</li>
      </ul>
      <a
        href="http://www.expertisefrance.fr/tunisie"
        onClick={(e) => {
          e.preventDefault();
          openModal("http://www.expertisefrance.fr/tunisie");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        http://www.expertisefrance.fr/tunisie
      </a>
      <a
        href="https://www.expertisefrance.fr/fr/appels-a-projets"
        onClick={(e) => {
          e.preventDefault();
          openModal("https://www.expertisefrance.fr/fr/appels-a-projets");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://www.expertisefrance.fr/fr/appels-a-projets
      </a>
    </>
  );
};

export default EFCard;
