import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="relative max-w-5xl mx-auto px-4 pt-12 pb-10">
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">
            Transformez votre impact économique
          </span>
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Un portail simple pour orienter entreprises et porteurs de projets
          vers les bons services et financements de l’écosystème France–Tunisie.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="/eco-portal"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Aller vers l&apos;éco portal
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 pb-6 mb-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/60 p-6 shadow-sm">
            <p className="text-gray-800 dark:text-gray-100">
              L&rsquo;Ambassade de France en Tunisie comprend plusieurs services
              à vocation économique qui accompagnent les entreprises et les
              pouvoirs publics : le Service Economique Régional, Business
              France, l’Agence Française de Développement, Proparco et Expertise
              France.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/60 p-6 shadow-sm">
            <p className="text-gray-800 dark:text-gray-100">
              La Chambre de Commerce et d&rsquo;Industrie Tuniso-Française
              (CCITF), le comité Tunisie des Conseillers du Commerce Extérieur
              de la France (CCEF) et les opérateurs privés référencés complètent
              ce dispositif. La communauté French Tech Tunis et Digital Africa
              soutiennent plus particulièrement les startups et
              l&rsquo;innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full bg-white py-8">
          <div className="mx-auto px-4">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-6 items-center opacity-90">
              {Array.from({ length: 18 }).map((_, i) => {
                const idx = i + 1;
                const filename = `${idx} V.svg`;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center p-2"
                  >
                    <Image
                      src={`/${encodeURIComponent(filename)}`}
                      alt={`Logo ${idx}`}
                      width={200}
                      height={56}
                      className="h-10 sm:h-12 w-auto object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 mt-8 pb-12">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/60 p-6 shadow-sm">
          <p className="text-gray-800 dark:text-gray-100">
            Les entreprises en Tunisie trouveront dans ce document la
            présentation des acteurs, les solutions et les financements, mis en
            œuvre notamment dans le cadre du Plan France 2030.
          </p>
        </div>
      </section>
    </div>
  );
}
