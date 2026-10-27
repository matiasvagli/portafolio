"use client";

import { Download, ArrowLeft, Mail, Phone, Github, Linkedin } from "lucide-react";
import { profileData } from "@/data/profile";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Barra de acciones (oculta al imprimir) */}
        <div className="flex items-center justify-between print:hidden bg-zinc-900/80 border border-white/10 rounded-2xl p-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al portafolio</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold bg-emerald-400 text-zinc-950 hover:opacity-95"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>

        {/* Hoja de CV */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-8 print:bg-white print:border-none print:rounded-none print:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-white/10 print:border-zinc-300 pb-6">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-24 h-24 rounded-2xl object-cover border border-white/20"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white print:text-black">
                  {profileData.name}
                </h1>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 print:border-zinc-400 print:text-zinc-800">
                  42 años · Backend & Sistemas
                </span>
              </div>
              <p className="text-violet-300 print:text-zinc-700 font-medium">
                Backend Architect · Python (Django / FastAPI) · TypeScript (NestJS / Prisma) · DDD & IA Aplicada
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 print:text-zinc-600 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {profileData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {profileData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> github.com/matiasvagli
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </span>
              </div>
            </div>
          </div>

          {/* Perfil */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-black font-bold">
              Perfil Profesional
            </h2>
            <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              Desarrollador Backend y Arquitecto de Sistemas especializado en transformar
              problemas complejos de negocio en software robusto, mantenible y escalable.
              Diseño con Domain-Driven Design (DDD), Clean Architecture y patrón
              Repository, garantizando consistencia transaccional (Saga, Outbox,
              idempotencia a nivel PostgreSQL) y performance verificada automáticamente
              (tests anti N+1 1 vs. N y caché/WebSockets con Redis). Creador de
              herramientas open source para auditoría de agentes IA (MCP servers),
              pipelines RAG y generadores de arquitectura.
            </p>
          </section>

          {/* Casos de Éxito y Experiencia */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-black font-bold">
              Sistemas en Producción Destacados
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 print:border-zinc-300 space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white print:text-black">
                    Sistema Zona — ERP Integral de Publicidad Exterior (OOH)
                  </h3>
                  <span className="text-xs font-mono text-violet-300 print:text-zinc-600">
                    Django 5 · DRF · Channels · Redis · PostgreSQL · Next.js
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
                  Arquitectura y desarrollo de 13 módulos de negocio (+65 modelos de
                  datos, 188 migraciones): conversión automática de presupuestos a
                  múltiples Órdenes de Trabajo por unidad de negocio y tipo de trabajo,
                  Kanban en tiempo real con WebSockets/Redis (reduciendo el tráfico móvil
                  un 94%), facturación electrónica ARCA, control de flujo de caja e IVA.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 print:border-zinc-300 space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white print:text-black">
                    Huevo de Oro — ERP/CRM Mayorista + App Móvil + IA Local
                  </h3>
                  <span className="text-xs font-mono text-amber-300 print:text-zinc-600">
                    Django 5 · React Native (Expo) · PostgreSQL · Ollama · Docker
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
                  Digitalización de punta a punta de distribuidora mayorista: control de
                  stock multidimensional, arqueo de caja por turnos, liquidación de
                  comisiones, App Móvil con validación de despacho por código QR y tickets
                  PDF por WhatsApp, más asistente Text-to-SQL local (Ollama Qwen 2.5) con
                  usuario de base de datos de solo lectura (ai_reader).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 print:border-zinc-300 space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-white print:text-black">
                    Arquitecturas DDD en TypeScript & Sistemas Distribuidos
                  </h3>
                  <span className="text-xs font-mono text-emerald-300 print:text-zinc-600">
                    NestJS · Prisma · TypeORM · RabbitMQ · Redis · Zod
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
                  Desarrollo de plataformas modulares (Futboliga, Wallet System v2) con
                  separación estricta de capas forzada por ESLint, tests automáticos 1 vs
                  N contra N+1 queries en Prisma, dinero en centavos enteros y patrón Saga
                  con compensaciones e idempotencia en base de datos.
                </p>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-black font-bold">
              Herramientas Open Source Creadas
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300 print:text-zinc-800">
              <li className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-zinc-300 sm:col-span-2">
                <strong>BitGoTe (Go):</strong> Firewall local y custodio de secretos en
                tránsito para agentes de IA (bóveda age, proxy TLS con inyección y
                redacción [BITGOTE:REDACTED], aislamiento por usuario en Linux con
                nftables y aprobación humana en /dev/tty).
              </li>
              <li className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-zinc-300">
                <strong>SkillAudit:</strong> Sandbox en Docker con honeypots y strace para
                auditar comportamiento real de MCP servers.
              </li>
              <li className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-zinc-300">
                <strong>ragkit:</strong> Pipeline de ingesta RAG autoconfigurable para
                NestJS/Node.js con adapters intercambiables.
              </li>
              <li className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-zinc-300">
                <strong>Team Context MCP Server:</strong> Memoria técnica persistente y
                compartida (SQLite + embeddings locales) para equipos.
              </li>
              <li className="p-3 rounded-xl bg-white/[0.02] border border-white/10 print:border-zinc-300">
                <strong>CRUDFULL:</strong> Generador CLI en Python para FastAPI con
                arquitectura limpia en SQLAlchemy Async y MongoDB.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
