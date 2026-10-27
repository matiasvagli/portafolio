"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FileBarChart2,
  Images,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [activeTab, setActiveTab] = useState<"problema" | "arquitectura" | "decisiones">(
    "problema"
  );
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <motion.article
      id={study.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="scroll-mt-24 rounded-2xl border border-zinc-800 bg-[#111214] overflow-hidden"
    >
      <div className="p-6 sm:p-8 xl:p-10 space-y-8">
        {/* Cabecera */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-zinc-800/80">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {study.badge}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {study.clientType}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-zinc-100 tracking-tight">
              {study.title}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {study.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {study.pdfReportUrl && (
              <a
                href={study.pdfReportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 transition-colors"
              >
                <FileBarChart2 className="w-4 h-4" />
                <span>Zona en Números (PDF)</span>
              </a>
            )}
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-bold transition-colors"
              >
                <span>Ver Sitio en Vivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {study.images.length > 0 && (
              <button
                type="button"
                onClick={() => setLightboxIdx(0)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-colors"
              >
                <Images className="w-4 h-4" />
                <span>Ver Capturas ({study.images.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Métricas del caso */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-500">
                {m.value}
              </div>
              <div className="text-xs font-mono text-zinc-300 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Navegación de pestañas */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("problema")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono transition-all ${
              activeTab === "problema"
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            1. El Problema Real vs. La Solución de Código
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("arquitectura")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "arquitectura"
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Flujo de Arquitectura & Capas</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("decisiones")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono transition-all flex items-center gap-1.5 ${
              activeTab === "decisiones"
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. Decisiones Críticas de Ingeniería</span>
          </button>
        </div>

        {activeTab === "problema" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{study.problem.headline}</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300">
                {study.problem.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-amber-500 font-mono mt-0.5">→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-700/80 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-mono">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{study.solution.headline}</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-200">
                {study.solution.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "arquitectura" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {study.architectureFlow.map((node, index) => (
              <div
                key={node.title}
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-zinc-700">
                      CAPA 0{index + 1}
                    </span>
                    {index < study.architectureFlow.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-zinc-600 hidden lg:block" />
                    )}
                  </div>
                  <h4 className="text-base font-bold text-zinc-100">{node.title}</h4>
                  <p className="text-xs font-mono text-amber-500">{node.tech}</p>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{node.detail}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "decisiones" && (
          <div className="grid md:grid-cols-2 gap-5">
            {study.keyEngineeringDecisions.map((decision) => (
              <div
                key={decision.title}
                className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2"
              >
                <h4 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{decision.title}</span>
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {decision.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {study.images.length > 0 && (
          <div className="pt-2 space-y-2.5">
            <p className="text-xs font-mono text-zinc-400">
              CAPTURAS REALES DEL SISTEMA WEB Y APP MÓVIL (CLICK PARA AMPLIAR):
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {study.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setLightboxIdx(i)}
                  className="group relative aspect-video rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500 transition-all bg-zinc-950"
                >
                  <img
                    src={img}
                    alt={`${study.title} miniatura ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={study.images}
        currentIndex={lightboxIdx}
        title={study.title}
        onClose={() => setLightboxIdx(null)}
        onPrev={() =>
          setLightboxIdx((prev) =>
            prev === null ? null : (prev - 1 + study.images.length) % study.images.length
          )
        }
        onNext={() =>
          setLightboxIdx((prev) =>
            prev === null ? null : (prev + 1) % study.images.length
          )
        }
      />
    </motion.article>
  );
}
