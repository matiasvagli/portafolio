"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { readContactDraft, saveContactDraft } from "@/lib/contact/draft";
import { commercialMessageLimit } from "@/schemas/contact.schema";

export default function OrientationContact({ topic }: { topic: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(current => current || readContactDraft().slice(0, commercialMessageLimit));
  }, []);

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = message.trim();
    if (!draft) return;
    saveContactDraft(draft);
    const query = new URLSearchParams({ asunto: topic, borrador: "1" });
    router.push(`/contacto?${query}#contact-form`);
  }

  return (
    <form className="orientation-contact" onSubmit={continueToContact}>
      <div className="contact-field">
        <label htmlFor="orientation-message">Contame qué está pasando</label>
        <textarea id="orientation-message" name="mensaje" rows={5} required maxLength={commercialMessageLimit}
          value={message} onChange={event => { setMessage(event.target.value); saveContactDraft(event.target.value); }}
          placeholder="Por ejemplo, me llegan consultas por WhatsApp y algunas se pierden. Quiero poder seguirlas en un solo lugar."
          aria-describedby="orientation-next-step" />
      </div>
      <p className="contact-privacy" id="orientation-next-step">En el siguiente paso podés revisar tu mensaje y agregar tu nombre y email.</p>
      <button className="commercial-button" type="submit" disabled={!message.trim()}>
        Continuar al formulario <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
