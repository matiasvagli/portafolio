"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { z } from "zod";
import { commercialMessageLimit, contactFormSchema, contactTopics, type ContactFormInput } from "@/schemas/contact.schema";
import { profileData } from "@/data/profile";
import { firstContactUrl } from "@/lib/whatsapp";

const emptyForm: ContactFormInput = { nombre: "", email: "", empresa: "", tipoProyecto: "otro", mensaje: "" };

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

  function fieldError(name: keyof ContactFormInput) {
    const message = errors[name];
    return message && <p className="contact-field-error" id={`contact-${name}-error`}>{message}</p>;
  }

  function fieldAccessibility(name: keyof ContactFormInput) {
    return { "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `contact-${name}-error` : undefined };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || status === "sending") return;
    setErrors({});
    setStatus("idle");
    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const fields = Object.entries(parsed.error.flatten().fieldErrors);
      setErrors(Object.fromEntries(fields.map(([key, messages]) => [key, messages?.[0]])));
      const invalidField = event.currentTarget.elements.namedItem(fields[0][0]);
      if (invalidField instanceof HTMLElement) requestAnimationFrame(() => invalidField.focus());
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
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "sending"} className="contact-form">
      <h2>Mandame tu consulta</h2>
      <p>Dejame tu email y contame qué te gustaría resolver. Los campos con * son obligatorios.</p>
      {!available && <div role="status" className="contact-notice">Por ahora recibo consultas por <a href={firstContactUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> o <a href={`mailto:${profileData.email}`}>email</a>.</div>}
      <fieldset disabled={!available || status === "sending"}>
        <legend className="sr-only">Datos de tu consulta</legend>
        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="contact-name">Tu nombre *</label>
            <input id="contact-name" name="nombre" autoComplete="name" required maxLength={80} value={form.nombre} onChange={event => updateField("nombre", event.target.value)} {...fieldAccessibility("nombre")} />
            {fieldError("nombre")}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Tu email *</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={120} value={form.email} onChange={event => updateField("email", event.target.value)} {...fieldAccessibility("email")} />
            {fieldError("email")}
          </div>
        </div>
        <div className="contact-field">
          <label htmlFor="contact-company">Nombre de tu negocio (opcional)</label>
          <input id="contact-company" name="empresa" autoComplete="organization" maxLength={100} value={form.empresa ?? ""} onChange={event => updateField("empresa", event.target.value)} {...fieldAccessibility("empresa")} />
          {fieldError("empresa")}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-topic">Asunto (opcional)</label>
          <select id="contact-topic" name="asunto" value={form.asunto ?? ""} onChange={event => updateField("asunto", (event.target.value || undefined) as ContactFormInput["asunto"])} {...fieldAccessibility("asunto")}>
            <option value="">Elegí un tema</option>
            {contactTopics.map(topic => <option key={topic}>{topic}</option>)}
          </select>
          {fieldError("asunto")}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">¿Qué te gustaría resolver? *</label>
          <textarea id="contact-message" name="mensaje" required rows={5} minLength={15} maxLength={commercialMessageLimit} value={form.mensaje} onChange={event => updateField("mensaje", event.target.value)} placeholder="Por ejemplo, vendo por Instagram y quiero que mis clientes puedan armar el pedido antes de escribirme." {...fieldAccessibility("mensaje")} />
          {fieldError("mensaje")}
        </div>
        <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
        <p className="contact-privacy">Uso estos datos para responder tu consulta.</p>
        <button type="submit" disabled={!available || status === "sending"} className="commercial-button"><Send size={17} aria-hidden="true" />{status === "sending" ? "Enviando…" : "Enviar consulta"}</button>
      </fieldset>
      <div role="status">
        {status === "sent" && <div className="contact-notice contact-notice--success"><p><CheckCircle2 size={17} aria-hidden="true" /> Recibí tu consulta. Te respondo al email que me dejaste.</p></div>}
      </div>
      {status === "error" && <div role="alert" className="contact-notice contact-notice--error">
        <p><AlertCircle size={17} aria-hidden="true" /> El envío quedó sin confirmar. Tus datos siguen acá y podés volver a intentar.</p>
        <p>También podés escribirme por <a href={firstContactUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> o <a href={`mailto:${profileData.email}`}>email</a>.</p>
      </div>}
    </form>
  );
}
