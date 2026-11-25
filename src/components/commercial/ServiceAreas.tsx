"use client";

import { useRef, useState, type UIEvent } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Compass, Layers3, RefreshCw, Workflow } from "lucide-react";

const stages = [
  {
    number: "01",
    label: "PUNTO DE PARTIDA",
    title: "Definimos qué vale la pena resolver.",
    detail: "Entendemos el problema, cómo trabajás y qué cambio tendría más impacto. De ahí sale un alcance claro y priorizado.",
    outcome: "Foco y prioridades",
    Icon: Compass,
  },
  {
    number: "02",
    label: "PRIMERA VERSIÓN",
    title: "Construimos algo que ya podés usar.",
    detail: "Diseñamos y desarrollamos la web, app o sistema que necesitás para poner la idea en marcha y aprender con el uso.",
    outcome: "Web · app · sistema",
    Icon: Layers3,
  },
  {
    number: "03",
    label: "OPERACIÓN CONECTADA",
    title: "Hacemos que la información circule.",
    detail: "Conectamos datos, herramientas y tareas para reducir pasos manuales y darle continuidad al trabajo de tu equipo.",
    outcome: "Procesos · integraciones",
    Icon: Workflow,
  },
  {
    number: "04",
    label: "EVOLUCIÓN",
    title: "Mejoramos lo que ya está funcionando.",
    detail: "Sumamos automatización e inteligencia artificial en los puntos donde pueden ahorrar tiempo y aportar información útil.",
    outcome: "Automatización · IA",
    Icon: RefreshCw,
  },
];

export default function ServiceAreas() {
  const routeRef = useRef<HTMLOListElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  function syncActiveStage({ currentTarget }: UIEvent<HTMLOListElement>) {
    const nextStage = currentTarget.children.item(1);
    const stepWidth = nextStage instanceof HTMLElement ? nextStage.offsetLeft : 0;
    const index = stepWidth ? Math.round(currentTarget.scrollLeft / stepWidth) : 0;
    setActiveStage(Math.max(0, Math.min(index, stages.length - 1)));
  }

  function moveStage(step: number) {
    const route = routeRef.current;
    const stage = route?.children.item(activeStage + step);
    if (stage instanceof HTMLElement) route?.scrollTo({ left: stage.offsetLeft });
  }

  return (
    <section id="servicios" className="commercial-shell studio-section development-section" aria-labelledby="service-areas-title">
      <header className="development-heading">
        <p className="studio-kicker">La ruta de desarrollo</p>
        <h2 className="commercial-title" id="service-areas-title">De la primera necesidad a una operación conectada.</h2>
        <p className="development-intro">Un recorrido claro para avanzar por etapas: empezamos por lo que necesitás hoy y sumamos nuevas capacidades cuando aportan valor.</p>
      </header>

      <ol ref={routeRef} id="development-stages" className="development-route" role="list" onScroll={syncActiveStage}>
        {stages.map(({ number, label, title, detail, outcome, Icon }) => (
          <li key={number} className="development-stage">
            <div className="development-stage-top">
              <span className="development-stage-number">{number}</span>
              <span className="development-stage-icon"><Icon size={20} aria-hidden="true" /></span>
            </div>
            <p className="development-stage-label">{label}</p>
            <h3>{title}</h3>
            <p className="development-stage-detail">{detail}</p>
            <p className="development-stage-outcome"><Check size={15} aria-hidden="true" />{outcome}</p>
          </li>
        ))}
      </ol>
      <div className="development-route-controls" role="group" aria-label="Navegación de las etapas">
        <button type="button" aria-label="Etapa anterior" aria-controls="development-stages" aria-disabled={activeStage === 0} onClick={() => moveStage(-1)}>
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span aria-live="polite">Etapa {activeStage + 1} de {stages.length}</span>
        <button type="button" aria-label="Etapa siguiente" aria-controls="development-stages" aria-disabled={activeStage === stages.length - 1} onClick={() => moveStage(1)}>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="development-next-step">
        <p><strong>Tu proyecto puede empezar por una sola etapa.</strong><span>Vemos juntos cuál tiene más sentido para vos.</span></p>
        <a className="development-contact" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
