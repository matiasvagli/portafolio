import type { Metadata } from "next";
import ContactCallout from "@/components/commercial/ContactCallout";
import EngineeringSection from "@/components/sections/EngineeringSection";

export const metadata: Metadata = {
  title: "Cómo trabajo",
  description: "Desde la primera charla hasta poner el sistema en marcha. Conocé cómo trabajo y las tecnologías que uso.",
};

export default function ComoTrabajoPage() {
  return <div className="commercial-page"><EngineeringSection /><ContactCallout /></div>;
}
