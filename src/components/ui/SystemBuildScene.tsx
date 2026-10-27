"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { useInView } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { showcaseProjects } from "@/data/showcase";
import "./system-build-scene.css";
import "./system-build-factory.css";
import "./system-build-motion.css";

const codeLines = [
  { label: "BACKEND", code: "domain → application → infrastructure", color: "#fbbf24" },
  { label: "DATOS", code: "postgres.connect() → reglas de negocio", color: "#60a5fa" },
  { label: "WEB", code: "npm run build → sitio en producción", color: "#a78bfa" },
  { label: "OPEN SOURCE", code: "git push origin → compartir lo aprendido", color: "#34d399" },
];
const categories = ["Sistemas", "Webs", "Open source"] as const;

export default function SystemBuildScene() {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const [active, setActive] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const project = showcaseProjects[active];

  useEffect(() => {
    setReady(true);
    if (reducedMotion) { setFinished(true); return; }
    setFinished(false);
    const timer = setTimeout(() => setFinished(true), 4200);
    return () => clearTimeout(timer);
  }, [run, reducedMotion]);

  useEffect(() => {
    function onVisibility() { setHidden(document.hidden); }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!finished || reducedMotion || paused || interacting || hidden || !inView) return;
    const timer = setTimeout(() => {
      setHasAdvanced(true);
      setActive(value => (value + 1) % showcaseProjects.length);
    }, hasAdvanced ? 5500 : 2200);
    return () => clearTimeout(timer);
  }, [finished, reducedMotion, paused, interacting, hidden, inView, active, hasAdvanced]);

  function select(index: number) {
    setHasAdvanced(true);
    setActive((index + showcaseProjects.length) % showcaseProjects.length);
    setPaused(true);
    setFinished(true);
  }

  function replay() {
    setHasAdvanced(false);
    setFinished(false);
    setRun(value => value + 1);
    setPaused(false);
  }

  return (
    <section ref={ref} aria-labelledby="scene-title" className={`build-scene portfolio-factory ${ready ? "scene-ready" : ""} ${reducedMotion ? "scene-static" : ""}`}>
      <div className="scene-topline"><span>MATÍAS VAGLIVIELLO <span className="scene-topline-detail">/ BACKEND & SISTEMAS</span></span><span className="scene-live"><i /> SISTEMAS / WEBS / OPEN SOURCE</span></div>
      <div key={run} className="scene-performance">
        <div className="scene-grid" aria-hidden="true" /><div className="scene-orbit scene-orbit-one" aria-hidden="true" /><div className="scene-orbit scene-orbit-two" aria-hidden="true" />
        <div className="scene-result">
          <div className="scene-pitch">
            <p className="scene-kicker">UNA SELECCIÓN DE MIS ÚLTIMOS TRABAJOS</p>
            <h1 id="scene-title">DEL CÓDIGO<br /><span>A PRODUCCIÓN</span><span className="scene-title-dot">.</span></h1>
            <div className="factory-container" aria-hidden="true"><div className="docker-shadow" /><div className="docker-box"><div className="docker-box-top" /><div className="docker-box-face"><Image src="/icons/docker.svg" alt="" width={96} height={96} /><div><strong>DOCKER</strong><span>matiasvagli / ideas:latest</span></div><span className="docker-stamp">CÓDIGO<br />ADENTRO.<br />NEGOCIO<br />AFUERA.</span></div><div className="docker-door" /><div className="docker-door-glow" /></div></div>
            <p className="scene-description">Sistemas que ordenan. Webs que muestran.<br />Herramientas que comparto.</p>
            <div className="factory-categories" aria-label="Explorar por tipo de proyecto">{categories.map(category => <button key={category} type="button" onClick={() => select(showcaseProjects.findIndex(item => item.category === category))} aria-pressed={project.category === category}>{category}<ArrowUpRight className="h-3 w-3" /></button>)}</div>
            <div className="scene-actions"><Link href="/contacto" className="button-primary">Hagamos el tuyo <ArrowUpRight className="h-4 w-4" /></Link><a href="#proyectos" className="scene-more">Explorar trabajos <ArrowDown className="h-4 w-4" /></a></div>
          </div>
          <div className="factory-output" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
            <div className="scene-product-label"><span><i /> SALE DEL CONTENEDOR</span><span>{String(active + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}</span></div>
            <div className="factory-output-stage" aria-roledescription="carrusel" aria-label="Proyectos de Matías Vagliviello">
              <div key={project.id} className={`factory-project ${hasAdvanced ? "factory-project-next" : ""}`} role="group" aria-roledescription="diapositiva" aria-label={`${active + 1} de ${showcaseProjects.length}: ${project.title}`}>
                <div className="scene-browser"><div className="scene-browser-bar"><span /><span /><span /><code>{project.category.toLowerCase()} / {project.id}</code></div><div className={`scene-screen ${project.snippet ? "scene-terminal" : ""}`}>
                  {project.image ? <Image src={project.image} alt={`Captura real de ${project.title}`} fill priority={active === 0} sizes="(min-width: 900px) 57vw, 100vw" className="object-cover object-left-top" /> : <div className="factory-terminal"><p>$ {project.id} <span>--build</span></p><pre>{project.snippet}</pre><p className="factory-terminal-end">↳ Código abierto. Miralo por dentro.</p></div>}
                </div></div>
                <div className="factory-project-info" aria-live={paused ? "polite" : "off"}><div><p className="eyebrow">{project.category}</p><h2>{project.title}</h2><p className="factory-project-description">{project.description}</p><p className="factory-stack">{project.stack}</p></div><a href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined} aria-label={`Ver ${project.title}`} className="factory-project-link"><ArrowUpRight className="h-6 w-6" /></a></div>
              </div>
              <div className="factory-build-placeholder" aria-hidden="true"><span className="factory-build-spinner" /><p>COMPILANDO IDEAS…</p><span>El próximo proyecto está saliendo.</span></div>
            </div>
            <div className="factory-controls"><div className="factory-progress" aria-label="Seleccionar proyecto">{showcaseProjects.map((item, index) => <button key={item.id} type="button" aria-label={`Mostrar ${item.title}`} aria-current={active === index ? "true" : undefined} onClick={() => select(index)}><span /></button>)}</div><div className="factory-arrows"><button type="button" onClick={() => select(active - 1)} aria-label="Proyecto anterior"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"} disabled={!!reducedMotion}>{paused || reducedMotion ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}</button><button type="button" onClick={() => select(active + 1)} aria-label="Proyecto siguiente"><ArrowRight className="h-4 w-4" /></button></div></div>
          </div>
        </div>
        <div key={`code-${active}`} className={`scene-code ${hasAdvanced ? "scene-code-next" : ""}`} aria-hidden="true">{codeLines.map((line, index) => <div key={line.label} className={`code-packet code-packet-${index}`} style={{ "--packet-color": line.color } as React.CSSProperties}><span>{line.label}</span><code>{line.code}</code></div>)}</div>
        <div className="scene-fracture" aria-hidden="true"><svg viewBox="0 0 1600 900" preserveAspectRatio="none"><path d="M1040 460 L730 0 M1040 460 L1400 0 M1040 460 L1600 590 M1040 460 L1280 900 M1040 460 L560 900 M1040 460 L0 280 M1040 460 L1600 80 M1040 460 L0 820" /></svg></div>
        <div className="scene-shards" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map(index => <span key={index} className={`scene-shard scene-shard-${index}`} />)}</div>
      </div>
      <div className="scene-bottomline"><span className="scene-status" aria-live="polite"><i />{finished ? "IDEAS ADENTRO. PROYECTOS AFUERA." : "CONSTRUYENDO ALGO REAL…"}</span><button type="button" onClick={replay} disabled={!!reducedMotion} className="scene-replay" aria-label="Repetir la construcción de proyectos con Docker"><RotateCcw className="h-3.5 w-3.5" /> Repetir construcción</button><span className="scene-bottom-detail">{showcaseProjects.length} PROYECTOS / CÓDIGO EN MOVIMIENTO</span></div>
    </section>
  );
}
