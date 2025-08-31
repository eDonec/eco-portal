"use client";

import OptionsList from "@/components/OptionsList";
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
              {current === EcoFlowState.Status && (
                <OptionsList
                  options={options}
                  labelFor={(v) =>
                    (StatusAnswerLabels as Record<string, string>)[v] || v
                  }
                  selected={selected}
                  onSelect={onSelect}
                />
              )}
              {current === EcoFlowState.Need && (
                <OptionsList
                  options={options}
                  labelFor={(v) =>
                    (contextStatus === EcoStatus.Entreprise
                      ? (EntrepriseNeedAnswerLabels as Record<string, string>)[
                          v
                        ]
                      : (ParticulierNeedAnswerLabels as Record<string, string>)[
                          v
                        ]) || v
                  }
                  selected={selected}
                  onSelect={onSelect}
                />
              )}

              {current === EcoFlowState.Financing && (
                <OptionsList
                  options={options}
                  labelFor={(v) =>
                    (FinancingTypeAnswerLabels as Record<string, string>)[v] ||
                    v
                  }
                  selected={selected}
                  onSelect={onSelect}
                />
              )}
              {current === EcoFlowState.Invest && (
                <OptionsList
                  options={options}
                  labelFor={(v) =>
                    (InvestAnswerLabels as Record<string, string>)[v] || v
                  }
                  selected={selected}
                  onSelect={onSelect}
                />
              )}
            </div>

            <div className="pt-4 flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.back()}
                className="inline-flex max-w-full items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed px-4 py-2 text-sm leading-none font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:border-0 transition-colors appearance-none"
                disabled={current === EcoFlowState.Status}
              >
                Retour
              </button>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto sm:ml-auto justify-end min-w-0">
                <button
                  onClick={() => router.push("/eco-portal/status")}
                  className="inline-flex max-w-full items-center gap-2 rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-gray-800 px-4 py-2 text-sm leading-none font-medium text-red-600 dark:text-red-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-0 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors appearance-none"
                  disabled={current === EcoFlowState.Status}
                >
                  ⟲ Réinitialiser
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!selected}
                  className="inline-flex max-w-full items-center gap-2 rounded-lg px-4 py-2 text-sm leading-none font-medium bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed appearance-none"
                >
                  Suivant
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
