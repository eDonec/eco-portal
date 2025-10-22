import Link from "next/link";

const CSTLCard = () => {
  return (
    <>
      <p>
        <strong>Club Santé Tunisie Libye</strong>
      </p>
      <Link
        href="https://www.linkedin.com/company/club-sant-tunisie/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Club Santé Tunisie Libye - LinkedIn
      </Link>
    </>
  );
};

export default CSTLCard;
