import { Bot, Check, Clock3, Database, MessageCircle, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDemoPrice, totePrice, toteStock } from "@/data/commercial-demo";
import "../support-agent-demo.css";

const totalQueries = 2400;
const batchSize = 300;
const formatCount = new Intl.NumberFormat("es-AR").format;
const conversations = [
  {
    name: "Lucía", topic: "Precios", source: "Catálogo de productos", replyAt: 127,
    turns: [{
      question: "¡Hola! ¿Cuánto sale el bolso de lona azul?",
      answer: `¡Hola, Lucía! El bolso azul cuesta ${formatDemoPrice(totePrice)}. Hay ${toteStock.Azul} disponibles.`,
    }],
  },
  {
    name: "Martín", topic: "Horarios", source: "Horarios de atención", replyAt: 654,
    turns: [{
      question: "¿Puedo pasar a retirar mi compra el sábado?",
      answer: "Sí, Martín. Los sábados podés retirar de 10 a 14 h. De lunes a viernes atendemos de 9 a 18 h.",
    }],
  },
  {
    name: "Valentina", topic: "Stock", source: "Inventario de la tienda", replyAt: 1646,
    turns: [{
      question: "¿Tenés tres bolsos color arena?",
      answer: `Sí, Valentina. Hay ${toteStock.Arena} en color arena, así que podés pedir los tres.`,
    }],
  },
  {
    name: "Nicolás", topic: "Contexto", source: "Historial de la conversación y catálogo", replyAt: 2011,
    turns: [
      { question: "Busco un bolso azul. ¿Qué precio tiene?", answer: `El bolso de lona azul cuesta ${formatDemoPrice(totePrice)}.` },
      { question: "¿Y si llevo dos?", answer: `Dos bolsos de lona azules te quedan en ${formatDemoPrice(totePrice * 2)} en total, Nicolás. Tenemos stock para ambos.` },
    ],
  },
];

export default function SupportAgentDemo() {
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState<number | null>(null);
  const resolved = progress ?? 0;
  const finished = progress === totalQueries;
  const running = progress !== null && !finished;
  const conversation = conversations[selected];
  const showReply = progress === null || resolved >= conversation.replyAt;
  const ActionIcon = finished ? RotateCcw : Play;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setProgress(Math.min(resolved + batchSize, totalQueries)), 390);
    return () => window.clearTimeout(timer);
  }, [resolved, running]);

  return (
    <div className="demo-window support-preview">
      <div className="preview-app-bar">
        <span><MessageCircle size={17} aria-hidden="true" /> Atención por WhatsApp</span>
        <span>Taller Lona · Simulación</span>
      </div>

      <div className="support-overview">
        <div className="support-agent">
          <span className="support-agent-icon"><Bot size={23} aria-hidden="true" /></span>
          <div>
            <h4>Un agente de atención</h4>
            <p role="status">{finished ? "Simulación completada" : running ? "Respondiendo consultas en paralelo" : "Listo para atender"}</p>
          </div>
        </div>
        <button className="preview-primary" type="button" aria-disabled={running} onClick={() => { if (!running) setProgress(0); }}>
          <ActionIcon size={16} aria-hidden="true" />
          {finished ? "Volver a simular" : running ? "Simulando consultas…" : `Simular ${formatCount(totalQueries)} consultas`}
        </button>
        <div className="support-progress">
          <p>{formatCount(resolved)} <span>de {formatCount(totalQueries)} consultas simuladas respondidas</span></p>
          <progress value={resolved} max={totalQueries} aria-label="Consultas simuladas respondidas" />
        </div>
      </div>

      <div className="support-workspace">
        <div className="support-inbox" role="group" aria-label="Conversaciones de ejemplo">
          {conversations.map(({ name, topic, replyAt }, index) => {
            const answered = resolved >= replyAt;
            const StatusIcon = answered ? Check : Clock3;
            return (
              <button key={name} type="button" aria-pressed={selected === index} aria-controls="support-conversation" onClick={() => setSelected(index)}>
                <span className="support-avatar" aria-hidden="true">{name[0]}</span>
                <span className="support-contact"><strong>{name}</strong><small>{topic}</small></span>
                {progress !== null && <StatusIcon className="support-chat-status" data-answered={answered} size={16} role="img" aria-label={answered ? "Respondida" : "En cola"} />}
              </button>
            );
          })}
        </div>

        <section className="support-chat" id="support-conversation" aria-labelledby="support-chat-title">
          <header><h5 id="support-chat-title">Chat con {conversation.name}</h5><span>{conversation.topic}</span></header>
          <div className="support-messages" aria-live="polite">
            {conversation.turns.map(({ question, answer }, index) => (
              <div key={question} className="support-turn">
                <p className="support-message support-message--customer"><strong>{conversation.name}</strong>{question}</p>
                {showReply || index < conversation.turns.length - 1 ? (
                  <p className="support-message support-message--agent"><strong>Agente de Taller Lona</strong>{answer}</p>
                ) : <p className="support-waiting"><Clock3 size={15} aria-hidden="true" /> Consulta en cola</p>}
              </div>
            ))}
          </div>
          {showReply && <p className="support-source"><Database size={14} aria-hidden="true" /> {conversation.source}</p>}
        </section>
      </div>
    </div>
  );
}
