import Image from "next/image";
import { House, MapPin, MessageCircle, PaintRoller } from "lucide-react";
import { useState } from "react";

const services = [
  { name: "Pintura interior", detail: "Paredes, cielorrasos y terminaciones.", Icon: PaintRoller },
  { name: "Pintura exterior", detail: "Fachadas, balcones y patios.", Icon: House },
];

export default function ServicesDemo() {
  const [service, setService] = useState(services[0].name);
  const [preview, setPreview] = useState(false);

  return (
    <div className="demo-window paint-preview">
      <div className="preview-app-bar">
        <span><PaintRoller size={17} aria-hidden="true" /> Brocha Sur</span>
        <span><MapPin size={14} aria-hidden="true" /> CABA y alrededores</span>
      </div>
      <div className="paint-hero">
        <div className="preview-intro">
          <h4>Pintura para renovar tu casa</h4>
          <p>Renová un ambiente o la fachada. Contanos qué querés pintar y coordinamos una visita.</p>
        </div>
        <div className="preview-photo">
          <Image src="/comercial/pintura-interior.webp" alt="Living con una pared terracota recién pintada" width={1050} height={700} />
        </div>
      </div>
      <form className="paint-contact" onSubmit={event => { event.preventDefault(); setPreview(true); }}>
        <fieldset className="paint-services">
          <legend>Elegí un servicio</legend>
          <div>
            {services.map(({ name, detail, Icon }) => (
              <label key={name}>
                <input type="radio" name="pintura-servicio" value={name} checked={service === name} onChange={() => setService(name)} />
                <span><Icon size={19} aria-hidden="true" /><span><strong>{name}</strong><small>{detail}</small></span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="preview-primary"><MessageCircle size={16} aria-hidden="true" /> Ver cómo llega la consulta</button>
        <div aria-live="polite">
          {preview && <p className="demo-message"><strong>Borrador de WhatsApp</strong> Hola, quería consultar por {service.toLowerCase()}. ¿Podemos coordinar un presupuesto?</p>}
        </div>
      </form>
    </div>
  );
}
