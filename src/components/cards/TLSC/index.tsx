import { useModal } from "@/components/ui/ModalContext";

const TLSC = () => {
  const { openModal } = useModal();
  return (
    <>
      <p>Consultez TLS pour faciliter vos procédures de demande de visa.</p>
      <p>
        TLScontact gère la partie administrative et logistique du processus de
        dépôt de visa. TLScontact simplifie et centralise le processus
        d&rsquo;obtention de visa grâce à ses centres modernes et organisés. Les
        candidats peuvent déposer leurs dossiers dans un environnement
        professionnel et bénéficier d&rsquo;un accompagnement personnalisé.
      </p>
      <a
        href="https://www.tlscontact.com/fr/"
        onClick={(e) => {
          e.preventDefault();
          openModal("https://www.tlscontact.com/fr/");
        }}
        className="inline-block cursor-pointer mt-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
      >
        https://www.tlscontact.com/fr/
      </a>
    </>
  );
};

export default TLSC;
