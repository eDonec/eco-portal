import { GradientCard } from "@/components/ui/GradientCard";
import { BANNER_IMAGES } from "@/constants/banner";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Transformez votre impact économique : orientez-vous vers les bons services et financements France–Tunisie.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden transition-colors">
      {/* Hero */}

      <section className="relative max-w-6xl space-y-14 mx-auto px-4 pt-14 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight gradient-text-animated drop-shadow-sm">
            Transformez votre impact économique
          </h1>
        </div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Un portail simple pour orienter entreprises et porteurs de projets
          vers les bons services et financements de l’écosystème France–Tunisie.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/eco-portal"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-rose-500 text-white px-8 py-4 text-sm sm:text-base font-semibold shadow-lg shadow-blue-600/30 hover:shadow-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all"
          >
            <span>Aller vers le questionnaire</span>
            <span aria-hidden className="inline-flex">
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 10H15" />
                <path d="M10 5L15 10L10 15" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Intro cards */}
      <section id="acteurs" className="relative max-w-6xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-8">
          <GradientCard>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
              L&rsquo;Ambassade de France en Tunisie comprend plusieurs services
              à vocation économique qui accompagnent les entreprises et les
              pouvoirs publics : le Service Economique Régional, Business
              France, l’Agence Française de Développement, Proparco et Expertise
              France.
            </p>
          </GradientCard>
          <GradientCard>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
              Le Comité Tunisie des Conseillers du Commerce Extérieur de la
              France (CCEF), la Chambre de Commerce et d&rsquo;Industrie
              Tuniso-Française (CCITF) et les opérateurs privés référencés
              complètent ce dispositif. La communauté French Tech Tunis et
              Digital Africa soutiennent plus particulièrement les startups et
              l&rsquo;innovation.
            </p>
          </GradientCard>
        </div>
      </section>

      {/* Logos */}
      <section className="w-full">
        <div className="w-full bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm py-10 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-6 items-center">
              {BANNER_IMAGES.map((bannerImage, i) => (
                <div key={i} className="flex items-center justify-center p-2">
                  <Link
                    href={bannerImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  >
                    <Image
                      src={`/${encodeURIComponent(bannerImage.filename)}`}
                      alt={bannerImage.alt}
                      width={200}
                      height={56}
                      className="h-10 sm:h-12 w-auto object-contain logo-fade"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key figures (inspired) */}
      <section className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card">
            <div className="text-4xl font-extrabold stat-gradient">+20</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Partenaires et dispositifs
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card">
            <div className="text-4xl font-extrabold stat-gradient">4</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Étapes de parcours guidé
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card">
            <div className="text-4xl font-extrabold stat-gradient">
              Quelques min.
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Pour obtenir vos recommandations
            </p>
          </div>
        </div>
      </section>

      {/* Feature grid (inspired) */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <GradientCard className="tilt-card">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 10h6l2-3 2 6 2-3h4" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold">Rapide et guidé</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Un chemin simple en quelques questions pour cibler vos besoins
                  et vous orienter.
                </p>
              </div>
            </div>
          </GradientCard>
          <GradientCard className="tilt-card">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-600"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10l3 3 9-9" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold">Pertinent</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Recommandations adaptées aux entreprises et porteurs de
                  projets, issues d’acteurs reconnus.
                </p>
              </div>
            </div>
          </GradientCard>
          <GradientCard className="tilt-card">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600/10 text-rose-600"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 2v16M2 10h16" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold">Mise en relation</h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Accès direct aux services et dispositifs pour passer à
                  l’action rapidement.
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
      </section>

      {/* Additional info */}
      <section className="relative max-w-5xl mx-auto px-4 mt-12 pb-16">
        <GradientCard>
          <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
            Les entreprises en Tunisie trouveront dans ce document la
            présentation des acteurs, les solutions et les financements, mis en
            œuvre notamment dans le cadre du Plan France 2030.
          </p>
        </GradientCard>
      </section>
    </div>
  );
}
