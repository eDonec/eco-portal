import EdgeToCenterLine from "@/components/EdgeToCenterLine";
import Reveal from "@/components/motion/Reveal";
import StickyVerticalCardsScroll from "@/components/StickyVerticalCardsScroll";
import { GradientCard } from "@/components/ui/GradientCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Transformez votre impact économique : orientez-vous vers les bons services et financements France–Tunisie.",
};

export default function Home() {
  return (
    <div className="min-h-screen transition-colors">
      {/* Hero */}
      <section className="relative max-w-6xl space-y-14 mx-auto px-4 pt-14 pb-12">
        <Reveal
          className="mx-auto max-w-4xl text-center"
          effect="fade-in"
          duration={800}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight gradient-text-animated drop-shadow-sm">
            L&rsquo;équipe économique France en Tunisie accompagne tous vos projets
          </h1>
        </Reveal>
        <Reveal effect="pop" duration={600} className="h-full">
          <p className="mt-4 text-lg md:text-xl lg:text-2xl font-semibold text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Un portail simple pour orienter entreprises et porteurs de projets vers les dispositifs et financements répondant à vos besoins
          </p>
        </Reveal>
        <Reveal
          className="mt-6 flex justify-center"
          effect="pop"
          duration={500}
          delay={100}
        >
          <Link
            href="/eco-portal"
            className="transition-all inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-rose-500 text-white px-8 py-4 text-sm sm:text-base font-semibold shadow-lg   hover:shadow-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            <span>Laissez-vous guider</span>
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
        </Reveal>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <Reveal effect="pop" duration={600} className="h-full">
            <GradientCard className="tilt-card h-full">
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
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                    Rapide et guidé
                  </h3>
                  <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
                    Un chemin simple en quelques questions pour cibler vos
                    besoins et vous orienter.
                  </p>
                </div>
              </div>
            </GradientCard>
          </Reveal>
          <Reveal effect="pop" duration={600} delay={100} className="h-full">
            <GradientCard className="tilt-card h-full">
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
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                    Pertinent
                  </h3>
                  <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
                    Recommandations adaptées aux entreprises et porteurs de
                    projets, issues d&rsquo;acteurs reconnus.
                  </p>
                </div>
              </div>
            </GradientCard>
          </Reveal>
          <Reveal effect="pop" duration={600} delay={200} className="h-full">
            <GradientCard className="tilt-card h-full">
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
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
                    Mise en relation
                  </h3>
                  <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300">
                    Accès direct aux services et dispositifs pour passer à
                    l&rsquo;action rapidement.
                  </p>
                </div>
              </div>
            </GradientCard>
          </Reveal>
        </div>
      </section>

      <StickyVerticalCardsScroll />

      {/* Split paragraphs with accents */}
      <section
        id="acteurs"
        className="relative max-w-2xl lg:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 py-14"
      >
        <div className="grid grid-cols-1 gap-12 md:gap-28">
          <Reveal className="max-w-4xl" effect="fade-right" duration={700}>
            <p className="v-accent-left text-gray-800 dark:text-gray-100 text-xl sm:text-3xl lg:text-4xl font-medium leading-snug sm:leading-tight">
              L&rsquo;Ambassade de France en Tunisie comprend plusieurs services
              à vocation économique qui accompagnent les entreprises et les
              pouvoirs publics : le Service Economique Régional, Business
              France, l&rsquo;Agence Française de Développement, Proparco et Expertise
              France.
            </p>
          </Reveal>
          <Reveal
            className="max-w-4xl ml-auto"
            effect="fade-left"
            duration={700}
            delay={80}
          >
            <p className="v-accent-right text-gray-800 dark:text-gray-100 text-xl sm:text-3xl lg:text-4xl font-medium leading-snug sm:leading-tight">
              Le Comité Tunisie des Conseillers du Commerce Extérieur de la
              France (CCEF), la Chambre de Commerce et d&rsquo;Industrie
              Tuniso-Française (CCITF) et les opérateurs privés référencés
              complètent ce dispositif. La communauté French Tech Tunis et
              Digital Africa soutiennent plus particulièrement les startups et
              l&rsquo;innovation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Loading line reveal for Key figures */}
      <EdgeToCenterLine />

      {/* Key figures (inspired) */}
      <section className="relative max-w-6xl mx-auto px-4 py-10 mt-[-30vh]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <Reveal effect="fade-up" duration={600}>
            <div className="rounded-xl h-full border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card flex flex-col items-center justify-center">
              <div className="text-4xl font-extrabold stat-gradient">+20</div>
              <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                Partenaires et dispositifs
              </p>
            </div>
          </Reveal>
          <Reveal effect="fade-up" duration={600} delay={80}>
            <div className="rounded-xl h-full border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card flex flex-col items-center justify-center">
              <div className="text-4xl font-extrabold stat-gradient">4</div>
              <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                Étapes de parcours guidé
              </p>
            </div>
          </Reveal>
          <Reveal effect="fade-up" duration={600} delay={160}>
            <div className="rounded-xl h-full border border-gray-200 dark:border-gray-800 px-6 py-6 bg-white/70 dark:bg-gray-900/40 tilt-card flex flex-col items-center justify-center">
              <div className="text-4xl font-extrabold stat-gradient">
                2 min.
              </div>
              <p className="mt-1 text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
                Pour obtenir vos recommandations
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature grid (inspired) */}
      

      {/* Additional info */}
      <section className="relative max-w-5xl mx-auto px-4 mt-12 pb-16">
        <Reveal effect="pop" duration={600} className="h-full">
          <GradientCard>
            <p className="text-gray-800 font-semibold leading-relaxed">
              Les entreprises en Tunisie trouveront dans ce document la
              présentation des acteurs, les solutions et les financements, mis
              en œuvre notamment dans le cadre du Plan France 2030.
            </p>
          </GradientCard>
        </Reveal>
        <Reveal
          className="mt-6 flex justify-center"
          effect="pop"
          duration={500}
          delay={100}
        >
          <Link
            href="/eco-portal"
            className="transition-all inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-rose-500 text-white px-8 py-4 text-sm sm:text-base font-semibold shadow-lg   hover:shadow-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            <span>Laissez-vous guider</span>
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
        </Reveal>
      </section>
    </div>
  );
}
