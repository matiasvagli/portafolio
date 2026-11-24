import type { Metadata } from "next";
import BusinessFlow from "@/components/commercial/BusinessFlow";
import AgentTeamSection from "@/components/commercial/AgentTeamSection";
import CommercialHero from "@/components/commercial/CommercialHero";
import ContactCallout from "@/components/commercial/ContactCallout";
import LiveWork from "@/components/commercial/LiveWork";
import ServiceAreas from "@/components/commercial/ServiceAreas";
import SolutionsSection from "@/components/commercial/SolutionsSection";

import "@/components/commercial/studio-home.css";
import "@/components/commercial/pet-care-demo.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <div className="commercial-page studio-home">
      <CommercialHero />
      <SolutionsSection />
      <ServiceAreas />
      <AgentTeamSection />
      <BusinessFlow />
      <LiveWork />
      <ContactCallout />
    </div>
  );
}
