export const systemProjects = [
  {
    id: "futboliga", number: "01", title: "Futboliga",
    category: "FÚTBOL AMATEUR · LIGAS Y EQUIPOS",
    headline: "Del equipo al torneo, todo en el mismo lugar.",
    description: "App para administrar ligas y equipos: planteles, partidos, convocatorias, fixture y resultados, con espacios y permisos para cada rol.",
    image: "/proyectos/futboliga/app-preview.png",
    imageAlt: "Vestuario de Futboliga con opciones para crear un equipo y unirse por invitación",
    impact: "Gestión de ligas y equipos amateurs",
    detail: "Planteles, convocatorias, fixture y resultados",
    stack: "Next.js · NestJS · Prisma · PostgreSQL",
    bootMessage: "Cargando Futboliga",
    resolution: "De armar el equipo a organizar el torneo.",
    outcomes: ["Planteles y convocatorias en un lugar.", "Ligas, fixture y resultados conectados."],
  },
  {
    id: "sistema-zona", number: "02", title: "Sistema Zona",
    category: "PUBLICIDAD EXTERIOR · ERP",
    headline: "De planillas sueltas a una operación conectada.",
    description: "Presupuestos, taller, instalaciones y facturación en un mismo circuito. Cada equipo ve qué tiene que hacer y qué pasa después.",
    image: "/proyectos/zona/zona.jpeg",
    imageAlt: "Kanban real de Sistema Zona con órdenes de trabajo por etapa de producción",
    impact: "13 módulos de negocio en producción",
    detail: "Órdenes de trabajo y actualizaciones en tiempo real",
    stack: "Django · PostgreSQL · Redis · Next.js",
    bootMessage: "Iniciando Sistema Zona",
    resolution: "Del presupuesto a la orden de trabajo.",
    outcomes: ["13 módulos en una sola operación.", "Presupuestos → taller → facturación."],
  },
  {
    id: "huevo-de-oro", number: "03", title: "Huevo de Oro",
    category: "DISTRIBUCIÓN MAYORISTA · WEB + APP",
    headline: "El pedido sale a la calle. El control se queda.",
    description: "Ventas desde el celular, stock y caja conectados, despacho validado con QR e IA local para consultar el negocio sin subir sus datos a terceros.",
    image: "/proyectos/sistema/s4.png",
    imageAlt: "Catálogo de categorías de Huevo de Oro para gestionar productos e inventario",
    impact: "Web y app móvil en el mismo circuito",
    detail: "Del pedido al despacho con validación QR",
    stack: "Django · React Native · PostgreSQL · Ollama",
    bootMessage: "Cargando sistema mayorista",
    resolution: "Del pedido en la calle al despacho validado.",
    outcomes: ["Ventas en calle, stock bajo control.", "Cada despacho se valida con QR."],
  },
];

// The notebook and Docker carousel have independent project selections.
export const featuredProjects = systemProjects.filter(project =>
  project.id === "sistema-zona" || project.id === "futboliga"
);

export const workingSteps = [
  { number: "01", title: "Primero, el negocio.", description: "Entiendo cómo trabajás, dónde se pierde tiempo y qué necesita cambiar." },
  { number: "02", title: "Después, el sistema.", description: "Modelo los datos y las reglas. Elijo la arquitectura que el problema necesita." },
  { number: "03", title: "Hasta producción.", description: "Pruebo los flujos críticos y acompaño la puesta en marcha con la operación real." },
];
