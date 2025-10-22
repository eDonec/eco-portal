import { useModal } from "@/components/ui/ModalContext";

const SERV2 = () => {
  const { openModal } = useModal();

  const openCountry = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal("https://www.tresor.economie.gouv.fr/Pays/TN");
  };
  return (
    <>
      <p>
        Le <strong>Service Economique Régional (SER) de Tunis</strong>,
        compétent pour la Tunisie et la Libye appartient au réseau international
        de la DG Trésor. Sous la direction de l&rsquo;ambassadeur /
        ambassadrice, il coordonne l&rsquo;action de diplomatie économique du
        poste. Il met également en œuvre des instruments financiers.
      </p>
      <p>
        La <strong>ligne de crédit de la DG Trésor</strong> destinée aux PME et PMI tunisiennes a
        pour objectifs de faciliter leur investissement productif dans un cadre
        privilégié et de renforcer leurs liens avec les entreprises françaises.
        Cette ligne de crédit est une solution globale qui facilite l&rsquo;accès au
        financement des PME et PMI tunisiennes, issues de tout secteur, pour
        l&rsquo;acquisition de biens et de services d&#39;origine française.
      </p>
      <a
        href="mailto:Sarra.BENATTIA@dgtresor.gouv.fr"
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        <strong>Contact:</strong> Sarra BENATTIA, <strong>Téléphone:</strong>{" "}
        +216 31 315 093
      </a>
      <a
        href="https://www.tresor.economie.gouv.fr/Pays/TN"
        onClick={openCountry}
        className="inline-block mt-2 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm max-w-full break-words"
      >
        https://www.tresor.economie.gouv.fr/Pays/TN
      </a>
    </>
  );
};

export default SERV2;
