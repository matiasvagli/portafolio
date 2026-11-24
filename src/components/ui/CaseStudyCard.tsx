"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, FileText, Images, Layers } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import DevicePreview from "@/components/commercial/DevicePreview";
import ImageLightbox from "./ImageLightbox";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const cover = study.images[0];

  function changeImage(step: number) {
    setLightboxIndex(index => index === null ? null : (index + step + study.images.length) % study.images.length);
  }

  return (
    <article id={study.id} tabIndex={-1} className="case-card" aria-labelledby={`${study.id}-title`}>
      <div className="case-overview">
        <div className="case-copy">
          <p className="portfolio-category">{study.clientType}</p>
          <h2 id={`${study.id}-title`}>{study.shortTitle}</h2>
          <p>{study.overview}</p>
          <div className="case-actions">
            {cover && <button type="button" className="commercial-button commercial-button--outline" onClick={() => setLightboxIndex(0)}>
              <Images size={17} aria-hidden="true" /> Ver capturas ({study.images.length})
            </button>}
            {study.liveUrl && <a className="work-link" href={study.liveUrl} target="_blank" rel="noopener noreferrer">
              Visitar web <ArrowUpRight size={17} aria-hidden="true" />
            </a>}
            {study.pdfReportUrl && <a className="work-link" href={study.pdfReportUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={17} aria-hidden="true" /> Reporte en PDF
            </a>}
          </div>
        </div>
        {cover ? (
          <DevicePreview address={study.shortTitle}>
            <button type="button" className="case-cover" onClick={() => setLightboxIndex(0)} aria-label={`Ampliar captura de ${study.shortTitle}`}>
              <Image src={cover} alt="" width={1400} height={780} sizes="(min-width: 900px) 48vw, 92vw" />
            </button>
          </DevicePreview>
        ) : (
          <div className="case-architecture-preview">
            <p><Layers size={19} aria-hidden="true" /> Arquitectura del sistema</p>
            <ul>{study.architectureFlow.map(node => <li key={node.title}><strong>{node.title}</strong><span>{node.tech}</span></li>)}</ul>
          </div>
        )}
      </div>
      <div className="case-details">
        <details className="portfolio-expand">
          <summary>Qué resolví <ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="portfolio-expand-body case-breakdown">
            <div><h3>{study.problem.headline}</h3><ul>{study.problem.points.map(point => <li key={point}>{point}</li>)}</ul></div>
            <div><h3>{study.solution.headline}</h3><ul>{study.solution.points.map(point => <li key={point}>{point}</li>)}</ul></div>
            <dl className="case-metrics">{study.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
          </div>
        </details>
        <details className="portfolio-expand">
          <summary>Arquitectura y decisiones <ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="portfolio-expand-body case-breakdown">
            <p className="case-wide">{study.subtitle}</p>
            <div>
              <h3>Cómo se organiza el sistema</h3>
              <dl>{study.architectureFlow.map(node => <div key={node.title}><dt>{node.title} · {node.tech}</dt><dd>{node.detail}</dd></div>)}</dl>
            </div>
            <div>
              <h3>Decisiones de ingeniería</h3>
              <dl>{study.keyEngineeringDecisions.map(decision => <div key={decision.title}><dt>{decision.title}</dt><dd>{decision.description}</dd></div>)}</dl>
            </div>
            <ul className="case-stack case-wide" aria-label="Tecnologías usadas">
              {study.stack.map(technology => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
        </details>
      </div>
      {cover && <ImageLightbox images={study.images} currentIndex={lightboxIndex} title={study.shortTitle} onClose={() => setLightboxIndex(null)} onPrev={() => changeImage(-1)} onNext={() => changeImage(1)} />}
    </article>
  );
}
