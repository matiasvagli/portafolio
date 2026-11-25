"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Bot, ChevronDown, CircleHelp, Globe, Lightbulb, PanelsTopLeft, ReceiptText, Rocket, SlidersHorizontal, Workflow } from "lucide-react";
import { visitorPaths } from "@/data/visitor-paths";
import DevicePreview from "./DevicePreview";
import IdeaValidation from "./IdeaValidation";
import OrientationContact from "./OrientationContact";
import AIAssessmentDemo from "./demos/AIAssessmentDemo";
import CartDemo from "./demos/CartDemo";
import BillingDemo from "./demos/BillingDemo";
import OrdersDemo from "./demos/OrdersDemo";
import PetCareDemo from "./demos/PetCareDemo";
import ServicesDemo from "./demos/ServicesDemo";
import ShipmentDemo from "./demos/ShipmentDemo";
import SupportAgentDemo from "./demos/SupportAgentDemo";

const previews = {
  web: { Icon: Globe, Demo: ServicesDemo, contactLabel: "Hablemos de tu web" },
  idea: { Icon: Lightbulb, contactLabel: "Contame tu idea" },
  app: { Icon: PanelsTopLeft, Demo: PetCareDemo, contactLabel: "Hablemos de tu app" },
  empezar: { Icon: Rocket, Demo: CartDemo, contactLabel: "Hablemos de tu tienda" },
  mejorar: { Icon: SlidersHorizontal, Demo: ShipmentDemo, contactLabel: "Hablemos de tu negocio" },
  automatizar: { Icon: Workflow, Demo: SupportAgentDemo, contactLabel: "Hablemos de automatizar" },
  ventas: { Icon: ReceiptText, Demo: OrdersDemo, contactLabel: "Hablemos de tu gestión", Extra: BillingDemo, extraLabel: "Probá la facturación y el stock", extraAddress: "gestion.demo/facturacion" },
  ia: { Icon: Bot, Demo: AIAssessmentDemo, contactLabel: "Analicemos tu caso" },
  orientacion: { Icon: CircleHelp },
} satisfies Record<(typeof visitorPaths)[number]["id"], { Icon: typeof Bot; Demo?: React.ComponentType; contactLabel?: string; Extra?: React.ComponentType; extraLabel?: string; extraAddress?: string }>;

const desktopQuery = "(min-width: 900px)";

function subscribeToLayout(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isDesktop() {
  return window.matchMedia(desktopQuery).matches;
}

export default function SolutionsSection() {
  const desktop = useSyncExternalStore(subscribeToLayout, isDesktop, () => false);
  const [selection, setSelection] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = desktop ? selection ?? 0 : selection;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = visitorPaths.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = index === last ? 0 : index + 1; break;
      case "ArrowUp": next = index === 0 ? last : index - 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    setSelection(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="solutions-band" aria-labelledby="solutions-title">
      <div className="commercial-shell">
        <div className="solutions-heading">
          <h2 className="commercial-title" id="solutions-title">¿Qué te gustaría lograr?</h2>
          <p>Elegí lo que tenés en mente y explorá cómo podemos llevarlo a la práctica.</p>
        </div>
        <div className="solutions-workspace">
          <div className="solutions-tablist" role="tablist" aria-label="Objetivos del proyecto" aria-orientation="vertical">
            {visitorPaths.map(({ id, label }, index) => {
              const { Icon } = previews[id];
              return (
                <button key={id} ref={element => { tabRefs.current[index] = element; }} type="button" role="tab"
                  className="solution-selector" id={`tab-${id}`} aria-selected={active === index} aria-controls={`solution-${id}`} tabIndex={active === index ? 0 : -1}
                  onClick={() => setSelection(index)} onKeyDown={event => handleTabKey(event, index)}>
                  <span className="solution-icon"><Icon size={19} aria-hidden="true" /></span>
                  <span>{label}</span><ArrowRight size={17} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          {visitorPaths.map((path, index) => {
            const { id, label, title, detail, topic } = path;
            const preview = previews[id];
            const { Icon } = preview;
            return (
              <div className="solution-item" key={id}>
                <h3 className="solution-accordion">
                  <button type="button" className="solution-selector" id={`accordion-${id}`} aria-expanded={active === index} aria-controls={`solution-${id}`} onClick={() => setSelection(active === index ? null : index)}>
                    <span className="solution-icon"><Icon size={19} aria-hidden="true" /></span>
                    <span>{label}</span><ChevronDown size={17} aria-hidden="true" />
                  </button>
                </h3>
                <div hidden={active !== index} className="solution-panel" id={`solution-${id}`} role={desktop ? "tabpanel" : "region"} tabIndex={0} aria-labelledby={`${desktop ? "tab" : "accordion"}-${id}`}>
                  {active === index && <>
                    <div className="solution-copy">
                      <h3>{title}</h3>
                      <p className="solution-description">{detail}</p>
                    </div>
                    {id !== "orientacion" && (
                      <Link className="commercial-button commercial-button--outline solution-cta" href={{ pathname: "/contacto", query: { asunto: topic } }}>
                        {"contactLabel" in preview ? preview.contactLabel : "Hablemos de esto"} <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                    )}
                    {id === "orientacion" ? <OrientationContact topic={topic} /> : id === "idea" ? <IdeaValidation /> : "Demo" in preview && (
                      <div className="solution-demo">
                        <p className="demo-label"><span>Demo interactiva</span> {path.example}</p>
                        {"address" in path ? <DevicePreview address={path.address}><preview.Demo /></DevicePreview> : <preview.Demo />}
                        {"Extra" in preview && (
                          <details className="solution-extra">
                            <summary>{preview.extraLabel}</summary>
                            <DevicePreview address={preview.extraAddress}><preview.Extra /></DevicePreview>
                          </details>
                        )}
                      </div>
                    )}
                  </>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
