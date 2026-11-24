import type { Metadata } from "next";
import ContactCallout from "@/components/commercial/ContactCallout";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export const metadata: Metadata = {
  alternates: { canonical: "/casos" },
  title: "Casos de estudio",
  description: "Capturas y casos de sistemas a medida, apps, stock, facturación e IA desarrollados por Matías Vagliviello.",
};

export default function CasosPage() {
  return <div className="commercial-page"><CaseStudiesSection /><ContactCallout /></div>;
}
