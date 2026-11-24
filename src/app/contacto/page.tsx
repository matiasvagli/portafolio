import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { getGoogleSheetsConfig } from "@/lib/contact/google-sheets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribime por WhatsApp o por el formulario. Contame cómo vendés y qué te gustaría resolver para tu negocio.",
};

export default function ContactoPage() {
  return <ContactSection formAvailable={getGoogleSheetsConfig() !== null} />;
}
