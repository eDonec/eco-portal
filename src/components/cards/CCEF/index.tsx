import Link from "next/link";

const CCEFCard = () => {
  return (
    <>
      <p>
        Les{" "}
        <strong>Conseillers du Commerce Extérieur de la France (CCE)</strong>{" "}
        constituent un réseau de 4500 chefs d&rsquo;entreprise et experts de
        l&rsquo;international.
      </p>
      <p>
        Nommés par l&rsquo;Etat (ministre chargé du commerce extérieur) en
        raison de leurs compétences et de leur engagement, au sein de
        l&rsquo;équipe de France, au service des intérêts économiques de la
        France.
      </p>
      <p>
        Ils exercent bénévolement leur mission sous la forme d&rsquo;actions de
        promotion et d&rsquo;appui à l&rsquo;internationalisation des
        entreprises françaises, en partenariat avec les acteurs publics et
        privés. Présents en France et dans plus de 140 pays, les CCE sont
        investis de quatre missions : le conseil aux pouvoirs publics,
        l&rsquo;appui aux entreprises, la formation des jeunes aux métiers de
        l&rsquo;international et la promotion de l&rsquo;attractivité de la
        France
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Conseil aux PME françaises</li>
        <li>Soutien Attractivité</li>
        <li>Soutien formation des jeunes à l&apos;international</li>
      </ul>
      <Link
        href="https://www.cnccef.org/"
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.cnccef.org/
      </Link>
    </>
  );
};

export default CCEFCard;
