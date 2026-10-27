"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowUpRight, Check, Pause, Play, Power, RotateCcw } from "lucide-react";
import { featuredProjects } from "@/data/home";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import "./project-notebook.css";

type Phase = "boot" | "story" | "result";
const phaseDuration: Record<Phase, number> = { boot: 1800, story: 3000, result: 5600 };

export default function ProjectNotebook() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const hasEntered = useInView(ref, { amount: 0.25, once: true });
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("boot");
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [replay, setReplay] = useState(0);
  const project = featuredProjects[active];
  const visiblePhase = reducedMotion ? "result" : phase;

  useEffect(() => {
    setReady(true);
    function onVisibility() { setHidden(document.hidden); }
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!ready || !inView || reducedMotion || paused || hidden) return;
    const timer = setTimeout(() => {
      if (phase === "boot") setPhase("story");
      else if (phase === "story") setPhase("result");
      else {
        setActive(index => (index + 1) % featuredProjects.length);
        setPhase("boot");
      }
    }, phaseDuration[phase]);
    return () => clearTimeout(timer);
  }, [ready, inView, reducedMotion, paused, hidden, phase, active, replay]);

  function selectProject(index: number) {
    setActive(index);
    setPhase("result");
    setPaused(true);
  }

  function repeat() {
    setPhase("boot");
    setPaused(false);
    setReplay(value => value + 1);
  }

  return (
    <div ref={ref} className={`project-notebook ${ready ? "notebook-ready" : ""} ${hasEntered ? "notebook-started" : ""} ${reducedMotion ? "notebook-reduced" : ""}`} data-phase={visiblePhase} data-paused={paused || hidden || !inView}>
      <div className="notebook-device">
        <div className="notebook-lid">
          <div className="notebook-camera" aria-hidden="true"><span /></div>
          <div className="notebook-screen">
            <div key={project.id} className="notebook-desktop">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 840px) 760px, 92vw" className="object-contain" />
            </div>
            <div key={`${project.id}-${replay}`} className="notebook-boot" aria-hidden={visiblePhase !== "boot"}>
              <Power className="notebook-power" aria-hidden="true" />
              <p className="notebook-boot-label">{project.title}</p>
              <h3>{project.bootMessage}<span className="notebook-cursor">_</span></h3>
              <div className="notebook-load-track" aria-hidden="true"><span /></div>
              <p className="notebook-boot-detail">Preparando una operación conectada…</p>
            </div>
            <div className="notebook-story" aria-hidden={visiblePhase !== "story"}>
              <p className="notebook-story-label">LO QUE RESOLVIMOS / {project.title}</p>
              <h3>{project.resolution}</h3>
              <ul>{project.outcomes.map(outcome => <li key={outcome}><Check aria-hidden="true" />{outcome}</li>)}</ul>
            </div>
            <div className="notebook-screen-bar">
              <span className="notebook-case-name"><i />{project.title}</span>
              <Link href={`/casos#${project.id}`} onFocus={() => setPaused(true)} aria-label={`Ver el caso completo de ${project.title}`}>Ver el caso <ArrowUpRight className="h-3 w-3" /></Link>
            </div>
          </div>
          <div className="notebook-chin" aria-hidden="true">MATIASVAGLI <span>·</span> DE LA IDEA AL SISTEMA</div>
        </div>
        <div className="notebook-base" aria-hidden="true"><span /></div>
        <div className="notebook-shadow" aria-hidden="true" />
      </div>
      <div className="notebook-controls">
        <div className="notebook-projects" role="group" aria-label="Elegir sistema">
          {featuredProjects.map((item, index) => <button key={item.id} type="button" onClick={() => selectProject(index)} aria-pressed={active === index}><span>{item.number}</span>{item.title}</button>)}
        </div>
        {!reducedMotion && <div className="notebook-playback"><button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Reanudar presentación" : "Pausar presentación"}>{paused ? <Play /> : <Pause />}</button><button type="button" onClick={repeat} aria-label={`Repetir presentación de ${project.title}`}><RotateCcw /></button></div>}
      </div>
    </div>
  );
}
