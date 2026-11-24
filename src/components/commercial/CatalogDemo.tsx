"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Check, PanelsTopLeft } from "lucide-react";
import CatalogConversation from "./CatalogConversation";

const offers = [
  { measure: "140 × 80 cm", price: 249000, delivery: "viernes de 14 a 18 h" },
  { measure: "180 × 90 cm", price: 319000, delivery: "martes de 10 a 14 h" },
];

export default function CatalogDemo() {
  const [offer, setOffer] = useState(offers[0]);
  const conversation = useRef<HTMLDivElement>(null);

  function showConversation() {
    requestAnimationFrame(() => {
      const phone = conversation.current;
      phone?.focus({ preventScroll: true });
      phone?.scrollIntoView({ block: "nearest" });
    });
  }

  return (
    <div className="catalog-stage">
      <div className="catalog-window">
        <div className="catalog-bar">
          <span className="catalog-dots" aria-hidden="true"><i /><i /><i /></span>
          <span><PanelsTopLeft size={14} aria-hidden="true" /> Demo · Catálogo del taller</span>
        </div>
        <div className="catalog-content">
          <div className="catalog-photo">
            <Image
              src="/comercial/mesa-de-madera.webp"
              alt="Mesa de comedor de madera con bordes redondeados"
              width={1080}
              height={720}
              priority
              sizes="(min-width: 1100px) 420px, (min-width: 641px) 48vw, 90vw"
            />
          </div>
          <div className="catalog-detail">
            <h2>Mesa de madera</h2>
            <fieldset>
              <legend>Elegí una medida</legend>
              <div className="catalog-measures">
                {offers.map(option => (
                  <label key={option.measure}>
                    <input type="radio" name="mesa-medida" value={option.measure} checked={offer === option} onChange={() => setOffer(option)} />
                    <span><Check size={14} aria-hidden="true" />{option.measure}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="button" className="catalog-action" aria-controls="catalog-conversation" onClick={showConversation}>
              Ver cotización <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <CatalogConversation key={offer.measure} ref={conversation} offer={offer} />
    </div>
  );
}
