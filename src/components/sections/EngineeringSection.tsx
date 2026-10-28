"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  CheckCircle2,
  Database,
  Layers,
  Gauge,
  Server,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { engineeringPillars } from "@/data/engineering";
import { profileData } from "@/data/profile";

const pillarIcons = [Layers, Database, Gauge, Server];

export default function EngineeringSection() {
  const [selectedId, setSelectedId] = useState(engineeringPillars[0].id);
  const activePillar =
    engineeringPillars.find((p) => p.id === selectedId) ?? engineeringPillars[0];

  return (
    <section className="py-12 lg:py-16">
      <div className="w-full min-w-0 max-w-[1680px] mx-auto px-4 sm:px-10 xl:px-16 space-y-10 sm:space-y-16 [overflow-wrap:anywhere]">
        <div className="max-w-4xl space-y-3 pb-6 border-b border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>ARQUITECTURA · DDD · CLEAN CODE · BASE DE DATOS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Cómo trabajo por dentro: menos humo, más invariantes y tests
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Mis reglas de arquitectura aplican igual en{" "}
            <span className="text-zinc-100 font-semibold">Python (Django / FastAPI)</span>,{" "}
            <span className="text-zinc-100 font-semibold">
              TypeScript (NestJS / Prisma / TypeORM)
            </span>{" "}
            y <span className="text-zinc-100 font-semibold">Go</span>: el dominio no
            depende del framework, los listados no tienen N+1 y la base de datos es la
            última línea de defensa.
          </p>
        </div>

        {/* Selector interactivo + Código en vivo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="min-w-0 lg:col-span-5 space-y-3">
            {engineeringPillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              const isSelected = pillar.id === selectedId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedId(pillar.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-zinc-900 border-amber-500 shadow-lg"
                      : "bg-[#111214] hover:bg-zinc-900/70 border-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-amber-500">
                      {pillar.badge}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-amber-400" : "text-zinc-500"
                      }`}
                    />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-100 mt-1.5">
                    {pillar.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                    {pillar.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="min-w-0 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-zinc-800 bg-[#111214] overflow-hidden"
              >
                <div className="p-4 sm:p-8 space-y-6">
                  <div>
                    <span className="text-xs font-mono text-amber-500">
                      {activePillar.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                      {activePillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
                      {activePillar.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activePillar.principles.map((rule) => (
                      <div
                        key={rule}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-2">
                      <span className="min-w-0 text-xs font-mono text-zinc-300">
                        {activePillar.codeTitle}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-400 uppercase">
                        {activePillar.codeLanguage}
                      </span>
                    </div>
                    <pre tabIndex={0} aria-label={`Ejemplo de código: ${activePillar.codeTitle}`} className="max-w-full p-4 sm:p-5 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed [overflow-wrap:normal]">
                      <code>{activePillar.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Matriz de Stack Tecnológico */}
        <div className="pt-12 border-t border-zinc-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
                CAJA DE HERRAMIENTAS EN PRODUCCIÓN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
                Stack Técnico Dominado
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                Sin dependencias innecesarias · Cada elección justificada por ADR
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.stackCategories.map((cat) => (
              <div
                key={cat.id}
                className="min-w-0 p-5 sm:p-6 rounded-xl bg-[#111214] border border-zinc-800 flex flex-col justify-between space-y-5"
              >
                <div>
                  <span
                    className={`inline-block text-xs font-mono px-3 py-1 rounded border ${cat.badgeColor}`}
                  >
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-100 mt-3">{cat.title}</h3>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80"
                    >
                      <div className="text-sm font-bold text-zinc-100 font-mono">
                        {item.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#111214] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-zinc-100">
              ¿Querés ver las herramientas de código abierto que construí con este enfoque?
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Sandboxes Docker para auditar MCP servers, pipelines RAG en NestJS y más.
            </p>
          </div>
          <Link
            href="/open-source"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 text-zinc-950 font-mono font-bold text-xs shrink-0"
          >
            <span>Ir a Open Source</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
