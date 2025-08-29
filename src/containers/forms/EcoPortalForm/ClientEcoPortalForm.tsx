"use client";

import {
  ecoPortalMachine,
  getEcoOptions,
  getEcoQuestion,
} from "@/machines/ecoPortalMachine";
import {
  EntrepriseNeedAnswerLabels,
  FinancingTypeAnswerLabels,
  InvestAnswerLabels,
  ParticulierNeedAnswerLabels,
  StatusAnswerLabels,
} from "@/machines/ecoPortalMachine/constants";
import {
  EcoFlowState,
  EcoPortalContext,
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

// Storage key for persisting ecoPortal form
const ECO_PORTAL_STORAGE_KEY = "eco-portal-state";

function saveEcoPortalToStorage(
  context: EcoPortalContext,
  value: string | Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  try {
    const payload = { context, value, timestamp: Date.now() };
    localStorage.setItem(ECO_PORTAL_STORAGE_KEY, JSON.stringify(payload));
  } catch {}
}

function loadEcoPortalFromStorage(): {
  context: Partial<EcoPortalContext>;
  value?: string | Record<string, unknown>;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ECO_PORTAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const expired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
    if (expired) {
      localStorage.removeItem(ECO_PORTAL_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(ECO_PORTAL_STORAGE_KEY);
    return null;
  }
}

function clearEcoPortalStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ECO_PORTAL_STORAGE_KEY);
  } catch {}
}

function computeBackPersistence(
  current: EcoFlowState,
  ctx: EcoPortalContext
): { value: EcoFlowState; context: EcoPortalContext } {
  // Clone context to avoid mutating React state
  const nextCtx: EcoPortalContext = {
    status: ctx.status,
    need: ctx.need,
    financingType: ctx.financingType,
    investType: ctx.investType,
    recommendations: [],
    responses: ctx.responses, // keep history as-is
  };

  let value = current;
  switch (current) {
    case EcoFlowState.Status: {
      value = EcoFlowState.Status;
      break;
    }
    case EcoFlowState.Need: {
      value = EcoFlowState.Status;
      nextCtx.need = null;
      nextCtx.financingType = null;
      nextCtx.investType = null;
      break;
    }
    case EcoFlowState.Financing: {
      value = EcoFlowState.Need;
      nextCtx.financingType = null;
      break;
    }
    case EcoFlowState.Invest: {
      value = EcoFlowState.Need;
      nextCtx.investType = null;
      break;
    }
    case EcoFlowState.Completed: {
      if (ctx.investType) {
        value = EcoFlowState.Invest;
      } else if (ctx.financingType) {
        value = EcoFlowState.Financing;
      } else {
        value = EcoFlowState.Need;
      }
      break;
    }
  }

  return { value, context: nextCtx };
}

