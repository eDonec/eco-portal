import Link from "next/link";

const CG = () => {
  return (
    <>
      <p>
        Le <strong>Consulat général de France à Tunis</strong> assure la
        protection de la communauté française.
      </p>
      <p>
        Aux côtés des services de l&rsquo;Ambassade et en lien avec les consuls
        honoraires, le Consulat général de France à Tunis a également pour
        mission d&rsquo;entretenir des relations avec les milieux économiques,
        scientifiques et culturels, afin d&rsquo;établir ainsi un climat de
        dialogue et de coopération.
      </p>
      <Link
        href="https://tunis.consulfrance.org/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://tunis.consulfrance.org/
      </Link>
    </>
  );
};

export default CG;
