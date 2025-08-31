import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Questionnaire",
  description:
    "Questionnaire du Portail Économique pour orienter votre projet vers les bons interlocuteurs et dispositifs.",
};

export default function EcoPortalPage() {
  redirect("/eco-portal/status");
}
