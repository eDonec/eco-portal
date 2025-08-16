import { assign, createMachine } from "xstate";
import {
  EntrepriseNeedAnswerLabels,
  FinancingTypeAnswerLabels,
  InvestAnswerLabels,
  ParticulierNeedAnswerLabels,
  StatusAnswerLabels,
} from "./constants";
import {
  DirectRecommendation,
  EcoFlowState,
  EcoPortalContext,
  EcoPortalEvent,
  EcoPortalEventType,
  EcoQuestion,
  EcoStatus,
  EntrepriseNeed,
  FinancingRecommendation,
  FinancingType,
  InvestRecommendation,
  InvestType,
  ParticulierNeed,
} from "./types";

// Mapping utilities
const financingResultMap: Record<FinancingType, FinancingRecommendation> = {
  [FinancingType.PretSecteurDurable]: FinancingRecommendation.Proparco,
  [FinancingType.SubventionAvance]: FinancingRecommendation.PageFASEP,
  [FinancingType.PretBanqueTnFr]: FinancingRecommendation.LigneCreditPME,
  [FinancingType.AssuranceBpi]: FinancingRecommendation.BPIF,
  [FinancingType.AppelProjetsCoopTech]: FinancingRecommendation.ExpertiseFrance,
};

const investResultMap: Record<InvestType, InvestRecommendation> = {
  [InvestType.France]: InvestRecommendation.France,
  [InvestType.Tunisie]: InvestRecommendation.Tunisie,
};

// Helpers for questions and options
export const getEcoQuestion = (state: EcoFlowState): string => {
  switch (state) {
    case EcoFlowState.Status:
      return EcoQuestion.Status;
    case EcoFlowState.Need:
      return EcoQuestion.Need;
    case EcoFlowState.Financing:
      return EcoQuestion.Financing;
    case EcoFlowState.Invest:
      return EcoQuestion.Invest;
    default:
      return "";
  }
};

export const getEcoOptions = (
  state: string,
  context: EcoPortalContext
): string[] => {
  switch (state) {
    case EcoFlowState.Status:
      return [EcoStatus.Entreprise, EcoStatus.Particulier];
    case EcoFlowState.Need: {
      if (context.status === EcoStatus.Entreprise) {
        return [
          EntrepriseNeed.Financement,
          EntrepriseNeed.Exporter,
          EntrepriseNeed.Investissement,
          EntrepriseNeed.Implantation,
          EntrepriseNeed.InfoMarche,
        ];
      }
      if (context.status === EcoStatus.Particulier) {
        return [
          ParticulierNeed.Visa,
          ParticulierNeed.ProgrammeTechnique,
          ParticulierNeed.Financement,
          ParticulierNeed.Produits,
          ParticulierNeed.Infos,
        ];
      }
      return [];
    }
    case EcoFlowState.Financing:
      return [
        FinancingType.PretSecteurDurable,
        FinancingType.SubventionAvance,
        FinancingType.PretBanqueTnFr,
        FinancingType.AssuranceBpi,
        FinancingType.AppelProjetsCoopTech,
      ];
    case EcoFlowState.Invest:
      return [InvestType.France, InvestType.Tunisie];
    default:
      return [];
  }
};

