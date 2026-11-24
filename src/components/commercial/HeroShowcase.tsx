"use client";

import Image from "next/image";
import { useState } from "react";
import { AppWindow, ArrowUpRight, Globe2, PanelsTopLeft, Sparkles, Workflow } from "lucide-react";
import DevicePreview from "./DevicePreview";

const previews = [
  {
    type: "Web", Icon: Globe2, title: "Coruja Casas Serranas", alt: "Catálogo de alojamientos de Coruja", address: "corujacasasserranas.com.ar",
    desktop: "/comercial/coruja-escritorio.webp", mobile: "/comercial/coruja-celular.webp",
    detail: "Catálogo de alojamientos y consultas de estadía.",
    href: "https://corujacasasserranas.com.ar/", external: true,
  },
  {
    type: "Sistema", Icon: PanelsTopLeft, title: "Sistema Zona", alt: "Tablero de órdenes de trabajo de Zona con datos de muestra", address: "Sistema Zona / Órdenes de trabajo",
    desktop: "/comercial/zona-panel.webp",
    detail: "Seguimiento de órdenes de trabajo, desde diseño hasta entrega.",
    href: "/casos#sistema-zona",
  },
  {
    type: "IA y automatización", Icon: Sparkles,
    mockup: "/comercial/agentes-automatizacion.webp", mockupAlt: "Vista de ejemplo de un agente que atiende consultas, organiza reservas, registra pedidos y actualiza clientes.",
    title: "Atención y tareas en paralelo", detail: "Consultas, reservas y pedidos atendidos mientras vos te ocupás de lo demás.",
  },
  {
    type: "Aplicación", Icon: AppWindow, title: "Futboliga", alt: "Vista de Futboliga con plantel, convocatorias, pizarra táctica y caja del equipo", address: "Futboliga / Demos",
    desktop: "/comercial/futboliga-aplicacion.webp", fullPreview: { width: 1182, height: 923 },
    detail: "Planteles, partidos y convocatorias de fútbol amateur.",
    href: "/casos#futboliga",
  },
  {
    type: "Agentes de negocio", Icon: Workflow,
    mockup: "/comercial/agentes-especializados.webp", mockupAlt: "Vista de ejemplo de agentes especializados en ventas, contabilidad, facturación con ARCA, cobranzas y stock.",
    title: "Análisis, contabilidad y facturación", detail: "Agentes conectados al sistema, con revisión humana donde la necesitás.",
  },
] as const;

export default function HeroShowcase() {
  const [selected, setSelected] = useState(0);
  const project = previews[selected];

  return (
    <div className="hero-showcase" aria-label="Agentes y trabajos destacados">
      <div className="showcase-picker" role="group" aria-label="Elegí una vista">
        {previews.map(({ type, Icon }, index) => (
          <button key={type} type="button" aria-pressed={index === selected} aria-controls="showcase-project" onClick={() => setSelected(index)}><Icon size={16} aria-hidden="true" />{type}</button>
        ))}
      </div>
      <div id="showcase-project">
        {"mockup" in project ? (
          <div className="showcase-stage showcase-stage--mockup">
            <Image className="showcase-mockup" key={project.mockup} src={project.mockup} width={1408} height={790} alt={project.mockupAlt} sizes="(min-width: 1450px) 910px, (min-width: 850px) 53vw, 93vw" priority={selected === 0} />
          </div>
        ) : (
          <div className="showcase-stage">
            <div className="showcase-desktop">
              <DevicePreview address={project.address}>
                <Image key={project.desktop} src={project.desktop} width={"fullPreview" in project ? project.fullPreview.width : 1320} height={"fullPreview" in project ? project.fullPreview.height : 700} data-full-preview={"fullPreview" in project || undefined} alt={project.alt} sizes="(min-width: 1450px) 910px, (min-width: 850px) 53vw, 93vw" />
              </DevicePreview>
            </div>
            {"mobile" in project && (
              <div className="showcase-phone">
                <Image src={project.mobile} width={420} height={751} alt="Sitio de Coruja en celular" sizes="(min-width: 1250px) 167px, 19vw" />
              </div>
            )}
          </div>
        )}
        <div className="showcase-caption">
          <div><strong>{project.title}</strong><p>{project.detail}</p></div>
          {"href" in project && (
            <a href={project.href} target={"external" in project ? "_blank" : undefined} rel={"external" in project ? "noopener noreferrer" : undefined} aria-label={`Ver proyecto ${project.title}`}><ArrowUpRight size={20} aria-hidden="true" /></a>
          )}
        </div>
      </div>
    </div>
  );
}
