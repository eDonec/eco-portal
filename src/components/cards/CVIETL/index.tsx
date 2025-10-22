import Link from "next/link";

const CVIETLCard = () => {
  return (
    <>
      <p>
        <strong>
          Le Club des Volontaires Internationaux pour Entreprendre
        </strong>
        . Il rassemble tous les anciens volontaires et coopérants présents en
        Tunisie.
      </p>
      <Link
        href="http://www.linkedin.com/company/club-vie-tunisie-libye"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        http://www.linkedin.com/company/club-vie-tunisie-libye
      </Link>
    </>
  );
};

export default CVIETLCard;
