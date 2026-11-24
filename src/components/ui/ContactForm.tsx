"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { z } from "zod";
import { commercialMessageLimit, contactFormSchema, contactGoals, contactStages, type ContactFormInput } from "@/schemas/contact.schema";
import { profileData } from "@/data/profile";
import { firstContactUrl } from "@/lib/whatsapp";
import { clearContactDraft, readContactDraft, saveContactDraft } from "@/lib/contact/draft";

const emptyForm: ContactFormInput = { nombre: "", email: "", empresa: "", tipoProyecto: "otro", mensaje: "" };

export default function ContactForm({ available, topic, loadDraft }: { available: boolean; topic?: ContactFormInput["asunto"]; loadDraft: boolean }) {
  const [form, setForm] = useState<ContactFormInput>(() => ({ ...emptyForm, asunto: topic }));
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [website, setWebsite] = useState("");
  const submissionId = useRef<string | null>(null);

  useEffect(() => {
    if (!loadDraft) return;
    const message = readContactDraft().slice(0, commercialMessageLimit);
    if (message) setForm(current => current.mensaje ? current : { ...current, mensaje: message });
  }, [loadDraft]);

  function updateField<Key extends keyof ContactFormInput>(key: Key, value: ContactFormInput[Key]) {
    if (loadDraft && key === "mensaje" && typeof value === "string") saveContactDraft(value);
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
      if (loadDraft) clearContactDraft();
      setStatus("sent");
      setForm(emptyForm);
      submissionId.current = null;
    } catch { setStatus("error"); }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"} className="contact-form">
      <h2>Mandame tu consulta</h2>
      <p>Dejame tu email y contame lo que tenés en mente. Los campos con * son obligatorios.</p>
      {!available && <div role="status" className="contact-notice">El envío desde este formulario está temporalmente deshabilitado. Podés escribirme por <a href={firstContactUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> o <a href={`mailto:${profileData.email}`}>email</a>.</div>}
      <fieldset disabled={status === "sending"}>
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
        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="contact-topic">¿En qué te ayudo? (opcional)</label>
            <select id="contact-topic" name="asunto" value={form.asunto ?? ""} onChange={event => updateField("asunto", (event.target.value || undefined) as ContactFormInput["asunto"])} {...fieldAccessibility("asunto")}>
              <option value="">Elegí si querés</option>
              {contactGoals.map(goal => <option key={goal}>{goal}</option>)}
            </select>
            {fieldError("asunto")}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-stage">¿En qué etapa estás? (opcional)</label>
            <select id="contact-stage" name="etapa" value={form.etapa ?? ""} onChange={event => updateField("etapa", (event.target.value || undefined) as ContactFormInput["etapa"])} {...fieldAccessibility("etapa")}>
              <option value="">Elegí si querés</option>
              {contactStages.map(stage => <option key={stage}>{stage}</option>)}
            </select>
            {fieldError("etapa")}
          </div>
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">Contame qué tenés en mente *</label>
          <textarea id="contact-message" name="mensaje" required rows={5} minLength={15} maxLength={commercialMessageLimit} value={form.mensaje} onChange={event => updateField("mensaje", event.target.value)} placeholder="Por ejemplo, tengo una idea para una app y quiero saber por dónde empezar." {...fieldAccessibility("mensaje")} />
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
