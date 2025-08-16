import { beforeEach, describe, expect, it } from "vitest";
import { createActor } from "xstate";
import { ecoPortalMachine, getEcoOptions, getEcoQuestion } from ".";
import {
  DirectRecommendation,
  EcoFlowState,
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

// Basic happy paths for the French ecoPortal decision tree

describe("ecoPortalMachine", () => {
  let actor: ReturnType<typeof createActor<typeof ecoPortalMachine>>;

  beforeEach(() => {
    actor = createActor(ecoPortalMachine);
    actor.start();
  });

  it("starts at status and asks the right question", () => {
    expect(actor.getSnapshot().value).toBe(EcoFlowState.Status);
    expect(getEcoQuestion(EcoFlowState.Status)).toBe(EcoQuestion.Status);
    expect(
      getEcoOptions(EcoFlowState.Status, actor.getSnapshot().context)
    ).toEqual([EcoStatus.Entreprise, EcoStatus.Particulier]);
  });

  describe("Entreprise flow", () => {
    beforeEach(() => {
      actor.send({
        type: EcoPortalEventType.SelectStatus,
        status: EcoStatus.Entreprise,
      });
    });

    it("routes entreprise > besoin = exporter directly to Business France", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: EntrepriseNeed.Exporter,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.BusinessFrance,
      ]);
    });

    it("routes entreprise > besoin = investissement to invest step then to result France", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: EntrepriseNeed.Investissement,
      });
      expect(actor.getSnapshot().value).toBe(EcoFlowState.Invest);

      actor.send({
        type: EcoPortalEventType.SelectInvest,
        invest: InvestType.France,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([InvestRecommendation.France]);
    });

    it("routes entreprise > besoin = financement to financing then to specific recommendation", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: EntrepriseNeed.Financement,
      });
      expect(actor.getSnapshot().value).toBe(EcoFlowState.Financing);

      actor.send({
        type: EcoPortalEventType.SelectFinancing,
        financing: FinancingType.AssuranceBpi,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([FinancingRecommendation.BPIF]);
    });

    it("routes entreprise > besoin = implantation directly to combined partners", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: EntrepriseNeed.Implantation,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.BusinessFranceAnchors,
      ]);
    });

    it("routes entreprise > besoin = info-marche directly to SER/BF/CCEF", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: EntrepriseNeed.InfoMarche,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.SER_BF_CCEF,
        DirectRecommendation.BrochureEcoEquipeFranceTN,
      ]);
    });
  });

  describe("Particulier flow", () => {
    beforeEach(() => {
      actor.send({
        type: EcoPortalEventType.SelectStatus,
        status: EcoStatus.Particulier,
      });
    });

    it("routes particulier > visa directly to consulate", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: ParticulierNeed.Visa,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.ConsulatFranceVisas,
      ]);
    });

    it("routes particulier > programme-technique directly to Expertise France + French Tech", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: ParticulierNeed.ProgrammeTechnique,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.ExpertiseFranceGroupeAFD,
        DirectRecommendation.FrenchTech,
      ]);
    });

    it("routes particulier > produits directly to Business France/Market Place", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: ParticulierNeed.Produits,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.BusinessFranceMarketPlace,
      ]);
    });

    it("routes particulier > infos directly to SER/CCEF", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: ParticulierNeed.Infos,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([
        DirectRecommendation.SER_CCEF,
        DirectRecommendation.BrochureEcoEquipeFranceTN,
      ]);
    });

    it("routes particulier > financement to financing and to Assurance BPI option", () => {
      actor.send({
        type: EcoPortalEventType.SelectNeed,
        need: ParticulierNeed.Financement,
      });
      expect(actor.getSnapshot().value).toBe(EcoFlowState.Financing);

      actor.send({
        type: EcoPortalEventType.SelectFinancing,
        financing: FinancingType.AssuranceBpi,
      });
      const s = actor.getSnapshot();
      expect(s.value).toBe(EcoFlowState.Completed);
      expect(s.context.recommendations).toEqual([FinancingRecommendation.BPIF]);
    });
  });

  it("allows restart to reset the flow", () => {
    actor.send({
      type: EcoPortalEventType.SelectStatus,
      status: EcoStatus.Entreprise,
    });
    actor.send({
      type: EcoPortalEventType.SelectNeed,
      need: EntrepriseNeed.Exporter,
    });
    expect(actor.getSnapshot().value).toBe(EcoFlowState.Completed);

    actor.send({ type: EcoPortalEventType.Restart });
    expect(actor.getSnapshot().value).toBe(EcoFlowState.Status);
    expect(actor.getSnapshot().context.recommendations).toHaveLength(0);
    expect(actor.getSnapshot().context.responses).toHaveLength(0);
  });
});
