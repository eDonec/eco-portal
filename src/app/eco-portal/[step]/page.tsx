import Loader from "@/components/Loader";
import EcoPortalForm from "@/containers/forms/EcoPortalForm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Questionnaire",
  description:
    "Questionnaire du Portail Économique par étapes, avec navigation par l’historique du navigateur.",
};

const allowedSteps = new Set(["status", "need", "financing", "invest"]);

export default async function StepPage({
  params,
  searchParams,
}: {
  params: Promise<{ step: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { step: rawStep } = await params;
  const sp = await searchParams;
  const step = rawStep.toLowerCase();
  if (!allowedSteps.has(step)) redirect("/eco-portal/status");

  const status = (sp.status as string | undefined) ?? undefined;
  const need = (sp.need as string | undefined) ?? undefined;

  return (
    <Suspense fallback={<Loader label="Chargement du questionnaire…" />}>
      <EcoPortalForm step={step} status={status} need={need} />
    </Suspense>
  );
}
