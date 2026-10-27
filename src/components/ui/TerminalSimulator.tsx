"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Play } from "lucide-react";

interface TraceScenario {
  id: string;
  label: string;
  badge: string;
  command: string;
  steps: {
    tag: string;
    color: string;
    text: string;
    latency: string;
  }[];
  summary: string;
}

const scenarios: TraceScenario[] = [
  {
    id: "bitgote",
    label: "BitGoTe (Firewall IA en Go)",
    badge: "Go · age Vault · nftables · /dev/tty",
    command: "bitgote run -- claude (rotando env vars en Vercel)",
    steps: [
      {
        tag: "AGENT",
        color: "text-zinc-200",
        text: "POST api.vercel.com/v10/.../env con {{bitgote:sistemazona/prod/API_URL}}",
        latency: "1ms",
      },
      {
        tag: "POLICY",
        color: "text-amber-400",
        text: "bitgote.yaml (SHA-256 OK) · Host, método, ruta y anti-SSRF verificados",
        latency: "0ms",
      },
      {
        tag: "/dev/tty",
        color: "text-amber-400",
        text: "Aprobación humana en terminal: [s]í una vez → desencriptando vault.age",
        latency: "tty",
      },
      {
        tag: "PROXY",
        color: "text-emerald-400",
        text: "Secreto inyectado en tránsito y respuesta tapada con [BITGOTE:REDACTED] ✓",
        latency: "18ms",
      },
    ],
    summary: "El valor del secreto jamás entra al contexto del LLM ni sale del proceso",
  },
  {
    id: "zona",
    label: "Sistema Zona (OOH)",
    badge: "Django 5 + Redis + Channels",
    command: "POST /api/v1/budgets/482/approve",
    steps: [
      {
        tag: "DOMAIN",
        color: "text-amber-400",
        text: "Particionando presupuesto #482 por (unidad_negocio × tipo_trabajo)...",
        latency: "2ms",
      },
      {
        tag: "POSTGRES",
        color: "text-zinc-200",
        text: "TX ACID: 3 Órdenes de Trabajo creadas + reserva de stock + asiento IVA",
        latency: "9ms",
      },
      {
        tag: "REDIS",
        color: "text-amber-400",
        text: "PUB kanban.work_order_updated → canal WebSocket /ws/updates/ (sin polling)",
        latency: "1ms",
      },
      {
        tag: "ARCA/AFIP",
        color: "text-emerald-400",
        text: "Comprobante fiscal preparado y tablero de taller actualizado en vivo ✓",
        latency: "14ms",
      },
    ],
    summary: "Tráfico móvil reducido de 50 req/min a 2 req/min · 13 módulos activos",
  },
  {
    id: "huevo-oro",
    label: "Huevo de Oro (Mayorista)",
    badge: "Django + Expo QR + Ollama Local",
    command: "EXEC mayorista.dispatch_and_audit --qr=HD-9941",
    steps: [
      {
        tag: "EXPO APK",
        color: "text-amber-400",
        text: "Vendedor confirma pedido en calle → PDF con QR enviado por WhatsApp API",
        latency: "18ms",
      },
      {
        tag: "GALPÓN",
        color: "text-zinc-200",
        text: "Código QR HD-9941 validado en despacho → descuenta 15 cajones + 8 maples",
        latency: "6ms",
      },
      {
        tag: "OLLAMA",
        color: "text-amber-400",
        text: "Qwen 2.5 local traduce pregunta del dueño a SQL (100% on-premise, 0 cloud)",
        latency: "42ms",
      },
      {
        tag: "PG ROLE",
        color: "text-emerald-400",
        text: "Ejecutando consulta con rol 'ai_reader' (READ ONLY garantizado por motor DB) ✓",
        latency: "4ms",
      },
    ],
    summary: "Digitalización total del galpón · Cero papel · IA blindada por permisos SQL",
  },
  {
    id: "ddd-prisma",
    label: "NestJS + Prisma Guard",
    badge: "DDD + Anti N+1 (1 vs 20)",
    command: "pnpm --filter @api test:int matches.n1.spec.ts",
    steps: [
      {
        tag: "ESLINT",
        color: "text-amber-400",
        text: "Verificando fronteras: domain/ sin imports de @nestjs/* ni @prisma/client ✓",
        latency: "0ms",
      },
      {
        tag: "SEED N=1",
        color: "text-zinc-200",
        text: "GET /api/v1/teams/t1/matches?limit=50 → prisma.$on('query') contó: 3 queries",
        latency: "11ms",
      },
      {
        tag: "SEED N=20",
        color: "text-zinc-200",
        text: "GET /api/v1/teams/t1/matches?limit=50 → prisma.$on('query') contó: 3 queries",
        latency: "13ms",
      },
      {
        tag: "ASSERT",
        color: "text-emerald-400",
        text: "expect(queriesWith20).toBe(queriesWith1) → PASS (Cero N+1 antes de producción)",
        latency: "1ms",
      },
    ],
    summary: "La cantidad de queries no crece con N · Paginación obligatoria con Zod",
  },
];

export default function TerminalSimulator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = scenarios[activeIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % scenarios.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#111214] shadow-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="ml-2 text-xs font-mono text-zinc-400">
            matias@prod-node:~ — architecture-trace
          </span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-amber-400 border border-zinc-700">
          {current.badge}
        </span>
      </div>

      <div className="px-3 pt-3 flex flex-wrap gap-1.5 border-b border-zinc-800/80 pb-3 bg-zinc-950/60">
        {scenarios.map((item, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800"
              }`}
            >
              <Play className={`w-3 h-3 ${isSelected ? "text-zinc-950" : "text-zinc-500"}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-5 font-mono text-xs sm:text-sm space-y-3 min-h-[260px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-zinc-200 bg-zinc-950 px-3.5 py-2.5 rounded-lg border border-zinc-800">
              <span className="text-amber-500 font-bold">$</span>
              <span className="truncate">{current.command}</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {current.steps.map((step, i) => (
                <motion.div
                  key={step.tag + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start justify-between gap-3 text-xs leading-relaxed"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-semibold shrink-0 ${step.color}`}
                    >
                      [{step.tag}]
                    </span>
                    <span className="text-zinc-300">{step.text}</span>
                  </div>
                  <span className="text-zinc-500 shrink-0">{step.latency}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            {current.summary}
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-zinc-500">
            <Activity className="w-3.5 h-3.5 text-amber-500" />
            Interactivo
          </span>
        </div>
      </div>
    </div>
  );
}
