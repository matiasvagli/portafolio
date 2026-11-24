import Image from "next/image";
import { Hammer, ImagePlus, Mail } from "lucide-react";
import { useState } from "react";

export default function QuoteDemo() {
  const [measure, setMeasure] = useState("140 × 80 cm");
  const [material, setMaterial] = useState("Guatambú");
  const [photo, setPhoto] = useState(false);
  const [preview, setPreview] = useState<{ measure: string; material: string; photo: boolean }>();

  return (
    <div className="demo-window quote-preview">
      <div className="preview-app-bar"><span><Hammer size={17} aria-hidden="true" /> Taller Veta</span><span>Carpintería a medida</span></div>
      <div className="preview-split">
        <div className="preview-feature">
          <div className="preview-photo">
            <Image src="/comercial/mesa-de-madera.webp" alt="Mesa de comedor de madera con bordes redondeados" width={1080} height={720} />
          </div>
          <div className="preview-intro">
            <h4>Una mesa para tu espacio</h4>
            <p>Elegí las medidas y la madera. Si ya tenés una idea, sumá una foto de referencia.</p>
          </div>
        </div>
        <form className="preview-card demo-stack" onSubmit={event => {
          event.preventDefault();
          setPreview({ measure, material, photo });
        }}>
          <h5>Pedí tu presupuesto</h5>
          <label className="demo-field">Medidas<input required maxLength={40} value={measure} onChange={event => setMeasure(event.target.value)} /></label>
          <label className="demo-field">Material
            <select value={material} onChange={event => setMaterial(event.target.value)}>
              <option>Guatambú</option><option>Roble</option><option>A definir</option>
            </select>
          </label>
          <label className="demo-checkbox"><input type="checkbox" checked={photo} onChange={event => setPhoto(event.target.checked)} /><ImagePlus size={17} aria-hidden="true" /> Adjuntar foto de muestra</label>
          <button type="submit" className="preview-primary"><Mail size={17} aria-hidden="true" /> Ver email de ejemplo</button>
          <div aria-live="polite">
            {preview && <div className="demo-message">
              <strong>Nueva solicitud de presupuesto</strong>
              <p>Mesa de madera · {preview.measure} · {preview.material}</p>
              {preview.photo && <p>Adjunto de ejemplo: mesa-referencia.jpg</p>}
            </div>}
          </div>
        </form>
      </div>
    </div>
  );
}
