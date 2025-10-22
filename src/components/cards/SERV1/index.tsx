import Link from "next/link";

const SERV1 = () => {
  return (
    <>
      <p>
        Le <strong>Service Economique Régional (SER) de Tunis</strong>,
        compétent pour la Tunisie et la Libye (avec un service économique à
        Tripoli), appartient au réseau international de la DG Trésor. Sous la
        direction de l&rsquo;ambassadeur / ambassadrice, il coordonne
        l&rsquo;action de diplomatie économique du poste. Il met également en
        œuvre des instruments financiers.
      </p>
      <p>
        Destiné à tous types d&rsquo;entreprises françaises, et prioritairement
        les PME, le FASEP est une subvention (ou une avance remboursable) pour{" "}
        <strong>
          des études de faisabilité ou des projets démonstrateurs de
          technologies vertes et innovantes au bénéfice d&rsquo;entités
          publiques des pays en développement.
        </strong>{" "}
        Dispositif de soutien à l&rsquo;internationalisation des entreprises
        françaises, le FASEP permet à l&rsquo;entreprise qui en bénéficie de
        démontrer l&rsquo;efficacité de ses méthodes et d&rsquo;acquérir une
        référence dans le pays partenaire.
      </p>
      <a
        href="mailto:Sarra.BENATTIA@dgtresor.gouv.fr"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        <strong>Contact:</strong> Sarra BENATTIA
      </a>
      <a
        href="tel:+216 31 315 093"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        <strong>Téléphone:</strong>{" "}
        +216 31 315 093
      </a>
      <Link
        href="https://www.tresor.economie.gouv.fr/Pays/TN"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.tresor.economie.gouv.fr/Pays/TN
      </Link>
    </>
  );
};

export default SERV1;
