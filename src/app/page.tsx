import CommercialHero from "@/components/commercial/CommercialHero";
import ContactCallout from "@/components/commercial/ContactCallout";
import LiveWork from "@/components/commercial/LiveWork";
import SolutionsSection from "@/components/commercial/SolutionsSection";

export default function HomePage() {
  return (
    <div className="commercial-page">
      <CommercialHero />
      <SolutionsSection />
      <LiveWork />
      <ContactCallout />
    </div>
  );
}
