"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudiesSection() {
  const [selectedId, setSelectedId] = useState("all");
  const visibleStudies = selectedId === "all" ? caseStudies : caseStudies.filter(study => study.id === selectedId);

  return (
    <section className="commercial-shell portfolio-inner">
      <header className="portfolio-heading">
        <h1 className="commercial-title">Casos de estudio</h1>
        <p>Te muestro qué necesitaban resolver y cómo lo llevé a un sistema que se puede usar en el día a día.</p>
        <Link href="/landings" className="work-link">Ver webs en vivo <ArrowRight size={17} aria-hidden="true" /></Link>
      </header>
      <div className="portfolio-filters" role="group" aria-label="Filtrar casos de estudio">
        <button type="button" aria-pressed={selectedId === "all"} onClick={() => setSelectedId("all")}>Todos</button>
        {caseStudies.map(study => (
          <button type="button" key={study.id} aria-pressed={selectedId === study.id} onClick={() => setSelectedId(study.id)}>
            {study.shortTitle}
          </button>
        ))}
      </div>
      <div className="case-list">
        {visibleStudies.map(study => <CaseStudyCard key={study.id} study={study} />)}
      </div>
      <Link href="/como-trabajo" className="work-link work-case-link">Conocé cómo trabajo <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}
