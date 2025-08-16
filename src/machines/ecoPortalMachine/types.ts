export enum EcoStatus {
  Entreprise = "entreprise",
  Particulier = "particulier",
}

export enum EntrepriseNeed {
  Financement = "financement",
  Exporter = "exporter",
  Investissement = "investissement",
  Implantation = "implantation",
  InfoMarche = "info-marche",
}

export enum ParticulierNeed {
  Visa = "visa",
  ProgrammeTechnique = "programme-technique",
  Financement = "financement",
  Produits = "produits",
  Infos = "infos",
}

export enum FinancingType {
  PretSecteurDurable = "pret-secteur-durable",
  SubventionAvance = "subvention-avance",
  PretBanqueTnFr = "pret-banque-tn-fr",
  AssuranceBpi = "assurance-bpi",
  AppelProjetsCoopTech = "appel-projets-coop-tech",
}

export enum InvestType {
  France = "france",
  Tunisie = "tunisie",
}

export enum EcoFlowState {
  Status = "status",
  Need = "need",
  Financing = "financing",
  Invest = "invest",
  Completed = "completed",
}

export enum EcoQuestion {
  Status = "Quel est votre statut ?",
  Need = "De quel type d’accompagnement avez-vous besoin?",
  Financing = "Quels types de financements recherchez vous?",
  Invest = "Où souhaitez-vous investir ?",
}

export enum FinancingRecommendation {
  Proparco = "Proparco (groupe AFD)",
  PageFASEP = "Page FASEP de la DG Trésor",
  LigneCreditPME = "Service Economique Régional > onglet ligne de crédit PME",
  BPIF = "BPI France",
  ExpertiseFrance = "Expertise France",
}

export enum InvestRecommendation {
  France = "Business France avec la Team France Invest et Choose France",
  Tunisie = "FIPA et TIA",
}

export enum DirectRecommendation {
  BusinessFrance = "Business France",
  BusinessFranceAnchors = "Business France et les partenaires d'ancrage (CCITF, MAZARS, AWT, EAL, PRAMEX)",
  SER_BF_CCEF = "Service Economique Régional avec BF et les CCEF",
  BrochureEcoEquipeFranceTN = "Brochure économique équipe France en Tunisie",
  ConsulatFranceVisas = "Consulat général et France Visas",
  ExpertiseFranceGroupeAFD = "Expertise France (Groupe AFD)",
  FrenchTech = "French Tech",
  BusinessFranceMarketPlace = "Business France et Market Place",
  SER_CCEF = "SER avec les CCEF",
}

export enum StatusAnswer {
  Entreprise = "Une entreprise",
  Particulier = "Un particulier / porteur de projet",
}

export enum InvestAnswer {
  France = "Je souhaite investir en France",
  Tunisie = "Je souhaite investir en Tunisie",
}

export enum FinancingAnswer {
  PretSecteurDurable = "Un prêt à taux préférentiel pour mon entreprise dans un secteur-clé du développement durable",
  SubventionAvance = "Une subvention ou une avance remboursable pour des études de faisabilité ou des projets démonstrateurs de technologies vertes et innovantes",
  PretBanqueTnFr = "Un prêt auprès d’une banque tunisienne pour acquérir des biens et/ou services d’origine française ",
  AssuranceBpi = "Une assurance prospection, une garantie de caution, un crédit acheteur/fournisseur, ou une assurance de risque de change",
  AppelProjetsCoopTech = "Un financement sur appel à projets via la coopération technique internationale",
}

export enum ParticulierNeedAnswer {
  Visa = "J’ai besoin d’un visa pour un voyage d’affaire",
  ProgrammeTechnique = "Je cherche un programme d’accompagnement technique (formation, incubation, accélération)",
  Financement = "Je cherche des solutions de financement pour mon projet",
  Produits = "Je cherche des produits ou services français",
  Infos = "Je recherche des informations économiques et commerciales ou sur les services à vocation économique de l’Ambassade de France",
}

export enum EnterpriseNeedAnswer {
  Financement = "Je recherche des solutions de financement",
  Exporter = "Je souhaite exporter mes produits et solutions et/ou identifier un partenaire en Tunisie",
  Investissement = "J'ai un projet d'investissement",
  Implantation = "Je souhaite m'implanter, recruter ou former des collaborateurs ",
  InfoMarche = "Je recherche des informations économiques et commerciales sur le marché tunisien  ",
}

export enum EcoPortalEventType {
  SelectStatus = "SELECT_STATUS",
  SelectNeed = "SELECT_NEED",
  SelectFinancing = "SELECT_FINANCING",
  SelectInvest = "SELECT_INVEST",
  Back = "BACK",
  Restart = "RESTART",
}

export interface EcoPortalContext {
  status: EcoStatus | null;
  need: EntrepriseNeed | ParticulierNeed | null;
  financingType: FinancingType | null;
  investType: InvestType | null;
  recommendations: Array<
    FinancingRecommendation | InvestRecommendation | DirectRecommendation
  >;
  responses: Array<{ question: string; answer: string; timestamp: Date }>;
}

export type EcoPortalEvent =
  | { type: EcoPortalEventType.SelectStatus; status: EcoStatus }
  | {
      type: EcoPortalEventType.SelectNeed;
      need: EntrepriseNeed | ParticulierNeed;
    }
  | { type: EcoPortalEventType.SelectFinancing; financing: FinancingType }
  | { type: EcoPortalEventType.SelectInvest; invest: InvestType }
  | { type: EcoPortalEventType.Back }
  | { type: EcoPortalEventType.Restart };
