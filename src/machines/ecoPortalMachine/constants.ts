import {
  EcoStatus,
  EnterpriseNeedAnswer,
  EntrepriseNeed,
  FinancingAnswer,
  FinancingType,
  InvestAnswer,
  InvestType,
  ParticulierNeed,
  ParticulierNeedAnswer,
  StatusAnswer,
} from "./types";

export const StatusAnswerLabels: Record<EcoStatus, StatusAnswer> = {
  [EcoStatus.Entreprise]: StatusAnswer.Entreprise,
  [EcoStatus.Particulier]: StatusAnswer.Particulier,
};

export const EntrepriseNeedAnswerLabels: Record<
  EntrepriseNeed,
  EnterpriseNeedAnswer
> = {
  [EntrepriseNeed.Financement]: EnterpriseNeedAnswer.Financement,
  [EntrepriseNeed.Exporter]: EnterpriseNeedAnswer.Exporter,
  [EntrepriseNeed.Investissement]: EnterpriseNeedAnswer.Investissement,
  [EntrepriseNeed.Implantation]: EnterpriseNeedAnswer.Implantation,
  [EntrepriseNeed.InfoMarche]: EnterpriseNeedAnswer.InfoMarche,
};

export const ParticulierNeedAnswerLabels: Record<
  ParticulierNeed,
  ParticulierNeedAnswer
> = {
  [ParticulierNeed.Visa]: ParticulierNeedAnswer.Visa,
  [ParticulierNeed.ProgrammeTechnique]:
    ParticulierNeedAnswer.ProgrammeTechnique,
  [ParticulierNeed.Financement]: ParticulierNeedAnswer.Financement,
  [ParticulierNeed.Produits]: ParticulierNeedAnswer.Produits,
  [ParticulierNeed.Infos]: ParticulierNeedAnswer.Infos,
};

export const FinancingTypeAnswerLabels: Record<FinancingType, FinancingAnswer> =
  {
    [FinancingType.PretSecteurDurable]: FinancingAnswer.PretSecteurDurable,
    [FinancingType.SubventionAvance]: FinancingAnswer.SubventionAvance,
    [FinancingType.PretBanqueTnFr]: FinancingAnswer.PretBanqueTnFr,
    [FinancingType.AssuranceBpi]: FinancingAnswer.AssuranceBpi,
    [FinancingType.AppelProjetsCoopTech]: FinancingAnswer.AppelProjetsCoopTech,
  };

export const InvestAnswerLabels: Record<InvestType, InvestAnswer> = {
  [InvestType.France]: InvestAnswer.France,
  [InvestType.Tunisie]: InvestAnswer.Tunisie,
};
