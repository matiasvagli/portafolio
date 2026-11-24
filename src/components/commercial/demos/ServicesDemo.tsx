import Image from "next/image";
import { ArrowDown, ArrowUpRight, House, MapPin, MessageCircle, PaintRoller, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

const services = [
  {
    name: "Pintura interior",
    shortName: "Interiores",
    detail: "Paredes, cielorrasos y terminaciones.",
    image: "/comercial/pintura-interior.webp",
    alt: "Living con una pared terracota y luz de la tarde",
    Icon: PaintRoller,
  },
  {
    name: "Pintura exterior",
    shortName: "Fachadas",
    detail: "Frentes, balcones y patios.",
    image: "/comercial/pintura-fachada.webp",
    alt: "Fachada ocre con puerta y postigos verdes",
    Icon: House,
  },
];

export default function ServicesDemo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [example, setExample] = useState(0);
  const [service, setService] = useState(0);
  const [detail, setDetail] = useState("");
  const [draft, setDraft] = useState("");
  const project = services[example];

  function openQuote(index: number) {
    setService(index);
    setDetail("");
    setDraft("");
    dialog.current?.showModal();
  }

  function previewQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `Hola, quería pedir un presupuesto de ${services[service].name.toLowerCase()}. ¿Podemos coordinar una visita?`;
    const notes = detail.trim();
    setDraft(notes ? `${message}\n\n${notes}` : message);
  }

  return (
    <div className="demo-window paint-preview">
      <header className="paint-header">
        <span className="paint-brand"><PaintRoller size={19} aria-hidden="true" /> Brocha Sur</span>
        <a href="#brocha-servicios">Servicios <ArrowDown size={14} aria-hidden="true" /></a>
      </header>

      <div className="paint-hero">
        <div className="paint-intro">
          <p className="paint-location"><MapPin size={15} aria-hidden="true" /> CABA y alrededores</p>
          <h4>Un nuevo color.<br /><em>Otra casa.</em></h4>
          <p className="paint-description">Renová tus ambientes o tu fachada. Te ayudamos a elegir el color y la terminación para cada espacio.</p>
          <button type="button" className="preview-primary" onClick={() => openQuote(example)}>
            Pedí un presupuesto <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="paint-project">
          <Image src={project.image} alt={project.alt} fill sizes="(min-width: 900px) 36vw, 90vw" />
          <div className="paint-project-picker" role="group" aria-label="Ejemplos de pintura">
            {services.map(({ shortName }, index) => (
              <button key={shortName} type="button" aria-pressed={example === index} onClick={() => setExample(index)}>{shortName}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="paint-services" id="brocha-servicios" aria-labelledby="brocha-servicios-title">
        <h5 id="brocha-servicios-title">¿Qué querés pintar?</h5>
        {services.map(({ name, detail, Icon }, index) => (
          <button key={name} type="button" className="paint-service" onClick={() => openQuote(index)}>
            <Icon size={20} aria-hidden="true" />
            <span><strong>{name}</strong><small>{detail}</small></span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </section>

      <dialog ref={dialog} className="paint-quote" aria-labelledby="brocha-presupuesto-title">
        <header>
          <h5 id="brocha-presupuesto-title">Pedí un presupuesto</h5>
          <button type="button" className="paint-close" aria-label="Cerrar presupuesto" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
        </header>
        <form className="paint-contact" onSubmit={previewQuote}>
          <label>Servicio
            <select value={service} onChange={event => { setService(Number(event.target.value)); setDraft(""); }}>
              {services.map(({ name }, index) => <option key={name} value={index}>{name}</option>)}
            </select>
          </label>
          <label>¿Qué querés pintar? <span>(opcional)</span>
            <textarea rows={3} maxLength={240} placeholder="Por ejemplo, las paredes del living" value={detail} onChange={event => { setDetail(event.target.value); setDraft(""); }} />
          </label>
          <button type="submit" className="preview-primary"><MessageCircle size={17} aria-hidden="true" /> Previsualizar consulta</button>
          <div role="status">
            {draft && <p className="paint-draft"><strong>Borrador de WhatsApp</strong>{draft}</p>}
          </div>
        </form>
      </dialog>
    </div>
  );
}
