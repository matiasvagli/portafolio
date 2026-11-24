import Image from "next/image";
import { ArrowRight, Bone, PawPrint, Scissors, Send, Stethoscope, Video } from "lucide-react";
import { Fragment, useRef, useState, type FormEvent } from "react";

const categories = [
  { name: "Veterinaria", detail: "Consultas en línea y controles de rutina.", Icon: Stethoscope, color: "mint" },
  { name: "Peluquería", detail: "Baño, corte y cepillado para perros.", Icon: Scissors, color: "lilac" },
  { name: "Alimento", detail: "Alimento seco, húmedo y snacks.", Icon: Bone, color: "sand" },
  { name: "Juguetes", detail: "Pelotas, mordillos y juegos para explorar.", Icon: PawPrint, color: "rose" },
];

export default function PetCareDemo() {
  const [screen, setScreen] = useState<"home" | "consultation">("home");
  const [category, setCategory] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const consultationHeading = useRef<HTMLHeadingElement>(null);

  function openConsultation() {
    setScreen("consultation");
    requestAnimationFrame(() => consultationHeading.current?.focus({ preventScroll: true }));
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessages(previous => [...previous, text]);
    setMessage("");
  }

  return (
    <div className="pet-demo" data-screen={screen}>
      <div className="pet-screen-selector" role="group" aria-label="Pantallas de Huella">
        <button type="button" aria-pressed={screen === "home"} onClick={() => setScreen("home")}>Inicio</button>
        <button type="button" aria-pressed={screen === "consultation"} onClick={() => setScreen("consultation")}>Consulta</button>
      </div>
      <div className="pet-phones">
        <section className="pet-phone pet-phone--home" aria-label="Inicio de Huella">
          <header className="pet-brand"><span><PawPrint size={19} aria-hidden="true" /></span> Huella</header>
          <div className="pet-home-content">
            <h4>Todo para tu mascota</h4>
            <button className="pet-consultation-link" type="button" onClick={openConsultation}>
              <Video size={21} aria-hidden="true" />
              <span><strong>Consultá a una veterinaria</strong><small>Iniciá una consulta en línea</small></span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <h5>Explorá servicios</h5>
            <div className="pet-categories" role="group" aria-label="Categorías de Huella">
              {categories.map(({ name, color, Icon }, index) => (
                <button key={name} type="button" data-color={color} aria-pressed={category === index} onClick={() => setCategory(index)}>
                  <Icon size={18} aria-hidden="true" />{name}
                </button>
              ))}
            </div>
            <p className="pet-category-detail" role="status">{categories[category].detail}</p>
          </div>
        </section>

        <section className="pet-phone pet-phone--consultation" aria-labelledby="huella-consulta-title">
          <header className="pet-appointment">
            <span className="pet-appointment-icon"><Video size={20} aria-hidden="true" /></span>
            <div><h4 ref={consultationHeading} id="huella-consulta-title" tabIndex={-1}>Consulta con Lucía</h4><p>Veterinaria · Consulta de ejemplo</p></div>
          </header>
          <div className="pet-appointment-content">
            <div className="pet-video">
              <Image src="/comercial/huella-veterinaria.webp" alt="Una veterinaria con un perro en el consultorio" fill sizes="310px" />
            </div>
            <div className="pet-chat" role="log" aria-label="Mensajes de la consulta">
              <p className="pet-chat-incoming"><strong>Lucía</strong>Hola, ¿cómo se llama tu mascota?</p>
              {messages.map((text, index) => (
                <Fragment key={index}>
                  <p className="pet-chat-outgoing"><strong>Vos</strong>{text}</p>
                  {index === 0 && <p className="pet-chat-incoming"><strong>Lucía</strong>Gracias. Contame qué te gustaría revisar en la consulta.</p>}
                </Fragment>
              ))}
            </div>
            <form className="pet-chat-form" onSubmit={sendMessage}>
              <input aria-label="Mensaje para la consulta de ejemplo" placeholder="Escribí un mensaje" maxLength={220} value={message} onChange={event => setMessage(event.target.value)} />
              <button type="submit" aria-label="Enviar mensaje de prueba" disabled={!message.trim()}><Send size={17} aria-hidden="true" /></button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
