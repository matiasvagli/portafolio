import { Bot, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function RepliesDemo() {
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");

  return (
    <div className="demo-window replies-preview">
      <div className="preview-app-bar"><span><Bot size={17} aria-hidden="true" /> Atención del comercio</span></div>
      <div className="preview-split">
        <div className="preview-intro replies-intro">
          <h4>Respuestas para tus clientes</h4>
          <p>Probá una consulta por horarios o mirá el email que recibe un cliente después de pedir un presupuesto.</p>
          <div className="demo-switches" role="group" aria-label="Canal del ejemplo">
            <button type="button" aria-pressed={channel === "whatsapp"} onClick={() => setChannel("whatsapp")}><MessageCircle size={16} aria-hidden="true" /> WhatsApp</button>
            <button type="button" aria-pressed={channel === "email"} onClick={() => setChannel("email")}><Mail size={16} aria-hidden="true" /> Email</button>
          </div>
        </div>
        <div aria-live="polite">
          {channel === "whatsapp" ? <section className="preview-chat" aria-label="Conversación de atención">
            <h5><MessageCircle size={17} aria-hidden="true" /> WhatsApp del local</h5>
            <div className="preview-chat-body">
              <p className="demo-message demo-message--customer"><strong>Cliente</strong> ¿Hasta qué hora puedo retirar?</p>
              <p className="demo-message"><strong>Asistente</strong> Podés retirar hasta las 18 h, de lunes a viernes.</p>
              <p className="demo-message demo-message--customer"><strong>Cliente</strong> ¿Mi pedido ya está listo?</p>
              <p className="demo-message"><strong>Asistente</strong> ¿Querés que te pase con alguien del local para que lo revise?</p>
            </div>
          </section> : <section className="preview-card preview-email" aria-label="Email de confirmación">
            <p><Mail size={17} aria-hidden="true" /> Confirmación automática</p>
            <h5>Recibimos tu solicitud de presupuesto</h5>
            <p>Hola, Ana.</p>
            <p>Ya tenemos tus medidas y la foto. Te respondemos por este mismo email cuando revisemos el pedido.</p>
          </section>}
        </div>
      </div>
    </div>
  );
}
