"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ArrowRight, Bot, ChevronDown, ClipboardList, Globe, MessageCircle, ReceiptText, Ruler, ShoppingCart } from "lucide-react";
import { whatsappDraft } from "@/lib/whatsapp";
import CartDemo from "./demos/CartDemo";
import BillingDemo from "./demos/BillingDemo";
import OrdersDemo from "./demos/OrdersDemo";
import QuoteDemo from "./demos/QuoteDemo";
import RepliesDemo from "./demos/RepliesDemo";
import ServicesDemo from "./demos/ServicesDemo";
import WhatsAppSalesDemo from "./demos/WhatsAppSalesDemo";

const solutions = [
  {
    id: "web", label: "Quiero que me encuentren y me consulten", Icon: Globe, Demo: ServicesDemo,
    delivery: "Una web para que te encuentren y sepan qué pedirte",
    detail: "Armo una página con tus servicios, la zona donde trabajás y fotos. Quien entra puede elegir un servicio y abrir WhatsApp con la consulta lista para editar.",
    example: "Consulta por un servicio",
    draft: "Hola, Matías. Me interesa una web para mostrar mis servicios y recibir consultas.",
  },
  {
    id: "presupuesto", label: "Vendo a medida", Icon: Ruler, Demo: QuoteDemo,
    delivery: "Un formulario que te trae los datos para cotizar",
    detail: "Pido lo que necesitás para presupuestar, como medidas, material y una foto. A vos te llega un email ordenado con todo lo que mandó esa persona.",
    example: "Formulario de presupuesto",
    draft: "Hola, Matías. Vendo a medida y me interesa el formulario de presupuesto.",
  },
  {
    id: "carrito", label: "Quiero vender con carrito", Icon: ShoppingCart, Demo: CartDemo,
    delivery: "Un catálogo donde tus clientes arman el pedido",
    detail: "Cargo las variantes de cada producto y dejo que el cliente elija cantidades y revise el total. Acordamos cómo cobrar y entregar según cómo trabajás hoy.",
    example: "Ficha de producto y carrito",
    draft: "Hola, Matías. Me interesa un catálogo con carrito para recibir pedidos de mi negocio.",
  },
  {
    id: "ventas-whatsapp", label: "Quiero vender por WhatsApp", Icon: MessageCircle, Demo: WhatsAppSalesDemo,
    delivery: "De la charla al pedido, en el mismo canal",
    detail: "Conecto tu catálogo con WhatsApp para que el cliente consulte disponibilidad, elija una variante y deje el pedido armado. Vos lo recibís en tu sistema y coordinás el cobro o el retiro.",
    example: "Pedido desde WhatsApp",
    draft: "Hola, Matías. Quiero vender por WhatsApp y pasar los pedidos a un sistema sin cargarlos a mano.",
  },
  {
    id: "respuestas", label: "Repito respuestas por WhatsApp", Icon: Bot, Demo: RepliesDemo,
    delivery: "Un agente de IA para atender y acompañar la venta",
    detail: "Diseño, pruebo y despliego un agente que responde con la información que aprobás. Puede consultar catálogo y horarios, pedir los datos para cotizar y pasarle la charla a una persona. También puedo automatizar confirmaciones por email.",
    example: "Agente de IA y automatización",
    draft: "Hola, Matías. Me interesa un agente de IA para atender consultas y ayudar con las ventas de mi negocio.",
  },
  {
    id: "pedidos", label: "Necesito saber en qué quedó cada pedido", Icon: ClipboardList, Demo: OrdersDemo,
    delivery: "Un sistema de gestión que sigue tus pedidos",
    detail: "Armo un sistema a medida para centralizar clientes, presupuestos y pedidos. Podemos empezar con un tablero que muestra quién pidió qué y en qué estado está, desde recibido hasta entregado.",
    example: "Sistema de pedidos",
    draft: "Hola, Matías. Me interesa un sistema de gestión para seguir los pedidos de mi negocio.",
  },
  {
    id: "facturacion-stock", label: "Necesito facturar y controlar stock", Icon: ReceiptText, Demo: BillingDemo,
    delivery: "Ventas, inventario y factura electrónica en un solo sistema",
    detail: "Integro facturación electrónica con ARCA y conecto los comprobantes con las ventas. Definimos cuándo descontar stock y qué hacer con anulaciones y devoluciones según cómo trabaja tu comercio.",
    example: "Factura electrónica y stock",
    draft: "Hola, Matías. Necesito conectar las ventas con el stock y la facturación electrónica de ARCA.",
  },
];

const desktopQuery = "(min-width: 900px)";

function subscribeToLayout(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isDesktop() {
  return window.matchMedia(desktopQuery).matches;
}

export default function SolutionsSection() {
  const desktop = useSyncExternalStore(subscribeToLayout, isDesktop, () => false);
  const [selection, setSelection] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = desktop ? selection ?? 0 : selection;

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = solutions.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = index === last ? 0 : index + 1; break;
      case "ArrowUp": next = index === 0 ? last : index - 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    setSelection(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="soluciones" tabIndex={-1} className="solutions-band" aria-labelledby="solutions-title">
      <div className="commercial-shell">
        <div className="solutions-heading">
          <h2 className="commercial-title" id="solutions-title">¿Qué te gustaría resolver?</h2>
          <p>Elegí lo que más se parece a tu negocio y probá cómo podría funcionar.</p>
        </div>
        <div className="solutions-workspace">
          <div className="solutions-tablist" role="tablist" aria-label="Soluciones para comercios" aria-orientation="vertical">
            {solutions.map(({ id, label, Icon }, index) => (
              <button key={id} ref={element => { tabRefs.current[index] = element; }} type="button" role="tab"
                className="solution-selector" id={`tab-${id}`} aria-selected={active === index} aria-controls={`solution-${id}`} tabIndex={active === index ? 0 : -1}
                onClick={() => setSelection(index)} onKeyDown={event => handleTabKey(event, index)}>
                <span className="solution-icon"><Icon size={19} aria-hidden="true" /></span>
                <span>{label}</span><ArrowRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          {solutions.map(({ id, label, Icon, Demo, delivery, detail, example, draft }, index) => (
            <div className="solution-item" key={id}>
              <h3 className="solution-accordion">
                <button type="button" className="solution-selector" id={`accordion-${id}`} aria-expanded={active === index} aria-controls={`solution-${id}`} onClick={() => setSelection(active === index ? null : index)}>
                  <span className="solution-icon"><Icon size={19} aria-hidden="true" /></span>
                  <span>{label}</span><ChevronDown size={17} aria-hidden="true" />
                </button>
              </h3>
              <div hidden={active !== index} className="solution-panel" id={`solution-${id}`} role={desktop ? "tabpanel" : "region"} aria-labelledby={`${desktop ? "tab" : "accordion"}-${id}`}>
                {active === index && <>
                  <div className="solution-copy">
                    <h3>{delivery}</h3>
                    <p className="solution-description">{detail}</p>
                  </div>
                  <a className="commercial-button commercial-button--outline solution-cta" href={whatsappDraft(draft)} target="_blank" rel="noopener noreferrer">
                    Consultar por esta solución <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <div className="solution-demo">
                    <p className="demo-label"><span>Ejemplo</span> {example}</p>
                    <Demo />
                  </div>
                </>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
