import Link from "next/link";

const TD = () => {
  return (
    <>
      <p>
        L&rsquo;incubateur The Dot, soutenu par Expertise France et l&rsquo;AFD,
        offre des programmes d&rsquo;accompagnement technique aux entrepreneurs.
      </p>
      <Link
        href="https://thedot.tn"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://thedot.tn
      </Link>
    </>
  );
};

export default TD;
