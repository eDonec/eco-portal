import { type QAItem } from "@/components/Recap";
import {
  ecoPortalMachine,
  getEcoOptions,
  getEcoQuestion,
} from "@/machines/ecoPortalMachine";
import {
  EcoFlowState,
  EcoPortalEventType,
  EcoStatus,
  EntrepriseNeed,
  FinancingType,
  InvestType,
  ParticulierNeed,
} from "@/machines/ecoPortalMachine/types";
import { useMachine } from "@xstate/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getCurrentStep = (step: string): EcoFlowState => {
  switch (step) {
    case EcoFlowState.Status:
      return EcoFlowState.Status;
    case EcoFlowState.Need:
      return EcoFlowState.Need;
    case EcoFlowState.Financing:
      return EcoFlowState.Financing;
    case EcoFlowState.Invest:
      return EcoFlowState.Invest;
    default:
      return EcoFlowState.Status;
  }
};

const useEcoPortalForm = ({
  step,
  status,
  need,
}: {
  step: string;
  status?: string;
  need?: string;
}) => {
  const router = useRouter();
  const [state, send] = useMachine(ecoPortalMachine);
  const current: EcoFlowState = getCurrentStep(step);

  useEffect(() => {
    if (status) {
      const s = status as EcoStatus;
      send({ type: EcoPortalEventType.SelectStatus, status: s });
    }
    if (need) {
      const n = need as EntrepriseNeed | ParticulierNeed;
      send({ type: EcoPortalEventType.SelectNeed, need: n });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, need]);

  const goTo = (
    s: EcoStatus,
    n?: EntrepriseNeed | ParticulierNeed,
    needType?: "INVEST" | "FINANCING"
  ) => {
    if (!n) router.push(`/eco-portal/need?status=${encodeURIComponent(s)}`);
    else if (needType === "FINANCING")
      router.push(
        `/eco-portal/financing?status=${encodeURIComponent(
          s
        )}&need=${encodeURIComponent(n)}`
      );
    else if (needType === "INVEST")
      router.push(
        `/eco-portal/invest?status=${encodeURIComponent(
          s
        )}&need=${encodeURIComponent(n)}`
      );
  };

  const onSelectStatus = (s: EcoStatus) => {
    send({ type: EcoPortalEventType.SelectStatus, status: s });
    goTo(s);
  };
  const onSelectNeed = (n: EntrepriseNeed | ParticulierNeed) => {
    const s = state.context.status!;
    send({ type: EcoPortalEventType.SelectNeed, need: n });

    if (s === EcoStatus.Entreprise && n === EntrepriseNeed.Financement)
      goTo(s, n, "FINANCING");
    else if (s === EcoStatus.Particulier && n === ParticulierNeed.Financement)
      goTo(s, n, "FINANCING");
    else if (s === EcoStatus.Entreprise && n === EntrepriseNeed.Investissement)
      goTo(s, n, "INVEST");
  };
  const onSelectFinancing = (f: FinancingType) => {
    send({ type: EcoPortalEventType.SelectFinancing, financing: f });
  };
  const onSelectInvest = (i: InvestType) => {
    send({ type: EcoPortalEventType.SelectInvest, invest: i });
  };

  useEffect(() => {
    const value = state.value as unknown;
    const isCompleted =
      value === EcoFlowState.Completed ||
      (typeof value === "object" &&
        value !== null &&
        Object.prototype.hasOwnProperty.call(
          value as object,
          EcoFlowState.Completed
        ));
    if (isCompleted) {
      const recsParam = encodeURIComponent(
        JSON.stringify(state.context.recommendations || [])
      );
      const responsesParam = encodeURIComponent(
        JSON.stringify(
          (state.context.responses || []).map((r) => ({
            question: r.question,
            answer: r.answer,
          }))
        )
      );
      router.push(
        `/eco-portal/result?recs=${recsParam}&resp=${responsesParam}`
      );
    }
  }, [
    router,
    state.context.recommendations,
    state.context.responses,
    state.value,
  ]);

  const options = getEcoOptions(current, state.context) as string[];
  const question = getEcoQuestion(current);

  const recapItems: QAItem[] = (state.context.responses || []).map((r) => ({
    question: r.question,
    answer: r.answer,
  }));

  const [selected, setSelected] = useState<string | null>(null);

  // Initialize selection from existing context for the current step
  useEffect(() => {
    switch (current) {
      case EcoFlowState.Status:
        setSelected(state.context.status ?? null);
        break;
      case EcoFlowState.Need:
        setSelected(state.context.need ?? null);
        break;
      case EcoFlowState.Financing:
        setSelected(state.context.financingType ?? null);
        break;
      case EcoFlowState.Invest:
        setSelected(state.context.investType ?? null);
        break;
      default:
        setSelected(null);
    }
  }, [
    current,
    state.context.status,
    state.context.need,
    state.context.financingType,
    state.context.investType,
  ]);

  const onNext = () => {
    if (!selected) return;
    if (current === EcoFlowState.Status) {
      onSelectStatus(selected as EcoStatus);
      return;
    }
    if (current === EcoFlowState.Need) {
      onSelectNeed(selected as EntrepriseNeed | ParticulierNeed);
      return;
    }
    if (current === EcoFlowState.Financing) {
      onSelectFinancing(selected as FinancingType);
      return;
    }
    if (current === EcoFlowState.Invest) {
      onSelectInvest(selected as InvestType);
      return;
    }
  };

  const onSelect = (value: string | null) => {
    setSelected(value);
  };

  return {
    question,
    options,
    current,
    router,
    recapItems,
    contextStatus: state.context.status,
    selected,
    onNext,
    onSelect,
  };
};

export default useEcoPortalForm;
