import Link from "next/link";

const TIA = () => {
  return (
    <>
      <p>
        La <strong>TIA</strong> est l&rsquo;interlocuteur des investisseurs
        locaux et internationaux.
      </p>
      <p>
        Avec son réseau de partenaires, elle se positionne comme le facilitateur
        pour la concrétisation des projets d&rsquo;investissement à travers une
        information fiable, des procédures simples et un accompagnement
        personnalisé.
      </p>
      <Link
        href="https://www.tia.gov.tn/"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.tia.gov.tn/
      </Link>
    </>
  );
};

export default TIA;
