"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Boxes,
  Terminal,
  Shield,
  ArrowRight,
} from "lucide-react";
import { openSourceTools } from "@/data/open-source";
import { profileData } from "@/data/profile";

export default function OpenSourceSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full min-w-0 max-w-[1680px] mx-auto px-4 sm:px-10 xl:px-16 space-y-10 sm:space-y-12 [overflow-wrap:anywhere]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="min-w-0 max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono">
              <Boxes className="w-3.5 h-3.5 shrink-0" />
              <span>HERRAMIENTAS OPEN SOURCE · IA APLICADA & MCP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-zinc-100 tracking-tight">
              Herramientas Open Source que hice para la comunidad
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Desde sandboxes en Docker que auditan el comportamiento real de servidores
              MCP sin confiar en el código fuente, hasta pipelines RAG autoconfigurables
              para NestJS, memoria persistente para equipos que usan LLMs y generadores
              CLI en Python.
            </p>
          </div>

          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto self-start justify-center items-center gap-2 px-4 sm:px-5 py-3 rounded-lg font-mono text-xs sm:text-sm bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-bold shrink-0 transition-colors"
          >
            <Github className="w-4 h-4 shrink-0" />
            <span>Ver perfil en GitHub (@matiasvagli)</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* Grid amplia de herramientas Open Source */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {openSourceTools.map((tool, index) => (
            <motion.article
              key={tool.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className={`min-w-0 rounded-2xl border border-zinc-800 bg-[#111214] hover:border-amber-500/60 transition-all p-4 sm:p-8 flex flex-col justify-between space-y-6 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="min-w-0 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {tool.highlightBadge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {tool.category}
                    </span>
                  </div>

                  <a
                    href={tool.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Ver Repositorio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-start gap-2">
                    <Terminal className="w-5 h-5 mt-1 text-amber-500 shrink-0" />
                    <span className="min-w-0">{tool.name}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 mt-1">
                    {tool.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <p className="text-xs font-mono text-amber-500 uppercase">
                      Problema que ataca
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {tool.problemSolved}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <p className="text-xs font-mono text-emerald-400 uppercase">
                      Cómo lo resuelve
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {tool.howItWorks}
                    </p>
                  </div>
                </div>

                <pre tabIndex={0} aria-label={`Ejemplo de uso de ${tool.name}`} className="max-w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 overflow-x-auto [overflow-wrap:normal]">
                  <code>{tool.commandOrSnippet}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800">
                {tool.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Nota de proyectos en laboratorio */}
        <div className="p-6 rounded-xl bg-[#111214] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-zinc-100">
                También en desarrollo: BitGoTe (Custodio de secretos en Go) & ElecApp
                (Offline-first + MCP)
              </p>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                ¿Querés ver también las landings y sitios comerciales que diseñé y publiqué
                en producción?
              </p>
            </div>
          </div>
          <Link
            href="/landings"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 text-zinc-950 font-mono font-bold text-xs shrink-0"
          >
            <span>Ver Landings en Vivo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
