"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, Boxes, CircleDollarSign, ClipboardList, MessageSquare, ShoppingBag, Sparkles, UsersRound, Workflow } from "lucide-react";
import "./business-flow.css";

const areas = [
  { name: "Ventas", Icon: ShoppingBag, input: "Pedido confirmado", output: "Reserva de stock y aviso a administración", detail: "El pedido se registra una vez. Inventario y administración reciben los mismos datos." },
  { name: "Clientes", Icon: UsersRound, input: "Consulta nueva", output: "Ficha y seguimiento", detail: "La consulta se suma al historial del cliente y deja una próxima acción para el equipo." },
  { name: "Administración", Icon: ClipboardList, input: "Pedido listo para facturar", output: "Comprobante y vencimiento", detail: "Administración usa los datos de la venta para preparar el comprobante y registrar la fecha de cobro." },
  { name: "Cobranzas", Icon: CircleDollarSign, input: "Pago registrado", output: "Cuenta al día y saldo actualizado", detail: "El pago se vincula con el comprobante. El equipo ve el saldo al consultar la cuenta." },
  { name: "Inventario", Icon: Boxes, input: "Salida de producto", output: "Stock actualizado y alerta de reposición", detail: "El movimiento actualiza las existencias. Si quedan pocas unidades, se genera una alerta." },
  { name: "Inteligencia artificial", Icon: Sparkles, input: "Consultas y datos aprobados", output: "Borradores para revisar", detail: "Un asistente prepara respuestas con el catálogo vigente y deriva las consultas que requieren intervención." },
  { name: "Automatizaciones", Icon: Workflow, input: "Pedido listo para retiro", output: "Aviso preparado en el canal elegido", detail: "Al cambiar el estado del pedido, el sistema activa el aviso con el horario y los datos de retiro." },
  { name: "Reportes", Icon: BarChart3, input: "Ventas, pagos e inventario", output: "Resumen para tomar decisiones", detail: "El tablero reúne ventas, cobranzas y productos bajos de stock desde los mismos registros." },
  { name: "Canales de comunicación", Icon: MessageSquare, input: "WhatsApp, email y formularios", output: "Bandeja de consultas organizada", detail: "Las consultas pasan a un solo flujo para que el equipo pueda asignarlas y seguirlas." },
];

export default function BusinessFlow() {
  const [selected, setSelected] = useState(0);
  const area = areas[selected];

  return (
    <section className="commercial-shell studio-section business-section" id="operacion" aria-labelledby="business-title">
      <header className="studio-heading">
        <p className="studio-kicker">Optimización de negocios</p>
        <h2 className="commercial-title" id="business-title">Tu negocio puede funcionar muchísimo mejor.</h2>
        <p>Conectá las herramientas que necesitás para que los datos y las tareas circulen entre áreas. Elegí un área para ver un ejemplo.</p>
      </header>
      <div className="business-board">
        <div className="business-controls" role="group" aria-label="Áreas conectadas del negocio">
          {areas.map(({ name, Icon }, index) => (
            <button type="button" key={name} aria-pressed={selected === index} aria-controls="business-flow" onClick={() => setSelected(index)}>
              <Icon size={19} aria-hidden="true" />{name}
            </button>
          ))}
        </div>
        <div className="business-flow" id="business-flow" aria-live="polite">
          <p className="business-flow-label">Flujo de ejemplo</p>
          <ol key={area.name} className="business-flow-route">
            <li><small>Entrada</small><strong>{area.input}</strong></li>
            <li><ArrowRight size={15} aria-hidden="true" /><div><small>Área conectada</small><strong>{area.name}</strong></div></li>
            <li><ArrowRight size={15} aria-hidden="true" /><div><small>Qué se actualiza</small><strong>{area.output}</strong></div></li>
          </ol>
          <p>{area.detail}</p>
        </div>
      </div>
      <ul className="business-benefits">
        {["Menos trabajo manual", "Mayor organización", "Menos errores", "Mejor seguimiento", "Mayor visibilidad", "Información centralizada", "Más tiempo para crecer"].map(item => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
