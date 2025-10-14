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

1. Start the dev server:

```bash
yarn dev
```

1. Open <http://localhost:3000>

- Accessible French UI with proper metadata and a global 404 page

```tree
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    eco-portal/
      page.tsx                  # Redirects to /eco-portal/status
      [step]/
        page.tsx                # Async server route; guards & renders client form
      result/
        page.tsx                # Results page (server) with Suspense
  components/
    layout/
      Header/                   # Header ("Portail Économique")
      Footer/                   # Footer (copyright)
    cards/
      BrochureDownload/         # PDF download link card
      ...cards contents
    RecommendationCard/         # RECOMMENDATION_CONTENT mapping
    Results/                    # Results display recommended cards
    Recap/                      # Recap sidebar component
    Loader/                     # Loader (spinner + customizable label)
    OptionButton/               # Option button component
    OptionsList/                # Options list component
  containers/
    forms/
      EcoPortalForm/
        index.tsx               # Client form UI
        useEcoPortalForm.ts     # Form logic (hooks/machine wiring)
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

- Question & options helpers from `getEcoQuestion/getEcoOptions`
- Responses are appended to `context.responses` for the recap
  trail and are forwarded to the results page via a `resp` query param.

Recommendations content

- File: `src/components/RecommendationCard/index.ts`
- Export: `RECOMMENDATION_CONTENT`
  - `{ Cards: { title?: string; card: React.ComponentType; logos: string[] }[] }`
- Results page: `src/components/Results/index.tsx`
  - Parses `recs` and `resp` from the URL
  - Renders grouped partner cards and a recap sidebar using the shared `Recap` component
  - Normalizes logo paths by stripping a leading `/public/`

## 🧭 Routing & Pages

- Accueil: `src/app/page.tsx` — intro + logos grid (SVGs in `/public`)
- Questionnaire entry: `src/app/eco-portal/page.tsx` — redirects to `/eco-portal/status`
- Step pages: `src/app/eco-portal/[step]/page.tsx` — server-validated step with async `params`/`searchParams` and Suspense-wrapped client form
- Résultats: `src/app/eco-portal/result/page.tsx` — Suspense + Results
- 404: `src/app/not-found.tsx` — friendly French not-found page

  - « tous droit réservés à l’Ambassade de France à Tunis et le Comité Tunisie des Conseillers du commerce extérieur de la France. »

- Loader: `src/components/Loader` (spinner + customizable label)

## 🖼️ Images & PDFs

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

## 🧑‍💻 Form UX & Recap

- The form uses a “select then Next” interaction:
  - Clicking an option highlights it (no immediate navigation)
  - A “Suivant” button stays disabled until a choice is selected
  - On Next, the choice is committed to the XState machine and routing proceeds to the next step (or results when complete)
- The recap sidebar is always visible:
  - It shows on all steps and on the results page
  - Layout is consistent: right sidebar on large screens, stacked below on small screens
  - Results also display the recap using the `resp` query param to persist answers

## 🤝 Contributing

1. Install deps and run `yarn dev`
2. Make changes and add tests when editing machine behavior
3. `yarn test` and `yarn lint` before commit

---

Made with Next.js, XState, Tailwind, and TypeScript.

## 🪟 Modal (Iframe) System

An application-wide iframe modal is available to preview external resources without navigating away.

Usage inside a component:

```tsx
import { useModal } from "@/components/ui/ModalContext";

export function ExampleButton() {
  const { openModal } = useModal();
  return (
    <button
      onClick={() => openModal("https://example.com")}
      className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
    >
      Ouvrir exemple
    </button>
  );
}
```

Features:

- Closes on overlay click, ESC, or the × button
- Focus trap + restore to trigger element
- Body scroll locked while open
- Responsive: full height on small screens, centered panel on larger screens

If you add cards with links you want intercepted, replace their `<a target="_blank">` handler with a call to `openModal(url)` and optionally keep a context menu accessible version.
