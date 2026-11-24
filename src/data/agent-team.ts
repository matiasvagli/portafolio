import { BarChart3, CalendarDays, CircleDollarSign, FileText, Headphones, Network, PackageSearch, Tags } from "lucide-react";

export const agentTeam = [
  {
    id: "cobranzas", name: "Cobranzas", Icon: CircleDollarSign, tone: "amber", wave: 0,
    role: "Controla vencimientos y prepara el seguimiento de pagos.",
    task: "Cruza pagos con facturas", outcome: "Detectó 3 facturas vencidas por $486.000 y preparó 3 recordatorios.",
    source: "Libro de ventas · Extracto de cobros", documents: 8, to: "Coordinación",
    approval: "Revisar 3 recordatorios de pago", alert: "3 facturas vencidas",
  },
  {
    id: "contable", name: "Contable", Icon: FileText, tone: "blue", wave: 0,
    role: "Ordena ingresos, gastos y comprobantes para que los revise tu contador.",
    task: "Clasifica comprobantes", outcome: "Clasificó 5 gastos de insumos y 3 de logística. Dejó la carpeta lista para revisión contable.",
    source: "Carpeta de comprobantes", documents: 8, to: "Análisis",
  },
  {
    id: "inventario", name: "Inventario", Icon: PackageSearch, tone: "green", wave: 0,
    role: "Controla existencias, detecta faltantes y ayuda a planificar reposiciones.",
    task: "Verifica existencias", outcome: "Encontró 2 tableros de guatambú disponibles y reservó disponibilidad en la simulación del presupuesto.",
    source: "Catálogo · Registro de existencias", documents: 0, to: "Comercial",
    alert: "Guatambú por debajo del mínimo de 4 unidades",
  },
  {
    id: "atencion", name: "Atención al cliente", Icon: Headphones, tone: "teal", wave: 0,
    role: "Asiste con consultas, pedidos, reservas y preguntas frecuentes.",
    task: "Revisa consultas de clientes", outcome: "Preparó 2 respuestas sobre retiros y derivó a Comercial una consulta por una mesa.",
    source: "Bandeja de consultas", documents: 0, to: "Comercial",
  },
  {
    id: "comercial", name: "Comercial", Icon: Tags, tone: "blue", wave: 1,
    role: "Ordena oportunidades, prepara presupuestos y facilita el seguimiento.",
    task: "Consolida consulta y disponibilidad", outcome: "Preparó el presupuesto P-018 de una mesa de guatambú con stock confirmado.",
    source: "Atención · Inventario · Lista de precios", documents: 1, to: "Administrativo",
    approval: "Revisar el presupuesto P-018",
  },
  {
    id: "admin", name: "Administrativo", Icon: CalendarDays, tone: "rose", wave: 2,
    role: "Organiza documentos, tareas, agendas y procesos internos.",
    task: "Organiza el seguimiento comercial", outcome: "Agendó el seguimiento de P-018 para el jueves a las 10:00, sujeto a revisión del equipo.",
    source: "Presupuesto P-018 · Agenda interna", documents: 0, to: "Coordinación",
  },
  {
    id: "analista", name: "Analista", Icon: BarChart3, tone: "green", wave: 2,
    role: "Interpreta datos, arma reportes y ayuda a detectar oportunidades.",
    task: "Cruza ventas, gastos y cobros", outcome: "Resumió $1.240.000 en ventas y $754.000 cobrados. Identificó $486.000 pendientes en 3 facturas.",
    source: "Ventas · Contable · Cobranzas", documents: 1, to: "Coordinación",
  },
  {
    id: "coordinador", name: "Coordinador", Icon: Network, tone: "teal", wave: 3,
    role: "Consolida novedades y conecta las tareas de los distintos agentes.",
    task: "Consolida el cierre del día", outcome: "Reunió el resumen de ventas, el stock bajo y las novedades de cobranzas y comercial en el parte diario.",
    source: "Resumen de análisis · Actividad del equipo", documents: 1, to: "Responsable del taller",
  },
] as const;

export const waveLabels = ["Consultas, comprobantes, stock y cobros en revisión", "Comercial recibió la consulta y el stock", "Administración y Análisis avanzan en paralelo", "Coordinación prepara el parte del día"];