export default function ClientEcoPortalForm() {
  const router = useRouter();

  const [persisted] = useState(loadEcoPortalFromStorage());
  const [state, send] = useMachine(ecoPortalMachine);

  const { value, context } = state;
  const current: EcoFlowState = (
    typeof value === "string" ? value : (Object.keys(value)[0] as string)
  ) as EcoFlowState;

  // Persist on every transition
  useEffect(() => {
    const normalizedValue = typeof value === "string" ? value : { ...value };
    saveEcoPortalToStorage(context, normalizedValue);
  }, [context, value]);

  // Restore minimal context on client mount honoring the saved step value.
  // We only replay events up to the saved step to avoid auto-advancing past it.
  useEffect(() => {
    if (!persisted?.context) return;
    const ctx = persisted.context;
    const step = persisted.value as string | undefined as
      | EcoFlowState
      | undefined;

    // Always start by restoring status if present and step is beyond status
    if (ctx.status) {
      send({ type: EcoPortalEventType.SelectStatus, status: ctx.status });
    }

    // If the saved step is 'need', stop here (don’t send need event)
    if (step === EcoFlowState.Status || step === EcoFlowState.Need) {
      return;
    }

    // For steps beyond 'need', we can replay the need selection safely
    if (ctx.need) {
      send({
        type: EcoPortalEventType.SelectNeed,
        need: ctx.need as EntrepriseNeed | ParticulierNeed,
      });
    }

    // If the saved step is 'financing' or 'invest', stop before sending final choice
    if (step === EcoFlowState.Financing || step === EcoFlowState.Invest) {
      return;
    }

    // Only when completed, replay the final selection to recompute recommendations
    if (step === EcoFlowState.Completed) {
      if (ctx.financingType) {
        send({
          type: EcoPortalEventType.SelectFinancing,
          financing: ctx.financingType,
        });
      }
      if (ctx.investType) {
        send({ type: EcoPortalEventType.SelectInvest, invest: ctx.investType });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onReset = () => {
    clearEcoPortalStorage();
    send({ type: EcoPortalEventType.Restart });
  };

  const onBack = () => {
    // Persist the previous step immediately to survive a quick refresh
    const { value: prevValue, context: nextCtx } = computeBackPersistence(
      current,
      context
    );
    saveEcoPortalToStorage(nextCtx, prevValue);
    send({ type: EcoPortalEventType.Back });
  };

  const renderOptions = <T extends string>(
    options: T[],
    onSelect: (v: T) => void,
    labelFor?: (v: T) => string
  ) => (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <span className="font-medium">
            {labelFor ? labelFor(opt) : (opt as string)}
          </span>
        </button>
      ))}
    </div>
  );

  const question = getEcoQuestion(current);

  useEffect(() => {
    if (current === EcoFlowState.Completed) {
      const recs = state.context.recommendations || [];
      // Clear storage to avoid auto-restore loop when coming back
      clearEcoPortalStorage();
      const recsParam = encodeURIComponent(JSON.stringify(recs));
      router.push(`/eco-portal/result?recs=${recsParam}`);
    }
  }, [current, state.context.recommendations, router]);

  return (
    <div className="max-w-3xl mx-auto w-full p-6">
      {current !== EcoFlowState.Completed && (
        <div className="space-y-4">
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {question}
          </div>
          {current === EcoFlowState.Status &&
            renderOptions<EcoStatus>(
              getEcoOptions(current, context) as EcoStatus[],
              (status) =>
                send({ type: EcoPortalEventType.SelectStatus, status }),
              (v) => StatusAnswerLabels[v]
            )}
          {current === EcoFlowState.Need &&
            renderOptions<EntrepriseNeed | ParticulierNeed>(
              getEcoOptions(current, context) as (
                | EntrepriseNeed
                | ParticulierNeed
              )[],
              (need) => send({ type: EcoPortalEventType.SelectNeed, need }),
              (v) =>
                (context.status === EcoStatus.Entreprise
                  ? (EntrepriseNeedAnswerLabels as Record<string, string>)
                  : (ParticulierNeedAnswerLabels as Record<string, string>))[
                  v as string
                ] || (v as string)
            )}
          {current === EcoFlowState.Financing &&
            renderOptions<FinancingType>(
              getEcoOptions(current, context) as FinancingType[],
              (financing) =>
                send({ type: EcoPortalEventType.SelectFinancing, financing }),
              (v) => FinancingTypeAnswerLabels[v]
            )}
          {current === EcoFlowState.Invest &&
            renderOptions<InvestType>(
              getEcoOptions(current, context) as InvestType[],
              (invest) =>
                send({ type: EcoPortalEventType.SelectInvest, invest }),
              (v) => InvestAnswerLabels[v]
            )}
          {/* Back & Reset actions */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className={`inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                current === EcoFlowState.Status
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={current === EcoFlowState.Status}
            >
              <span aria-hidden>←</span> Retour
            </button>

            <button
              onClick={onReset}
              className={`inline-flex items-center gap-2 rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ${
                current === EcoFlowState.Status
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={current === EcoFlowState.Status}
            >
              ⟲ Réinitialiser
            </button>
          </div>
        </div>
      )}

      {current === EcoFlowState.Completed && (
        <div className="space-y-3">
          <div className="text-green-700 dark:text-green-400 font-semibold">
            Submitting...
          </div>
        </div>
      )}
    </div>
  );
}
