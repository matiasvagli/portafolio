import { ArrowRight, Check, CircleCheck, MapPin, MessageCircle, Package, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";
import ShipmentMap from "./ShipmentMap";
import "../shipment-demo.css";

const stages = [
  {
    label: "En preparación", time: "09:10", Icon: Package,
    routeIndex: 0, location: "Depósito en CABA",
    message: "Hola, Sofi. Recibimos tu pedido #1042 y ya lo estamos preparando.",
    action: "Simular despacho",
  },
  {
    label: "Despachado", time: "10:25", Icon: Truck,
    routeIndex: 3, location: "En tránsito hacia La Plata",
    message: "Tu pedido #1042 salió del depósito. Te avisamos cuando esté en reparto.",
    action: "Simular salida a reparto",
  },
  {
    label: "En reparto", time: "13:40", Icon: MapPin,
    routeIndex: 7, location: "Zona de entrega en La Plata",
    message: "Tu pedido #1042 está en camino a tu domicilio. La entrega está prevista para hoy, entre las 14 y las 18 h.",
    action: "Simular entrega",
  },
  {
    label: "Entregado", time: "15:12", Icon: CircleCheck,
    routeIndex: 9, location: "Entregado en destino · La Plata",
    message: "Entregamos tu pedido #1042 a las 15:12. ¡Gracias por tu compra, Sofi!",
    action: "Reiniciar demo",
  },
];

export default function ShipmentDemo() {
  const [stageIndex, setStageIndex] = useState(0);
  const current = stages[stageIndex];
  const delivered = stageIndex === stages.length - 1;
  const ActionIcon = delivered ? RotateCcw : ArrowRight;

  return (
    <div className="demo-window shipment-preview">
      <div className="preview-app-bar">
        <span><Truck size={17} aria-hidden="true" /> Seguimiento de envíos</span>
        <span>Simulación</span>
      </div>
      <div className="shipment-body">
        <section className="shipment-card" aria-labelledby="shipment-order-title">
          <div className="shipment-order">
            <div>
              <h4 id="shipment-order-title">Pedido #1042</h4>
              <p>CABA <ArrowRight size={12} aria-hidden="true" /> La Plata</p>
            </div>
            <span className="shipment-state" data-delivered={delivered}>{current.label}</span>
          </div>
          <ShipmentMap routeIndex={current.routeIndex} location={current.location} Icon={current.Icon} delivered={delivered} />
          <button className="preview-primary shipment-next" type="button" onClick={() => setStageIndex(delivered ? 0 : stageIndex + 1)}>
            {current.action} <ActionIcon size={16} aria-hidden="true" />
          </button>
        </section>

        <div className="shipment-details">
          <section className="shipment-card" aria-labelledby="shipment-history-title">
            <h4 id="shipment-history-title" className="shipment-history-title">Historial del envío</h4>
            <ol className="shipment-timeline" aria-labelledby="shipment-history-title" role="list">
              {stages.map(({ label, time, Icon }, index) => {
                const reached = index <= stageIndex;
                const StageIcon = index < stageIndex ? Check : Icon;
                return (
                  <li key={label} data-reached={reached} aria-current={index === stageIndex ? "step" : undefined}>
                    <span className="shipment-step-icon"><StageIcon size={15} aria-hidden="true" /></span>
                    <strong>{label}</strong>
                    {reached ? <time dateTime={time}>{time}</time> : <span className="shipment-pending">Pendiente</span>}
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="shipment-card shipment-notification" aria-labelledby="shipment-message-title">
            <div className="shipment-notification-title">
              <MessageCircle size={19} aria-hidden="true" />
              <div><h4 id="shipment-message-title">Aviso por WhatsApp</h4><p>Vista previa para el cliente</p></div>
            </div>
            <div className="shipment-message" role="status" aria-atomic="true">
              <span className="sr-only">Ubicación simulada: {current.location}.</span>
              <p>{current.message}</p>
              <time dateTime={current.time}>{current.time}</time>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
