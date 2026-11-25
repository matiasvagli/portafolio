"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AppWindow, ArrowUpRight, ChevronLeft, ChevronRight, Globe2, PanelsTopLeft, Pause, Play, Sparkles, Workflow } from "lucide-react";
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

const rotationDelay = 6000;

export default function HeroShowcase() {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const project = previews[selected];
  const RotationIcon = isPlaying ? Pause : Play;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setIsPlaying(!reducedMotion.matches);
    updatePreference();
    reducedMotion.addEventListener("change", updatePreference);
    return () => reducedMotion.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase || !isPlaying) return;

    const mobile = window.matchMedia("(width < 768px)");
    let inView = false;
    let timer: number | undefined;

    function updateRotation() {
      window.clearInterval(timer);
      if (mobile.matches && inView && !document.hidden) {
        timer = window.setInterval(() => setSelected((index) => (index + 1) % previews.length), rotationDelay);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.5;
      updateRotation();
    }, { threshold: 0.5 });
    observer.observe(showcase);
    mobile.addEventListener("change", updateRotation);
    document.addEventListener("visibilitychange", updateRotation);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      mobile.removeEventListener("change", updateRotation);
      document.removeEventListener("visibilitychange", updateRotation);
    };
  }, [isPlaying]);

  function movePreview(step: number) {
    setIsPlaying(false);
    setSelected((index) => (index + step + previews.length) % previews.length);
  }

  return (
    <div ref={showcaseRef} className="hero-showcase" aria-label="Agentes y trabajos destacados">
      <div className="showcase-picker" role="group" aria-label="Elegí una vista">
        {previews.map(({ type, Icon }, index) => (
          <button key={type} type="button" aria-pressed={index === selected} aria-controls="showcase-project" onClick={() => setSelected(index)}><Icon size={16} aria-hidden="true" />{type}</button>
        ))}
      </div>
      <div className="showcase-mobile-bar">
        <span className="showcase-category" aria-live={isPlaying ? "off" : "polite"}>
          <project.Icon size={14} aria-hidden="true" />{project.type}
        </span>
        <div className="showcase-controls" role="group" aria-label="Controles de proyectos destacados">
          <button type="button" aria-label={isPlaying ? "Pausar rotación" : "Reproducir rotación"} aria-controls="showcase-project" onClick={() => setIsPlaying(!isPlaying)}>
            <RotationIcon size={16} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Proyecto anterior" aria-controls="showcase-project" onClick={() => movePreview(-1)}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Proyecto siguiente" aria-controls="showcase-project" onClick={() => movePreview(1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
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
            <a href={project.href} target={"external" in project ? "_blank" : undefined} rel={"external" in project ? "noopener noreferrer" : undefined} aria-label={`Ver proyecto ${project.title}`} onFocus={() => setIsPlaying(false)}><ArrowUpRight size={20} aria-hidden="true" /></a>
          )}
        </div>
      </div>
    </div>
  );
}
