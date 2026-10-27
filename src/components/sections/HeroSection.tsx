"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  BriefcaseBusiness,
  Code2,
  Boxes,
  Globe,
  MessageSquare,
  Layers,
  Database,
  ShieldCheck,
} from "lucide-react";
import { profileData } from "@/data/profile";
import TerminalSimulator from "@/components/ui/TerminalSimulator";

const routeCards = [
  {
    href: "/casos",
    tag: "01 · PRODUCCIÓN REAL",
    title: "Casos de Estudio",
    desc: "Qué resolvimos en Sistema Zona (ERP OOH) y en Huevo de Oro (El Mayorista Web + App Móvil + IA Local).",
    icon: BriefcaseBusiness,
  },
  {
    href: "/como-trabajo",
    tag: "02 · ARQUITECTURA & DB",
    title: "Cómo Trabajo",
    desc: "DDD, Clean Code, Django, NestJS + Prisma, modelado PostgreSQL, Redis, Docker y tests Anti N+1 (1 vs 20).",
    icon: Code2,
  },
  {
    href: "/open-source",
    tag: "03 · COMUNIDAD & IA",
    title: "Herramientas Open Source",
    desc: "BitGoTe (firewall local y custodio de secretos en Go para agentes IA), SkillAudit, ragkit, Team Context MCP y Wallet Saga.",
    icon: Boxes,
  },
  {
    href: "/landings",
    tag: "04 · WEB EN VIVO",
    title: "Landings en Producción",
    desc: "Sitios publicados y convirtiendo clientes hoy: Zona Urbana Publicidad, Coruja Casas Serranas y Futboliga.",
    icon: Globe,
  },
  {
    href: "/contacto",
    tag: "05 · CONTACTO DIRECTO",
    title: "Hablemos",
    desc: "Escribime por WhatsApp, Email o mediante el formulario para trabajar juntos.",
    icon: MessageSquare,
  },
];

export default function HeroSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16 space-y-16">
        {/* Bloque principal a pantalla ancha */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-amber-400 font-bold">42 AÑOS · 100% VIGENTE</span>
              <span className="text-zinc-600">|</span>
              <span>BACKEND ARCHITECT · DDD · SISTEMAS DISTRIBUIDOS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.06]">
              Entiendo un problema real de negocio y le doy una{" "}
              <span className="text-amber-500 underline decoration-zinc-700 decoration-2 underline-offset-8">
                solución de código que no se cae.
              </span>
            </h1>

            <div className="space-y-3 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
              <p>{profileData.manifesto[0]}</p>
              <p className="text-zinc-400 text-sm sm:text-base">
                {profileData.manifesto[1]}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                {profileData.manifesto[2]}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-[#111214] border border-zinc-800 flex items-start gap-3">
                <Layers className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-100 font-mono">
                    DDD & Clean Code
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Dominio puro desacoplado del framework
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111214] border border-zinc-800 flex items-start gap-3">
                <Database className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-100 font-mono">
                    Django · NestJS · Prisma
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    PostgreSQL, Redis, Docker & Zero N+1
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#111214] border border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-100 font-mono">
                    Open Source & IA
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    MCP servers, sandboxes Docker y RAG
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/casos"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-mono font-bold text-xs sm:text-sm text-zinc-950 bg-amber-500 hover:bg-amber-400 transition-colors"
              >
                <span>Explorar Casos Reales (Zona & Huevo de Oro)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/como-trabajo"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg font-mono text-xs sm:text-sm text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors"
              >
                <span>Cómo Trabajo (DDD, DB & Redis)</span>
              </Link>

              <div className="flex items-center gap-2">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: Tarjeta de identidad + Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-4 rounded-xl bg-[#111214] border border-zinc-800 flex items-center gap-4">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-16 h-16 rounded-lg object-cover border border-zinc-700 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-zinc-100 truncate">
                    {profileData.name}
                  </h2>
                  <span className="text-xs font-mono text-amber-500">
                    {profileData.handle}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Backend Developer · Sistemas Distribuidos · DDD & IA
                </p>
                <p className="text-[11px] font-mono text-zinc-400 mt-1">
                  📍 {profileData.location} · Del modelo de datos a producción
                </p>
              </div>
            </div>

            <TerminalSimulator />
          </motion.div>
        </div>

        {/* Métricas duras */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-zinc-800/80">
          {profileData.heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-xl bg-[#111214] border border-zinc-800/90"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-500">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-zinc-100 mt-1.5">
                {metric.label}
              </div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Navegación por secciones (1 ruta por página) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              RECORRIDO POR SECCIONES (UNA PÁGINA POR TEMA)
            </h2>
            <span className="text-xs font-mono text-amber-500">
              Seleccioná qué querés ver en detalle →
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {routeCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group p-5 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-amber-500">
                        {card.tag}
                      </span>
                      <Icon className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-amber-400 pt-2">
                    <span>Abrir sección</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
