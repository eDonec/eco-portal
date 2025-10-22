import Link from "next/link";

const EFCard = () => {
  return (
    <>
      <p>
        Expertise France est l&rsquo;agence française d&rsquo;expertise
        technique internationale. Elle est engagée aux côtés des institutions
        tunisiennes et de la société civile dans différents projets innovants
        qui visent le renforcement des capacités des personnes et des
        territoires ainsi que la dynamisation de l&rsquo;économie, dans une
        perspective de développement durable. La Tunisie constitue le premier
        pays d&rsquo;intervention d&rsquo;Expertise France en Afrique du Nord.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Gouvernance démocratique, économique et numérique</li>
        <li>Développement humain et santé</li>
        <li>Développement durable</li>
      </ul>
      <Link
        href="https://www.expertisefrance.fr"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.expertisefrance.fr
      </Link>
      <p className="pt-2">
        Les appels à projets sont lancés ponctuellement. Consultez cette page
        régulièrement pour découvrir les prochaines opportunités.
      </p>
      <Link
        href="https://www.expertisefrance.fr/fr/appels-a-projets"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.expertisefrance.fr/fr/appels-a-projets
      </Link>
    </>
  );
};

export default EFCard;
