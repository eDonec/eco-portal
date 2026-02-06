import Link from "next/link";

const CCITFCard = () => {
  return (
    <>
      <p>
        La Chambre de Commerce et d&apos;Industrie Tuniso-Française (CCITF) form
        un réseau de plus de <strong>2500 entreprises adhérentes</strong> et
        appartient au{" "}
        <strong>
          réseau mondial des Chambres de Commerce et d&apos;Industrie Françaises
          à l&apos;International
        </strong>{" "}
        fédéré par CCI France International.
      </p>
      <p>
        Forte de son ancrage bilatéral, la CCITF accompagne les entreprises
        tunisiennes et françaises dans leurs projets d&apos;implantation,
        d&apos;investissement et de développement en Tunisie, et organise
        régulièrement des{" "}
        <strong>missions économiques croisées sur les deux marchés</strong>,
        favorisant les partenariats, les opportunités d&apos;affaires et le
        co-développement entre les écosystèmes des deux pays.
      </p>
      <br />
      <p>Services proposés</p>
      <ul className="list-disc pl-6 space-y-1">
        
        <li>Informations économique, conseil et données marchés</li>
        <li>
          Création juridique, domiciliation d&apos;entreprises (postale et
          physique) et hébergement VIE
        </li>
        <li>
          Accompagnement au développement commercial, aux partenariats B2B et
          aux projets d&apos;implantation et d&apos;internationalisation
        </li>
        <li>
          Partenaire de Promosalons et mobilisation d&apos;entreprises sur les
          salons organisés en France
        </li>
        <li>
          Ressources humaines : formation continue et développement des
          compétences.
        </li>
      </ul>
      <p>
        La CCI Tuniso-française est l&apos;un des partenaires référencés de la
        Team France Export en Tunisie.
      </p>
      <br/>
      <a
        href="mailto:raja.touil@ccitf.org"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        <strong>Contact:</strong> Raja TOUIL, directrice générale
      </a>
      <Link
        href="https://www.ccitf.org"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        hhttps://www.ccitf.org
      </Link>
    </>
  );
};

export default CCITFCard;
