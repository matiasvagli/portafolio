import type { contactGoals } from "@/schemas/contact.schema";

export const visitorPaths = [
  {
    id: "web", label: "Necesito una página web",
    title: "Una web que muestre tu trabajo y genere consultas",
    detail: "Armamos una landing, una web de servicios o una tienda para tu negocio. En este ejemplo podés explorar los servicios y pedir un presupuesto de prueba.",
    example: "Landing de servicios", address: "brocha-sur.demo", topic: "Necesito una web",
  },
  {
    id: "idea", label: "Tengo una idea y quiero hacerla realidad",
    title: "Dale forma a tu idea y ponela a prueba",
    detail: "Te acompaño desde la investigación hasta un producto mínimo viable (MVP) que puedas poner en manos de tus primeros usuarios.",
    topic: "Tengo una idea",
  },
  {
    id: "app", label: "Quiero desarrollar una aplicación",
    title: "Diseñamos y desarrollamos tu app",
    detail: "Definimos qué tiene que poder hacer la gente, diseñamos las pantallas y construimos una primera versión para probar. Explorá Huella y fijate cómo se pasa de descubrir un servicio a iniciar una consulta.",
    example: "Huella · App para mascotas", topic: "Quiero desarrollar una app",
  },
  {
    id: "empezar", label: "Quiero empezar mi propio negocio",
    title: "Lanzá tu tienda online y empezá a vender",
    detail: "Armamos tu catálogo con productos y variantes, el carrito, los envíos y los medios de pago. En Taller Lona podés probar el recorrido desde elegir un producto hasta confirmar una compra.",
    example: "Tienda online con compra de prueba", address: "taller-lona.demo", topic: "Estoy empezando un negocio",
  },
  {
    id: "mejorar", label: "Quiero mejorar mi negocio",
    title: "Seguí tus envíos y mantené al cliente al tanto",
    detail: "Conectá tu tienda con el servicio de envíos. Simulá un despacho, seguí el pedido en el mapa y mirá qué aviso recibe el cliente por WhatsApp en cada etapa.",
    example: "Seguimiento de pedidos y avisos automáticos", address: "envios.demo/seguimiento", topic: "Quiero mejorar mi negocio",
  },
  {
    id: "automatizar", label: "Quiero automatizar tareas",
    title: "Un solo agente atiende a muchos clientes a la vez",
    detail: "Conectá un agente a tu catálogo, inventario y horarios para contestar por WhatsApp con los datos de tu negocio. Probá qué responde cuando varios clientes preguntan al mismo tiempo o retoman una conversación.",
    example: "Bandeja de atención automática", address: "atencion.demo/consultas", topic: "Quiero automatizar tareas",
  },
  {
    id: "ventas", label: "Necesito organizar mis ventas y cobranzas",
    title: "Sabé cuánto vendiste y qué te falta cobrar",
    detail: "Reuní ventas, clientes, anticipos y vencimientos en un solo lugar. Probá el panel con datos de un mes y registrá un cobro de ejemplo para ver cómo cambia el saldo.",
    example: "Panel de ventas y cuentas por cobrar", address: "gestion.demo/cobranzas", topic: "Quiero organizar ventas y cobranzas",
  },
  {
    id: "ia", label: "Quiero incorporar inteligencia artificial",
    title: "Elegí dónde conviene aplicar IA en tu negocio",
    detail: "Primero analizamos tu operación. Comparamos cuánto cuesta implementar y mantener cada alternativa, desde automatizar con reglas hasta incorporar IA, y qué impacto puede tener en tu margen, producción o control.",
    example: "Compará costos y beneficios", topic: "Quiero incorporar inteligencia artificial",
  },
  {
    id: "orientacion", label: "Tengo un problema, pero no sé cómo resolverlo",
    title: "¿En qué te puedo ayudar?",
    detail: "Contame qué estás intentando hacer, dónde te trabás y qué te gustaría que cambiara. Con eso podemos ver por dónde empezar.",
    topic: "Necesito orientación",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  title: string;
  detail: string;
  example?: string;
  address?: string;
  topic: (typeof contactGoals)[number];
}>;
