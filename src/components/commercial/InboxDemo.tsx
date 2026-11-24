"use client";

import { useState } from "react";
import { CheckCheck, Instagram, Mail, MessageCircle, AudioLines } from "lucide-react";

const chats = [
  { channel: "WhatsApp", Icon: MessageCircle, name: "Laura", question: "¿Cuánto sale la mesa para seis?", answer: "La de guatambú sale $319.000, Laura. Mide 180 × 90 cm y entran seis cómodos.", result: "Precio enviado" },
  { channel: "Instagram", Icon: Instagram, name: "Diego", question: "¿Llegan el viernes a Caballito?", answer: "Sí, Diego. El viernes pasamos por Caballito entre las 14 y las 18. El envío está incluido.", result: "Envío consultado" },
  { channel: "Email", Icon: Mail, name: "Ana", question: "¿Me guardás dos sillas de roble?", answer: "Listo, Ana. Te guardamos dos sillas de roble hasta mañana a las 18. Pasá por el local cuando quieras.", result: "Sillas reservadas" },
];

export default function InboxDemo() {
  const [selected, setSelected] = useState(0);
  const chat = chats[selected];
  return (
    <section className="agent-scene" aria-label="Demo de atención simultánea en una mueblería">
      <header className="scene-head"><span>Demo · Mueblería</span><time>10:42</time></header>
      <div className="agent-core"><AudioLines size={26} aria-hidden="true" /><strong>Tu agente</strong></div>
      <div className="channel-grid" role="group" aria-label="Elegí una consulta para leer la respuesta">
        {chats.map(({ channel, Icon, name, question, result }, index) => (
          <button key={channel} type="button" aria-pressed={selected === index} aria-controls="agent-response" onClick={() => setSelected(index)}>
            <span className="channel-name"><Icon size={16} aria-hidden="true" />{channel}</span>
            <strong>{name}</strong><span>{question}</span>
            <small><CheckCheck size={14} aria-hidden="true" />{result}</small>
          </button>
        ))}
      </div>
      <div className="agent-response" id="agent-response" aria-live="polite">
        <strong>Tu agente a {chat.name}</strong><p>{chat.answer}</p>
      </div>
    </section>
  );
}
