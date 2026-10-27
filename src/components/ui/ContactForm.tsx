"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { z } from "zod";
import { contactFormSchema, type ContactFormInput } from "@/schemas/contact.schema";
import { profileData } from "@/data/profile";

const emptyForm: ContactFormInput = { nombre: "", email: "", empresa: "", tipoProyecto: "arquitectura-backend", mensaje: "" };
const inputClass = "w-full min-w-0 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 disabled:opacity-60";

export default function ContactForm({ available }: { available: boolean }) {
  const [form, setForm] = useState<ContactFormInput>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [website, setWebsite] = useState("");
  const submissionId = useRef<string | null>(null);

  function updateField<Key extends keyof ContactFormInput>(key: Key, value: ContactFormInput[Key]) {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
    setStatus("idle");
    submissionId.current = null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || status === "sending") return;
    setErrors({});
    setStatus("idle");
    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fields).map(([key, messages]) => [key, messages?.[0]])));
      return;
    }
    submissionId.current ??= crypto.randomUUID();
    const currentId = submissionId.current;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submissionId: currentId, website }),
        signal: AbortSignal.timeout(20000),
      });
      const result: unknown = await response.json();
      const acknowledgment = z.object({ success: z.literal(true), data: z.object({ submissionId: z.literal(currentId) }) }).safeParse(result);
      if (!response.ok || !acknowledgment.success) { setStatus("error"); return; }
      setStatus("sent");
      setForm(emptyForm);
      submissionId.current = null;
    } catch { setStatus("error"); }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "sending"} className="min-w-0 rounded-2xl border border-zinc-800 bg-[#111214] p-5 sm:p-8">
      <h2 className="text-xl font-semibold">Hablemos de tu proyecto</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">Dejame los detalles y tu email para que pueda responderte.</p>
      {!available && <div role="status" className="mt-5 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-zinc-300">Por ahora recibo consultas por <a href={profileData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-amber-300 underline underline-offset-4">WhatsApp</a> o <a href={`mailto:${profileData.email}`} className="font-medium text-amber-300 underline underline-offset-4">email</a>. Podés escribirme directamente.</div>}
      <fieldset disabled={!available || status === "sending"} className="mt-6 min-w-0 space-y-5">
        <legend className="sr-only">Datos de tu consulta</legend>
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          <div className="min-w-0"><label htmlFor="contact-name" className="mb-2 block text-xs text-zinc-300">Tu nombre *</label><input id="contact-name" name="nombre" autoComplete="name" required maxLength={80} value={form.nombre} onChange={event => updateField("nombre", event.target.value)} placeholder="¿Cómo te llamás?" aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? "contact-name-error" : undefined} className={inputClass} />{errors.nombre && <p id="contact-name-error" className="mt-1.5 text-xs text-amber-300">{errors.nombre}</p>}</div>
          <div className="min-w-0"><label htmlFor="contact-email" className="mb-2 block text-xs text-zinc-300">Tu email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={120} value={form.email} onChange={event => updateField("email", event.target.value)} placeholder="vos@empresa.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} className={inputClass} />{errors.email && <p id="contact-email-error" className="mt-1.5 text-xs text-amber-300">{errors.email}</p>}</div>
        </div>
        <div className="min-w-0"><label htmlFor="contact-company" className="mb-2 block text-xs text-zinc-300">Empresa o equipo (opcional)</label><input id="contact-company" name="empresa" autoComplete="organization" maxLength={100} value={form.empresa ?? ""} onChange={event => updateField("empresa", event.target.value)} placeholder="Nombre de tu empresa" className={inputClass} />{errors.empresa && <p className="mt-1.5 text-xs text-amber-300">{errors.empresa}</p>}</div>
        <div className="min-w-0"><label htmlFor="contact-type" className="mb-2 block text-xs text-zinc-300">¿Qué necesitás resolver?</label><select id="contact-type" name="tipoProyecto" value={form.tipoProyecto} onChange={event => updateField("tipoProyecto", event.target.value as ContactFormInput["tipoProyecto"])} className={inputClass}><option value="arquitectura-backend">Backend o arquitectura</option><option value="erp-medida">Sistema o ERP a medida</option><option value="ia-mcp-rag">Integración de IA</option><option value="auditoria-optimizacion">Auditoría u optimización</option><option value="otro">Propuesta laboral u otro</option></select></div>
        <div><label htmlFor="contact-message" className="mb-2 block text-xs text-zinc-300">Contame el problema o contexto *</label><textarea id="contact-message" name="mensaje" required rows={5} minLength={15} maxLength={2000} value={form.mensaje} onChange={event => updateField("mensaje", event.target.value)} placeholder="¿Qué querés construir o qué se está trabando hoy?" aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? "contact-message-error" : undefined} className={inputClass} />{errors.mensaje && <p id="contact-message-error" className="mt-1.5 text-xs text-amber-300">{errors.mensaje}</p>}</div>
        <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
        <p className="text-xs leading-relaxed text-zinc-500">Uso estos datos únicamente para responder tu consulta.</p>
        <button type="submit" disabled={!available || status === "sending"} className="button-primary disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" />{status === "sending" ? "Enviando…" : "Enviar consulta"}</button>
      </fieldset>
      <div aria-live="polite" className="mt-4">
        {status === "sent" && <p className="flex items-start gap-2 text-sm text-emerald-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Tu consulta quedó guardada. Te respondo al email que dejaste.</p>}
        {status === "error" && <div role="alert" className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-4 text-sm leading-relaxed text-zinc-300"><p className="flex items-start gap-2"><AlertCircle className="mt-1 h-4 w-4 shrink-0 text-amber-300" />No pudimos confirmar el envío. Tus datos siguen acá para que puedas reintentar.</p><p className="mt-2">También podés <a href={profileData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300 underline underline-offset-4">escribirme por WhatsApp</a> o <a href={`mailto:${profileData.email}`} className="text-amber-300 underline underline-offset-4">email</a>.</p></div>}
      </div>
    </form>
  );
}
