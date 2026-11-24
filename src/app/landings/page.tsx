import type { Metadata } from "next";
import ContactCallout from "@/components/commercial/ContactCallout";
import LiveWork from "@/components/commercial/LiveWork";

export const metadata: Metadata = {
  title: "Webs en vivo",
  description: "Recorré Coruja Casas Serranas, Zona Urbana Publicidad y Futboliga, tres webs desarrolladas por Matías Vagliviello.",
};

export default function LandingsPage() {
  return (
    <div className="commercial-page">
      <LiveWork standalone />
      <ContactCallout />
    </div>
  );
}