// Machine
export const ecoPortalMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5RgMYHsAKaBOAXAhgDYDEASgKIDKAKgIKnUDaADALqKgAOasAlrrzQA7DiAAeiACwAmADQgAnogCMAdkmSAdAFYAbMu0AOZtOWTmq3aoC+1+akw4ChTbAK4ArrGKVyAGXIAYWoAfRpaagBVShZ2JBBuPgFhUQkEZWUATgBmTUlVZWzTfUls7WV5JQRDZU0i6UzlXUzpXWZMq1t7dCw8Ik0hMEgffyDQgDlycgARWNFE-kEReLTpQ21NXSN15sNJbUkWypU9Q01LZmzdbMzDVWYD7S7wHqd+weHfAOCQyZnGZRxLg8RYpFaINYbLaGHa3faHOSKFQaXSaQyZB5WUy3VTZSTPBy9ZwDIYQEbfCZTWbSIEJEHJZagVbrTbbPRwg5HJEIcyqPKZAU4+5XfQE159FwfMlfMa-KmMbK0hYM1IQlnQ2F7TmIqrScqaZhbZTMS6GKyqIz4uwvRwSkmfUY-P6zSRK+lLVUISGsmHsrUI44IbTBzRwq7stTSDRi23EqXk2XOxjaN1JD3gr3qtm7eFcqr3LSSXR3Ir6bLMQzSGzWwlvSWkhNO+W6VOgxniNVQ7McgPc9bSUPacsCocacyGGNE94NmVN-6qVsqjPejV+3M6lQm2qldS6XT7bSqW6ZSd1+3Sx2U-6GRfppmdn2a9eBjKHUOmQzZL+qAqH092+NZyvWZMlvMF70zLtfRzbUXwaM5zF0aQTXg8ptGkf9iQAM14IR8CEFBcKgRtQgAMQASXGWhxkCSiAHE5niZU7w7ao1FDSxg3WTJ8nRbIXwOM5kMkGpTDUbRMieGtxWJXCADc4FwEiQkogA1KgmDYeZ3XA1iaj5TJOKMCTeJyQNpGyPkLVUGoh3aYtVAw6TY36dAAFtOEIMBcGGChwgYRjgTTXS0gyHI8gKIomjMMoKj7I8dCsYtJDUExSmyWxrSENAIDgURawlbTgvbNIAFpdEDUqNkFGrasMpzuhclw3HwTx4CYnSSpUbJ0QNDpv3uDIzUDDEtEk5gRNaZRjAsZRMOnSAirbT0Ck0NQOluM09ksq4BJhfktgmyso3yXR5pcHC8IIoilqXCDmlRGR7nWYyeosATDPOEwsnQ5gMhKc7NHkxTbpYtIHryKsKy4odjFUcy7k0PVynUM1DWUaQGptKcXHczzvMWjris9Y0kLWtQDErFLLnQkaTDybQHnRxn9z2TLrCAA */
    id: "ecoPortal",
    initial: EcoFlowState.Status,
    context: {
      status: null,
      need: null,
      financingType: null,
      investType: null,
      recommendations: [],
      responses: [],
    } as EcoPortalContext,

    types: {} as { context: EcoPortalContext; events: EcoPortalEvent },

    states: {
      [EcoFlowState.Status]: {
        on: {
          [EcoPortalEventType.SelectStatus]: {
            target: EcoFlowState.Need,
            actions: ["setStatus", "addStatusResponse"],
          },
          [EcoPortalEventType.Back]: {
            // Already at the first step; no-op
            target: EcoFlowState.Status,
          },
        },
      },

      [EcoFlowState.Need]: {
        on: {
          [EcoPortalEventType.Back]: {
            target: EcoFlowState.Status,
            actions: assign({
              status: () => null,
              need: () => null,
              financingType: () => null,
              investType: () => null,
              recommendations: () => [],
              // Keep responses or trim last? Keep simple: keep history.
            }),
          },
          [EcoPortalEventType.SelectNeed]: [
            {
              guard: "isEntrepriseFinancement",
              target: EcoFlowState.Financing,
              actions: ["setNeed", "addNeedResponse"],
            },
            {
              guard: "isParticulierFinancement",
              target: EcoFlowState.Financing,
              actions: ["setNeed", "addNeedResponse"],
            },
            // Entreprise direct results
            {
              guard: "isEntrepriseExporter",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [DirectRecommendation.BusinessFrance],
                }),
              ],
            },
            {
              guard: "isEntrepriseInvestissement",
              target: EcoFlowState.Invest,
              actions: ["setNeed", "addNeedResponse"],
            },
            {
              guard: "isEntrepriseImplantation",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.BusinessFranceAnchors,
                  ],
                }),
              ],
            },
            {
              guard: "isEntrepriseInfoMarche",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.SER_BF_CCEF,
                    DirectRecommendation.BrochureEcoEquipeFranceTN,
                  ],
                }),
              ],
            },
            // Particulier direct results
            {
              guard: "isParticulierVisa",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.ConsulatFranceVisas,
                  ],
                }),
              ],
            },
            {
              guard: "isParticulierProgramme",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.ExpertiseFranceGroupeAFD,
                    DirectRecommendation.FrenchTech,
                  ],
                }),
              ],
            },
            {
              guard: "isParticulierProduits",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.BusinessFranceMarketPlace,
                  ],
                }),
              ],
            },
            {
              guard: "isParticulierInfos",
              target: EcoFlowState.Completed,
              actions: [
                "setNeed",
                "addNeedResponse",
                assign({
                  recommendations: () => [
                    DirectRecommendation.SER_CCEF,
                    DirectRecommendation.BrochureEcoEquipeFranceTN,
                  ],
                }),
              ],
            },
          ],
        },
      },

      [EcoFlowState.Financing]: {
        on: {
          [EcoPortalEventType.Back]: {
            target: EcoFlowState.Need,
            actions: assign({
              financingType: () => null,
              recommendations: () => [],
            }),
          },
          [EcoPortalEventType.SelectFinancing]: {
            target: EcoFlowState.Completed,
            actions: [
              "setFinancing",
              "addFinancingResponse",
              assign({
                recommendations: ({ event }) =>
                  event.type === EcoPortalEventType.SelectFinancing
                    ? [financingResultMap[event.financing]]
                    : [],
              }),
            ],
          },
        },
      },

      [EcoFlowState.Invest]: {
        on: {
          [EcoPortalEventType.Back]: {
            target: EcoFlowState.Need,
            actions: assign({
              investType: () => null,
              recommendations: () => [],
            }),
          },
          [EcoPortalEventType.SelectInvest]: {
            target: EcoFlowState.Completed,
            actions: [
              "setInvest",
              "addInvestResponse",
              assign({
                recommendations: ({ event }) =>
                  event.type === EcoPortalEventType.SelectInvest
                    ? [investResultMap[event.invest]]
                    : [],
              }),
            ],
          },
        },
      },

      [EcoFlowState.Completed]: {
        on: {
          [EcoPortalEventType.Back]: [
            {
              guard: ({ context }) => context.investType !== null,
              target: EcoFlowState.Invest,
              actions: assign({ recommendations: () => [] }),
            },
            {
              guard: ({ context }) => context.financingType !== null,
              target: EcoFlowState.Financing,
              actions: assign({ recommendations: () => [] }),
            },
            {
              target: EcoFlowState.Need,
              actions: assign({ recommendations: () => [] }),
            },
          ],
          [EcoPortalEventType.Restart]: {
            target: "#ecoPortal.status",
            actions: "resetMachine",
          },
        },
      },
    },

    on: {
      [EcoPortalEventType.Back]: {
        // Default no-op; state-level handlers manage Back
      },
      [EcoPortalEventType.Restart]: {
        target: ".status",
        actions: "resetMachine",
      },
    },
  },
  {
    actions: {
      setStatus: assign({
        status: ({ event }) =>
          event.type === EcoPortalEventType.SelectStatus ? event.status : null,
      }),
      addStatusResponse: assign({
        responses: ({ context, event }) =>
          event.type !== EcoPortalEventType.SelectStatus
            ? context.responses
            : [
                ...context.responses,
                {
                  question: EcoQuestion.Status,
                  answer: StatusAnswerLabels[event.status],
                  timestamp: new Date(),
                },
              ],
      }),

      setNeed: assign({
        need: ({ event }) =>
          event.type === EcoPortalEventType.SelectNeed ? event.need : null,
      }),
      addNeedResponse: assign({
        responses: ({ context, event }) =>
          event.type !== EcoPortalEventType.SelectNeed
            ? context.responses
            : [
                ...context.responses,
                {
                  question: EcoQuestion.Need,
                  answer:
                    context.status === EcoStatus.Entreprise
                      ? EntrepriseNeedAnswerLabels[event.need as EntrepriseNeed]
                      : ParticulierNeedAnswerLabels[
                          event.need as ParticulierNeed
                        ],
                  timestamp: new Date(),
                },
              ],
      }),

      setFinancing: assign({
        financingType: ({ event }) =>
          event.type === EcoPortalEventType.SelectFinancing
            ? event.financing
            : null,
      }),
      addFinancingResponse: assign({
        responses: ({ context, event }) =>
          event.type !== EcoPortalEventType.SelectFinancing
            ? context.responses
            : [
                ...context.responses,
                {
                  question: EcoQuestion.Financing,
                  answer: FinancingTypeAnswerLabels[event.financing],
                  timestamp: new Date(),
                },
              ],
      }),

      setInvest: assign({
        investType: ({ event }) =>
          event.type === EcoPortalEventType.SelectInvest ? event.invest : null,
      }),
      addInvestResponse: assign({
        responses: ({ context, event }) =>
          event.type !== EcoPortalEventType.SelectInvest
            ? context.responses
            : [
                ...context.responses,
                {
                  question: EcoQuestion.Invest,
                  answer: InvestAnswerLabels[event.invest],
                  timestamp: new Date(),
                },
              ],
      }),

      resetMachine: assign({
        status: null,
        need: null,
        financingType: null,
        investType: null,
        recommendations: [],
        responses: [],
      }),
    },

    guards: {
      // Financing routes
      isEntrepriseFinancement: ({ context, event }) =>
        context.status === EcoStatus.Entreprise &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === EntrepriseNeed.Financement,
      isParticulierFinancement: ({ context, event }) =>
        context.status === EcoStatus.Particulier &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === ParticulierNeed.Financement,

      // Entreprise direct routes
      isEntrepriseExporter: ({ context, event }) =>
        context.status === EcoStatus.Entreprise &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === EntrepriseNeed.Exporter,
      isEntrepriseInvestissement: ({ context, event }) =>
        context.status === EcoStatus.Entreprise &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === EntrepriseNeed.Investissement,
      isEntrepriseImplantation: ({ context, event }) =>
        context.status === EcoStatus.Entreprise &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === EntrepriseNeed.Implantation,
      isEntrepriseInfoMarche: ({ context, event }) =>
        context.status === EcoStatus.Entreprise &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === EntrepriseNeed.InfoMarche,

      // Particulier direct routes
      isParticulierVisa: ({ context, event }) =>
        context.status === EcoStatus.Particulier &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === ParticulierNeed.Visa,
      isParticulierProgramme: ({ context, event }) =>
        context.status === EcoStatus.Particulier &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === ParticulierNeed.ProgrammeTechnique,
      isParticulierProduits: ({ context, event }) =>
        context.status === EcoStatus.Particulier &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === ParticulierNeed.Produits,
      isParticulierInfos: ({ context, event }) =>
        context.status === EcoStatus.Particulier &&
        event.type === EcoPortalEventType.SelectNeed &&
        event.need === ParticulierNeed.Infos,
    },
  }
);
