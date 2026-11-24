import Image from "next/image";
import { MessageCircle, PackageCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatDemoPrice, totePrice, toteStock } from "@/data/commercial-demo";

export default function WhatsAppSalesDemo() {
  const [quantity, setQuantity] = useState("1");
  const [orderQuantity, setOrderQuantity] = useState<string>();

  return (
    <div className="demo-window whatsapp-preview">
      <div className="preview-app-bar"><span><ShoppingBag size={17} aria-hidden="true" /> Tienda de ejemplo</span><span>Pedidos por WhatsApp</span></div>
      <div className="preview-split">
        <form className="preview-feature" onSubmit={event => { event.preventDefault(); setOrderQuantity(quantity); }}>
          <div className="preview-photo">
            <Image src="/comercial/bolsos-de-lona.webp" alt="Bolsos de lona en azul y arena" width={960} height={640} />
          </div>
          <div className="preview-intro demo-stack">
            <div>
              <h4>Bolso azul</h4>
              <p>{formatDemoPrice(totePrice)} · {toteStock.Azul} disponibles</p>
            </div>
            <label className="demo-field">Cantidad
              <select value={quantity} onChange={event => setQuantity(event.target.value)}>
                {Array.from({ length: toteStock.Azul }, (_, index) => index + 1).map(units => (
                  <option key={units} value={units}>{units} {units === 1 ? "unidad" : "unidades"}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="preview-primary"><MessageCircle size={17} aria-hidden="true" /> Simular pedido por WhatsApp</button>
          </div>
        </form>
        <section className="preview-chat" aria-label="Conversación de venta">
          <h5><MessageCircle size={17} aria-hidden="true" /> WhatsApp de la tienda</h5>
          <div className="preview-chat-body" aria-live="polite">
            {orderQuantity ? <>
              <p className="demo-message demo-message--customer"><strong>Cliente</strong> Hola, quiero pedir {orderQuantity} × bolso azul. ¿Puedo retirar?</p>
              <p className="demo-message"><strong>Agente de ventas</strong> Sí, hay stock. El total es {formatDemoPrice(Number(orderQuantity) * totePrice)}. Te dejé el pedido armado para coordinar el retiro.</p>
              <p className="preview-confirmation"><PackageCheck size={16} aria-hidden="true" /> Pedido de ejemplo registrado · Pendiente de confirmación</p>
            </> : <p className="demo-message"><strong>Agente de ventas</strong> ¡Hola! Tenemos bolsos azules en stock. ¿Cuántos querés pedir?</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
