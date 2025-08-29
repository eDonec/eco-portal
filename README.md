# Portail Économique — France–Tunisie

Next.js 15 app (App Router) using XState 5 to guide users through a short questionnaire and generate tailored recommendations with partner cards and resources.

## 🚀 Getting Started

Prerequisites

- Node.js 18+
- yarn (recommended)

Install & run

1. Install dependencies:

```bash
yarn install
```

2. Start the dev server:

```bash
yarn dev
```

3. Open <http://localhost:3000>

- Accessible French UI with proper metadata and a global 404 page

```tree
src/
  app/
    page.tsx
    layout.tsx
    not-found.tsx
    eco-portal/              # Eco portal form
      result/
        page.tsx             # Results page (server) with Suspense
  components/
    layout/
      Header/                 # Site header ("Portail Économique")
      Footer/                 # Footer (copyright)
    cards/
      BrochureDownload/       # PDF download link card
      ...cards contents
    RecommendationCard/       # RECOMMENDATION_CONTENT mapping
    Results/                  # Results display recommended cards
  containers/
    forms/
      EcoPortalForm/
        ClientEcoPortalForm/  # Client-side form
        index.tsx             # SSR-safe wrapper
  machines/
    ecoPortalMachine/
      index.ts                  # State machine + guards/actions
      constants.ts              # Labels and copy
      types.ts                  # Types/enums
      ecoPortalMachine.test.ts  # State machine tests
public/
```

## ⚙️ State Machine (Eco Portal)

- File: `src/machines/ecoPortalMachine/index.ts`
- Guards map user choices to next step or direct recommendations
- Actions build the `recommendations` array and record a `responses` trail
- Events: `SelectStatus`, `SelectNeed`, `SelectFinancing`, `SelectInvest`, `Back`, `Restart`

Question & options helpers
Persistence

- Server page: `src/app/eco-portal/result/page.tsx`

  - Wraps a client results component in `<Suspense>`
  - Normalizes logo paths by stripping a leading `/public/`
  - Renders cards and partner logos using `next/image`

- File: `src/components/RecommendationCard/index.ts`
- Export: `RECOMMENDATION_CONTENT`
  - value: `{ Cards: { title?: string; card: React.ComponentType; logos: string[] }[] }`
- Logos
  - Place assets in `/public`
  - Reference with a path like `"/1 V.svg"` (served from root)
  - If an entry uses `"/public/..."` it will be normalized to `/...`

## 🧭 Routing & Pages

- Accueil: `src/app/page.tsx` — intro + logos grid (SVGs in `/public`)
- Questionnaire: `src/app/eco-portal/page.tsx` — wraps `ClientEcoPortalForm`
- Résultats: `src/app/eco-portal/result/page.tsx` — Suspense + Results
- 404: `src/app/not-found.tsx` — friendly French not-found page

  - « tous droit réservés à l’Ambassade de France à Tunis et le Comité Tunisie des Conseillers du commerce extérieur de la France. »

- Loader: `src/components/Loader` (spinner + customizable label)

## �️ Images & PDFs

- Files under `/public` are served from root (e.g. `/logo.svg`, not `/public/logo.svg`)
- Logos are rendered via `next/image` with increased intrinsic size for crispness

## 🔎 SEO & Metadata

- Site-wide metadata: `src/app/layout.tsx`
  - French locale, title template, keywords, description
- Page-specific metadata for Accueil, Questionnaire, Résultats

## 🧪 Testing

- Framework: Vitest
- Tests: `src/machines/ecoPortalMachine/ecoPortalMachine.test.ts` (12 tests)

Run

```bash
yarn test
```

## 🧹 Linting

```bash
yarn lint
```

## ⚠️ Common Pitfalls

- Do not link to `/public/...`; use `/<filename>` instead
- When adding logos, prefer SVGs; for PNGs, keep adequate intrinsic sizes
- If you add a new recommendation key, update both the machine and `RECOMMENDATION_CONTENT`

## 🤝 Contributing

1. Install deps and run `yarn dev`
2. Make changes and add tests when editing machine behavior
3. `yarn test` and `yarn lint` before commit

---

Made with Next.js, XState, Tailwind, and TypeScript.
