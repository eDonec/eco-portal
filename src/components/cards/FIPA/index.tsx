import Link from "next/link";

const FIPA = () => {
  return (
    <>
      <p>
        <strong>FIPA-Tunisia</strong>, l&rsquo;Agence tunisienne de Promotion de
        l&rsquo;Investissement Extérieur.
      </p>
      <p>
        Depuis sa création en juin 1995, sa vision est de positionner la Tunisie
        comme un hub d&rsquo;investissement mondial, favorisant une croissance
        responsable, inclusive et durable. L&rsquo;équipe{" "}
        <strong>FIPA-Tunisia</strong> s&rsquo;engage à vous fournir des services
        de qualité pour soutenir vos projets d&rsquo;investissement en Tunisie.
      </p>
      <Link
        href="https://investintunisia.tn/sollicitez-nous/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://investintunisia.tn/sollicitez-nous/
      </Link>
    </>
  );
};

export default FIPA;
