import { useModal } from "@/components/ui/ModalContext";

const CCEFCard = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>
        Les{" "}
        <strong>Conseillers du Commerce Extérieur de la France (CCE)</strong>{" "}
        constituent un réseau de 4500 chefs d’entreprise et experts de
        l’international.
      </p>
      <p>
        Nommés par l’Etat (ministre chargé du commerce extérieur) en raison de
        leurs compétences et de leur engagement, au sein de l’équipe de France,
        au service des intérêts économiques de la France.
      </p>
      <p>
        Ils exercent bénévolement leur mission sous la forme d’actions de
        promotion et d’appui à l’internationalisation des entreprises
        françaises, en partenariat avec les acteurs publics et privés. Présents
        en France et dans plus de 140 pays, les CCE sont investis de quatre
        missions : le conseil aux pouvoirs publics, l’appui aux entreprises, la
        formation des jeunes aux métiers de l’international et la promotion de
        l’attractivité de la France
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Conseil aux PME françaises</li>
        <li>Soutien Attractivité</li>
        <li>Soutien formation des jeunes à l&apos;international</li>
      </ul>
      <a
        href="https://www.cnccef.org/"
        onClick={(e) => {
          e.preventDefault();
          openModal("https://www.cnccef.org/");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        https://www.cnccef.org/
      </a>
    </>
  );
};

export default CCEFCard;
