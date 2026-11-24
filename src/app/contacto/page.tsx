import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { contactGoals } from "@/schemas/contact.schema";
import { getGoogleSheetsConfig } from "@/lib/contact/google-sheets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/contacto" },
  title: "Contacto",
  description: "Contame tu idea, qué te gustaría mejorar o el problema que querés resolver. Escribime por WhatsApp, email o el formulario.",
};

export default async function ContactoPage({ searchParams }: { searchParams: Promise<{ asunto?: string | string[]; borrador?: string | string[] }> }) {
  const { asunto, borrador } = await searchParams;
  const topic = contactGoals.find(goal => goal === asunto);
  return <ContactSection formAvailable={getGoogleSheetsConfig() !== null} topic={topic} loadDraft={topic === "Necesito orientación" && borrador === "1"} />;
}
