"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { productionLandings } from "@/data/open-source";

export default function LandingsSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16 space-y-12">
        <div className="max-w-4xl space-y-3 pb-6 border-b border-zinc-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>SITIOS & LANDINGS PUBLICADAS EN PRODUCCIÓN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Landings y Productos Web en Vivo
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Sitios reales que diseñé, optimicé y publiqué para negocios en actividad.
            Hacé click en cualquiera para abrirlo en producción.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {productionLandings.map((site, idx) => (
            <motion.article
              key={site.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="group rounded-2xl border border-zinc-800 bg-[#111214] hover:border-amber-500/70 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Imagen con link directo */}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] bg-zinc-950 overflow-hidden border-b border-zinc-800"
                >
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-zinc-950/90 border border-zinc-700 text-xs font-mono text-amber-400 flex items-center gap-1.5">
                    <span>Abrir sitio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-amber-500">
                      {site.niche}
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-100 mt-1">
                      {site.name}
                    </h2>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {site.description}
                  </p>

                  <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{site.impact}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {site.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-100 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs transition-colors"
                >
                  <span>Visitar {site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-[#111214] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-zinc-100">
              ¿Necesitás una plataforma a medida o querés sumar un backend senior a tu
              equipo?
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Escribime directo por WhatsApp, Email o el formulario de contacto.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-mono font-bold text-xs shrink-0"
          >
            <span>Ir a Contacto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
