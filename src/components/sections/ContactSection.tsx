"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import { contactFormSchema, type ContactFormInput } from "@/schemas/contact.schema";
import { profileData } from "@/data/profile";

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>({
    nombre: "",
    email: "",
    empresa: "",
    tipoProyecto: "arquitectura-backend",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        nombre: fieldErrors.nombre?.[0],
        email: fieldErrors.email?.[0],
        empresa: fieldErrors.empresa?.[0],
        mensaje: fieldErrors.mensaje?.[0],
      });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CONTACTO DIRECTO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-zinc-100 tracking-tight">
              ¿Tenés un problema complejo que necesita código serio?
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Disponible para liderar o construir backends desde cero, diseñar
              arquitecturas DDD, desarrollar ERPs a medida, auditar performance de bases
              de datos o integrar agentes de IA y servidores MCP en flujos reales.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={profileData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-amber-500/40 transition-colors"
              >
                <div>
                  <p className="text-xs font-mono text-amber-400">
                    RESPUESTA RÁPIDA · WHATSAPP
                  </p>
                  <p className="text-base font-bold text-zinc-100 mt-0.5">
                    {profileData.phone}
                  </p>
                </div>
                <span className="px-3.5 py-2 rounded-lg bg-amber-500 text-zinc-950 text-xs font-mono font-bold">
                  Escribir ahora
                </span>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-zinc-800 transition-colors"
              >
                <div>
                  <p className="text-xs font-mono text-zinc-400">EMAIL DIRECTO</p>
                  <p className="text-base font-bold text-zinc-100 mt-0.5">
                    {profileData.email}
                  </p>
                </div>
                <Mail className="w-5 h-5 text-amber-500" />
              </a>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-1.5 text-xs font-mono text-zinc-300"
                >
                  <Github className="w-4 h-4 text-zinc-100" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-1.5 text-xs font-mono text-zinc-300"
                >
                  <Linkedin className="w-4 h-4 text-amber-500" />
                  <span>LinkedIn</span>
                </a>
                <Link
                  href="/cv"
                  className="p-3.5 rounded-xl bg-[#111214] hover:bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-1.5 text-xs font-mono text-zinc-300"
                >
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>CV / PDF</span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-[#111214] border border-zinc-800 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">
                    Enviame los detalles del desafío
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Validado en cliente y servidor con Zod Schema
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-amber-400 border border-zinc-800">
                  POST /api/contact
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Ej. Martín Gómez"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                  {errors.nombre && (
                    <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Tu Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="martin@empresa.com"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    Empresa / Equipo (opcional)
                  </label>
                  <input
                    type="text"
                    value={form.empresa ?? ""}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Nombre de tu empresa o startup"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                    ¿Qué necesitás resolver?
                  </label>
                  <select
                    value={form.tipoProyecto}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tipoProyecto: e.target.value as ContactFormInput["tipoProyecto"],
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="arquitectura-backend">
                      Arquitectura Backend (Django / NestJS / Go)
                    </option>
                    <option value="erp-medida">
                      Sistema / ERP a Medida (como Zona o Huevo de Oro)
                    </option>
                    <option value="ia-mcp-rag">
                      IA Aplicada, MCP Servers & Pipelines RAG
                    </option>
                    <option value="auditoria-optimizacion">
                      Optimización SQL, N+1, Redis & Seguridad
                    </option>
                    <option value="otro">Propuesta Laboral / Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Contame el problema o contexto *
                </label>
                <textarea
                  rows={4}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Contame qué están construyendo, qué cuello de botella tienen hoy o qué rol buscan cubrir..."
                  className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
                {errors.mensaje && (
                  <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.mensaje}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono font-bold text-xs sm:text-sm text-zinc-950 bg-amber-500 hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === "sending" ? "Validando y enviando..." : "Enviar Mensaje"}
                  </span>
                </button>

                {status === "sent" && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      ¡Recibido! También podés abrir WhatsApp directo para charlar ya.
                    </span>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
