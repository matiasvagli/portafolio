"use client";

import { forwardRef, useRef, useState } from "react";
import { ArrowUpRight, CreditCard, Landmark, MessageCircle } from "lucide-react";
import { formatDemoPrice } from "@/data/commercial-demo";

const payments = {
  transfer: {
    label: "Transferencia",
    question: "Prefiero pagar por transferencia.",
    answer: "¡Listo! Te dejé el pedido armado. Cuando se acredite la transferencia, te confirmamos la entrega.",
    Icon: Landmark,
  },
  card: {
    label: "Tarjeta",
    question: "Prefiero pagar con tarjeta.",
    answer: "¡Listo! Te dejé el pedido armado. Cuando se apruebe el pago con tarjeta, te confirmamos la entrega.",
    Icon: CreditCard,
  },
};

type Choice = keyof typeof payments | "person";
type Offer = { measure: string; price: number; delivery: string };
const CatalogConversation = forwardRef<HTMLDivElement, { offer: Offer }>(function CatalogConversation({ offer }, ref) {
  const [choice, setChoice] = useState<Choice>();
  const followup = useRef<HTMLDivElement>(null);
  const payment = choice && choice !== "person" ? payments[choice] : undefined;
  const price = formatDemoPrice(offer.price);

  function choose(next: Choice) {
    setChoice(next);
    requestAnimationFrame(() => followup.current?.scrollIntoView({ block: "nearest" }));
  }

  return (
    <div className="catalog-phone" ref={ref} id="catalog-conversation" role="region" aria-labelledby="catalog-conversation-title" tabIndex={-1}>
      <div className="phone-edge" aria-hidden="true"><span /></div>
      <div className="phone-screen">
        <div className="phone-heading">
          <span className="phone-icon"><MessageCircle size={19} aria-hidden="true" /></span>
          <div>
            <h2 id="catalog-conversation-title">Agente de ventas</h2>
            <p>WhatsApp · Conversación simulada</p>
          </div>
        </div>
        <div className="phone-thread" aria-live="polite">
              <p className="phone-bubble phone-bubble--customer">Hola, quería consultar por la mesa de {offer.measure}. ¿La hacen en guatambú?</p>
              <p className="phone-bubble">¡Sí! En guatambú y en esa medida sale <strong>{price}</strong>. Te llega a CABA el <strong>{offer.delivery}</strong>, con envío incluido. ¿Cómo preferís pagar?</p>
              {payment && <div className="phone-followup" key={choice} ref={followup}>
                <p className="phone-bubble phone-bubble--customer">{payment.question}</p>
                <p className="phone-bubble">{payment.answer}</p>
                <div className="phone-receipt">
                  <p><strong>Pedido de ejemplo</strong><span>Pendiente de pago</span></p>
                  <dl>
                    <div><dt>Total</dt><dd>{price}</dd></div>
                    <div><dt>Entrega</dt><dd>{offer.delivery}</dd></div>
                    <div><dt>Pago</dt><dd>{payment.label}</dd></div>
                  </dl>
                </div>
              </div>}
              {choice === "person" && <div className="phone-followup" ref={followup}>
                <p className="phone-bubble phone-bubble--customer">¿Puedo hablar con alguien del taller?</p>
                <p className="phone-bubble">Claro. Le dejo al equipo esta conversación con la medida y el presupuesto para que siga desde acá.</p>
              </div>}
        </div>
          <div className="phone-choices" role="group" aria-label="Continuar la conversación de ejemplo">
            <div className="phone-payment-options">
              {Object.entries(payments).map(([key, { label, Icon }]) => (
                <button type="button" key={key} aria-pressed={choice === key} onClick={() => choose(key as keyof typeof payments)}>
                  <Icon size={15} aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <button type="button" aria-pressed={choice === "person"} onClick={() => choose("person")}>Hablar con el taller <ArrowUpRight size={14} aria-hidden="true" /></button>
          </div>
      </div>
      <div className="phone-bottom" aria-hidden="true"><span /></div>
    </div>
  );
});

export default CatalogConversation;
