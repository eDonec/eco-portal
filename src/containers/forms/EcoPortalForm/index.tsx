"use client";

import Recap from "@/components/Recap";
import {
  EntrepriseNeedAnswerLabels,
  FinancingTypeAnswerLabels,
  InvestAnswerLabels,
  ParticulierNeedAnswerLabels,
  StatusAnswerLabels,
} from "@/machines/ecoPortalMachine/constants";
import { EcoFlowState, EcoStatus } from "@/machines/ecoPortalMachine/types";
import useEcoPortalForm from "./useEcoPortalForm";

const renderOptionButtons = (
  rawOpts: string[],
  labelFor: (raw: string) => string,
  selected: string | null,
  onSelect: (value: string | null) => void
) => (
  <div className="grid grid-cols-1 gap-3">
    {rawOpts.map((raw) => {
      const isSelected = selected === raw;
      return (
        <button
          type="button"
          key={raw}
          onClick={() => onSelect(raw)}
          className={[
            "p-4 text-left rounded-lg transition-colors",
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            isSelected
              ? "border-2 border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900/40 bg-blue-50 dark:bg-blue-950/20"
              : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
          ].join(" ")}
        >
          <span className="font-medium">{labelFor(raw)}</span>
        </button>
      );
    })}
  </div>
);

export default function StepFormClient({
  step,
  status,
  need,
}: {
  step: string;
  status?: string;
  need?: string;
}) {
  const {
    question,
    options,
    current,
    router,
    recapItems,
    contextStatus,
    selected,
    onNext,
    onSelect,
  } = useEcoPortalForm({ step, status, need });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start min-h-[60vh]">
          {/* Main first, recap second (right on lg, bottom on small) */}
          <div className="order-1 lg:order-1 lg:col-span-2 w-full p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="space-y-4">
              <div className="text-gray-800 dark:text-gray-200 font-medium">
                {question}
              </div>
              {current === EcoFlowState.Status &&
                renderOptionButtons(
                  options,
                  (v) => (StatusAnswerLabels as Record<string, string>)[v] || v,
                  selected,
                  onSelect
                )}
              {current === EcoFlowState.Need &&
                renderOptionButtons(
                  options,
                  (v) =>
                    (contextStatus === EcoStatus.Entreprise
                      ? (EntrepriseNeedAnswerLabels as Record<string, string>)[
                          v
                        ]
                      : (ParticulierNeedAnswerLabels as Record<string, string>)[
                          v
                        ]) || v,
                  selected,
                  onSelect
                )}
              {current === EcoFlowState.Financing &&
                renderOptionButtons(
                  options,
                  (v) =>
                    (FinancingTypeAnswerLabels as Record<string, string>)[v] ||
                    v,
                  selected,
                  onSelect
                )}
              {current === EcoFlowState.Invest &&
                renderOptionButtons(
                  options,
                  (v) => (InvestAnswerLabels as Record<string, string>)[v] || v,
                  selected,
                  onSelect
                )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:border-0 transition-colors"
                disabled={current === EcoFlowState.Status}
              >
                <span aria-hidden>←</span> Retour
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/eco-portal/status")}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-0 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  disabled={current === EcoFlowState.Status}
                >
                  ⟲ Réinitialiser
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Suivant →
                </button>
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-2">
            <Recap items={recapItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
