import ContactSection from "@/components/sections/ContactSection";
import { getGoogleSheetsConfig } from "@/lib/contact/google-sheets";

export const dynamic = "force-dynamic";

export default function ContactoPage() {
  return <ContactSection formAvailable={getGoogleSheetsConfig() !== null} />;
}
