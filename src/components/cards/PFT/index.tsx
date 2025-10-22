import Link from "next/link";

const PFTCard = () => {
  return (
    <>
      <p>
        <strong>Actions collectives BtoB</strong> organisées par Business France
        et la Team France en Tunisie - Libye
      </p>
      <Link
        href="https://tn.ambafrance.org/L-equipe-economique-France-en-Tunisie"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://tn.ambafrance.org/L-equipe-economique-France-en-Tunisie
      </Link>
    </>
  );
};

export default PFTCard;
