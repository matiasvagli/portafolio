import { ArrowDown, MessageCircle } from "lucide-react";
import { firstContactUrl } from "@/lib/whatsapp";
import InboxDemo from "./InboxDemo";

export default function CommercialHero() {
  return (
    <section className="commercial-shell commercial-hero" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">
          <span>Vos atendés el local.</span>{" "}
          <em>Tu agente, las consultas.</em>
        </h1>
        <p>Un precio por WhatsApp, un envío por Instagram y una reserva por mail. <strong>Tu agente de IA responde a los tres a la vez</strong> con los precios, el stock y los horarios de tu negocio.</p>
        <div className="commercial-actions">
          <a className="commercial-button" href={firstContactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> Contame qué necesitás</a>
          <a className="commercial-button commercial-button--plain" href="#trabajos">Ver webs en vivo <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <InboxDemo />
    </section>
  );
}
