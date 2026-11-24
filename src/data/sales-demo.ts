export const demoCutoff = "2026-11-24";

export const paymentMethods = ["Transferencia", "Mercado Pago", "Tarjeta", "Efectivo"] as const;
export type PaymentMethod = typeof paymentMethods[number];

type DemoSale = {
  id: string;
  customer: string;
  item: string;
  channel: string;
  date: string;
  due: string;
  total: number;
  paid: number;
  method?: PaymentMethod;
};

export const demoSales: readonly DemoSale[] = [
  { id: "V-1084", customer: "Estudio Oliva", item: "Mesa de reuniones", channel: "Presupuesto", date: "2026-11-24", due: "2026-11-30", total: 640000, paid: 320000, method: "Transferencia" },
  { id: "V-1083", customer: "Camila Ríos", item: "Biblioteca modular", channel: "WhatsApp", date: "2026-11-23", due: "2026-11-29", total: 285000, paid: 0 },
  { id: "V-1082", customer: "Casa Pampa", item: "Mostrador de recepción", channel: "Presupuesto", date: "2026-11-21", due: "2026-11-23", total: 420000, paid: 150000, method: "Transferencia" },
  { id: "V-1081", customer: "Lucía Ferreyra", item: "Escritorio de roble", channel: "Tienda online", date: "2026-11-20", due: "2026-11-20", total: 189000, paid: 189000, method: "Mercado Pago" },
  { id: "V-1080", customer: "Hotel del Parque", item: "Cuatro mesas de luz", channel: "Presupuesto", date: "2026-11-18", due: "2026-11-26", total: 368000, paid: 200000, method: "Transferencia" },
  { id: "V-1079", customer: "Martín Acosta", item: "Banco para recibidor", channel: "Mostrador", date: "2026-11-16", due: "2026-11-19", total: 96000, paid: 0 },
  { id: "V-1078", customer: "Taller Nube", item: "Estantes para exhibición", channel: "WhatsApp", date: "2026-11-14", due: "2026-11-22", total: 224000, paid: 224000, method: "Transferencia" },
  { id: "V-1077", customer: "Julia Vega", item: "Mesa ratona", channel: "Tienda online", date: "2026-11-13", due: "2026-11-13", total: 142000, paid: 142000, method: "Tarjeta" },
  { id: "V-1076", customer: "Café La Esquina", item: "Seis mesas para el salón", channel: "Presupuesto", date: "2026-11-11", due: "2026-11-27", total: 516000, paid: 258000, method: "Transferencia" },
  { id: "V-1075", customer: "Bruno Silva", item: "Rack para TV", channel: "Mostrador", date: "2026-11-10", due: "2026-11-10", total: 175000, paid: 175000, method: "Efectivo" },
  { id: "V-1074", customer: "Oficina Horizonte", item: "Dos escritorios a medida", channel: "Presupuesto", date: "2026-11-09", due: "2026-11-21", total: 458000, paid: 310000, method: "Transferencia" },
  { id: "V-1073", customer: "Mora Suárez", item: "Dos repisas flotantes", channel: "Tienda online", date: "2026-11-07", due: "2026-11-07", total: 74000, paid: 74000, method: "Mercado Pago" },
  { id: "V-1072", customer: "Panadería Raíz", item: "Mueble para exhibición", channel: "Presupuesto", date: "2026-11-06", due: "2026-11-25", total: 294000, paid: 0 },
  { id: "V-1071", customer: "Diego Medina", item: "Perchero de pie", channel: "Mostrador", date: "2026-11-04", due: "2026-11-04", total: 58000, paid: 58000, method: "Efectivo" },
];
