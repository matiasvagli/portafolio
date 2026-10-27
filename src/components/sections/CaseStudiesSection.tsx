"use client";

import { useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudiesSection() {
  const [selectedId, setSelectedId] = useState<string>("all");

  const visibleStudies =
    selectedId === "all"
      ? caseStudies
      : caseStudies.filter((s) => s.id === selectedId);

  return (
    <section className="py-12 lg:py-16">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16 space-y-10">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono">
              <BriefcaseBusiness className="w-3.5 h-3.5" />
              <span>CASOS REALES EN PRODUCCIÓN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-zinc-100 tracking-tight">
              Lo que resolvimos en la vida real con código y arquitectura
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Desde un ERP de publicidad exterior con 13 módulos, WebSockets en Redis y
              facturación electrónica ARCA (**Sistema Zona**), hasta la digitalización
              completa de una distribuidora mayorista avícola con App Móvil, QR e IA
              local on-premise (**Huevo de Oro**).
            </p>
          </div>

          {/* Filtro rápido para ir directo a un caso o ver todos */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedId("all")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                selectedId === "all"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              Ver Todos ({caseStudies.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedId("sistema-zona")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                selectedId === "sistema-zona"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              Sistema Zona
            </button>
            <button
              type="button"
              onClick={() => setSelectedId("huevo-de-oro")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                selectedId === "huevo-de-oro"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              Huevo de Oro (El Mayorista)
            </button>
            <button
              type="button"
              onClick={() => setSelectedId("arquitectura-nestjs-prisma")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-colors ${
                selectedId === "arquitectura-nestjs-prisma"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              NestJS + Prisma DDD
            </button>
          </div>
        </div>

        <div className="space-y-10">
          {visibleStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        <div className="p-6 rounded-xl bg-[#111214] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-zinc-100">
              ¿Querés ver las reglas de ingeniería detrás de estos sistemas?
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              DDD, Clean Code, modelado de DB, Redis, Docker y guardianes automáticos
              contra N+1.
            </p>
          </div>
          <Link
            href="/como-trabajo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-mono font-bold text-xs shrink-0"
          >
            <span>Ir a Cómo Trabajo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
