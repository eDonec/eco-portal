import {
  DirectRecommendation,
  FinancingRecommendation,
  InvestRecommendation,
} from "@/machines/ecoPortalMachine/types";
import React from "react";

import AFD from "../cards/AFD";
import BF from "../cards/BF";
import BFMarketplace from "../cards/BFMarketplace";
import BPIF from "../cards/BPIF";
import BrochureDownloadCard from "../cards/BrochureDownload";
import CCEF from "../cards/CCEF";
import CF from "../cards/CF";
import EF from "../cards/EF";
import FTT from "../cards/FTT";
import LCTPMEPMI from "../cards/LCTPMEPMI";
import Proparco from "../cards/Proparco";
import SER from "../cards/SER";
import TFE from "../cards/TFE";

export type RecommendationKey =
  | FinancingRecommendation
  | InvestRecommendation
  | DirectRecommendation;

export interface RecommendationContent {
  Cards: {
    title?: string;
    card: React.ComponentType;
    logos: string[];
  }[];
}

export const RECOMMENDATION_CONTENT: Record<
  RecommendationKey,
  RecommendationContent
> = {
  [FinancingRecommendation.Proparco]: {
    Cards: [
      {
        title: "L'Agence Française de Développement",
        card: AFD,
        logos: ["/public/7 V.svg"],
      },
      { title: "Proparco", card: Proparco, logos: ["/public/4 V.svg"] },
    ],
  },
  [FinancingRecommendation.PageFASEP]: {
    Cards: [
      {
        title: "Le Service Economique Régional (SER)",
        card: SER,
        logos: ["/public/1 V.svg"],
      },
    ],
  },
  [FinancingRecommendation.LigneCreditPME]: {
    Cards: [
      {
        title: "Le Service Economique Régional (SER)",
        card: SER,
        logos: ["/public/1 V.svg"],
      },
      {
        title: "Ligne de crédit du Trésor pour les PME-PMI",
        card: LCTPMEPMI,
        logos: ["/public/11 V.svg"],
      },
    ],
  },
  [FinancingRecommendation.BPIF]: {
    Cards: [{ title: "Bpifrance", card: BPIF, logos: ["/public/12 V.svg"] }],
  },
  [FinancingRecommendation.ExpertiseFrance]: {
    Cards: [
      {
        title: "Expertise France (Groupe AFD)",
        card: EF,
        logos: ["/public/6 V.svg"],
      },
    ],
  },
  [InvestRecommendation.France]: {
    Cards: [
      {
        title: "Business France de Tunis ",
        card: BF,
        logos: ["/public/3 V.svg"],
      },
      {
        title: "Choose France",
        card: CF,
        logos: ["/public/14 V.svg", "/public/15 V.svg"],
      },
    ],
  },
  [InvestRecommendation.Tunisie]: {
    Cards: [],
  },
  [DirectRecommendation.BusinessFrance]: {
    Cards: [
      {
        title: "Business France de Tunis ",
        card: BF,
        logos: ["/public/3 V.svg"],
      },
    ],
  },
  [DirectRecommendation.BusinessFranceAnchors]: {
    Cards: [
      {
        title: "Business France de Tunis ",
        card: BF,
        logos: ["/public/3 V.svg"],
      },
      { title: "Team France Export", card: TFE, logos: ["/public/13 V.svg"] },
    ],
  },
  [DirectRecommendation.SER_BF_CCEF]: {
    Cards: [
      {
        title: "Le Service Economique Régional (SER)",
        card: SER,
        logos: ["/public/1 V.svg"],
      },
      {
        title: "Business France de Tunis ",
        card: BF,
        logos: ["/public/3 V.svg"],
      },
      {
        title: "Les Conseillers du Commerce Extérieur de la France (CCE)",
        card: CCEF,
        logos: ["/public/9 V.svg"],
      },
    ],
  },
  [DirectRecommendation.BrochureEcoEquipeFranceTN]: {
    Cards: [
      {
        card: BrochureDownloadCard,
        logos: [],
      },
    ],
  },
  [DirectRecommendation.ConsulatFranceVisas]: {
    Cards: [],
  },
  [DirectRecommendation.ExpertiseFranceGroupeAFD]: {
    Cards: [
      { title: "Expertise France", card: EF, logos: ["/public/6 V.svg"] },
      {
        title: "L'Agence Française de Développement",
        card: AFD,
        logos: ["/public/7 V.svg"],
      },
    ],
  },
  [DirectRecommendation.FrenchTech]: {
    Cards: [
      { title: "French Tech Tunis", card: FTT, logos: ["/public/10 V.svg"] },
    ],
  },
  [DirectRecommendation.BusinessFranceMarketPlace]: {
    Cards: [
      {
        title: "Business France de Tunis ",
        card: BF,
        logos: ["/public/3 V.svg"],
      },
      {
        title: "Business France Marketplace",
        card: BFMarketplace,
        logos: ["/public/2 V.svg"],
      },
    ],
  },
  [DirectRecommendation.SER_CCEF]: {
    Cards: [
      {
        title: "Le Service Economique Régional (SER)",
        card: SER,
        logos: ["/public/1 V.svg"],
      },
      {
        title: "Les Conseillers du Commerce Extérieur de la France (CCE)",
        card: CCEF,
        logos: ["/public/9 V.svg"],
      },
    ],
  },
};
