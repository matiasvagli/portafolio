export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface ArchitectureNode {
  title: string;
  tech: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  clientType: string;
  subtitle: string;
  accentColor: "violet" | "amber" | "emerald";
  problem: {
    headline: string;
    points: string[];
  };
  solution: {
    headline: string;
    points: string[];
  };
  architectureFlow: ArchitectureNode[];
  keyEngineeringDecisions: {
    title: string;
    description: string;
  }[];
  metrics: CaseStudyMetric[];
  stack: string[];
  images: string[];
  liveUrl?: string;
  pdfReportUrl?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "futboliga",
    badge: "CASO DE ESTUDIO #01 · APP PARA FÚTBOL AMATEUR",
    title: "Futboliga — Administración de Ligas y Equipos",
    clientType: "Equipos amateurs, cuerpos técnicos y organizadores de ligas",
    subtitle:
      "Una app para organizar planteles, partidos y convocatorias, y administrar ligas con torneos, fixture y resultados. Cada equipo puede funcionar con o sin liga.",
    accentColor: "emerald",
    problem: {
      headline: "Organizar el fútbol también necesita un sistema",
      points: [
        "Centralizar el plantel, la agenda y quién confirmó su presencia en cada partido.",
        "Separar las responsabilidades del presidente, delegados, cuerpo técnico y jugadores.",
        "Administrar ligas y torneos con equipos, fases, grupos y resultados consistentes.",
      ],
    },
    solution: {
      headline: "Un espacio para el equipo y otro para la liga",
      points: [
        "Vestuario para crear un equipo o unirse por invitación, con aprobación de ingreso y gestión del plantel.",
        "Agenda de partidos, convocatorias y respuestas de asistencia, con cierre de listas y permisos según el rol.",
        "Administración de ligas y torneos: inscripción de equipos, fases, grupos, generación de fixture y tabla de posiciones calculada con los resultados.",
      ],
    },
    architectureFlow: [
      {
        title: "App Web",
        tech: "Next.js + React",
        detail: "Interfaz adaptada a escritorio y celular, con espacios para equipos y administradores de liga.",
      },
      {
        title: "Reglas de Negocio",
        tech: "NestJS + TypeScript",
        detail: "Monolito modular con dominio y casos de uso separados de los controladores y la persistencia.",
      },
      {
        title: "Datos y Contratos",
        tech: "Prisma + PostgreSQL + Zod",
        detail: "Persistencia relacional y esquemas compartidos entre frontend y API.",
      },
    ],
    keyEngineeringDecisions: [
      {
        title: "Permisos independientes para equipos y ligas",
        description:
          "Administrar una liga no otorga permisos sobre un equipo. Las autorizaciones se comprueban en cada contexto y según la categoría correspondiente.",
      },
      {
        title: "Equipos con y sin liga",
        description:
          "La organización del plantel y sus partidos funciona por sí sola. La vinculación con una liga agrega el circuito de competición sin condicionar la operación del equipo.",
      },
    ],
    metrics: [
      { value: "Equipos", label: "Planteles y Roles" },
      { value: "Partidos", label: "Convocatoria y Asistencia" },
      { value: "Ligas", label: "Torneos, Fases y Grupos" },
      { value: "Fixture", label: "Resultados y Posiciones" },
    ],
    stack: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Zod", "pnpm Workspaces"],
    images: ["/proyectos/futboliga/app-preview.png", "/proyectos/futboliga/acceso.png"],
  },
  {
    id: "sistema-zona",
    badge: "CASO DE ESTUDIO #02 · ERP EN PRODUCCIÓN",
    title: "Sistema Zona — ERP Integral OOH",
    clientType: "Empresa de Publicidad en Vía Pública (Múltiples Unidades de Negocio)",
    subtitle:
      "De planillas Excel desconectadas a un ERP en tiempo real con 13 módulos operativos, facturación electrónica ARCA, WebSockets con Redis y motor financiero.",
    accentColor: "violet",
    problem: {
      headline: "El problema real que había que destrabar",
      points: [
        "Operación fragmentada en múltiples planillas Excel sin trazabilidad entre lo que se cotizaba, lo que se producía en taller y lo que realmente se cobraba.",
        "Una misma cotización para un cliente involucraba varias unidades de negocio y socios distintos (producción de letreros, alquiler de carteleras, instalación en calle).",
        "El personal de campo y taller necesitaba ver el estado del Kanban en el celular sin agotar la batería ni saturar el servidor con polling HTTP constante.",
        "Complejidad impositiva y contable argentina: IVA crédito/débito fiscal, percepciones de IIBB, retenciones, flujo de caja consolidado y facturación electrónica ARCA.",
      ],
    },
    solution: {
      headline: "La solución de ingeniería llevada a producción",
      points: [
        "Motor inteligente de Presupuestos → Órdenes de Trabajo (OT): al aprobar una cotización, el backend particiona y genera automáticamente una OT independiente por cada combinación única de (Unidad de Negocio × Tipo de Trabajo).",
        "Tablero Kanban en tiempo real vía Django Channels 4 + Daphne + Redis: una única conexión WebSocket autenticada por JWT (/ws/updates/) reemplazó el polling, bajando el tráfico móvil de ~50 req/min a 2-3 req/min.",
        "Automatización transaccional por eventos/signals: la carga o pago de una factura de proveedor impacta automáticamente el inventario por sector, el libro de IVA y el CashFlow sin pasos manuales.",
        "Asesor Financiero OOH integrado: scoring de terrenos (1-5★), absorción de costos por campaña, simulador de renovaciones y fichaje de RRHH con validación GPS.",
      ],
    },
    architectureFlow: [
      {
        title: "Frontend & PWA",
        tech: "Next.js + Refine + AntD",
        detail: "69 páginas + 54 componentes UI con actualizaciones instantáneas vía WebSocket y notificaciones Web Push (VAPID).",
      },
      {
        title: "Capa API & Tiempo Real",
        tech: "Django 5 + DRF + Channels",
        detail: "80 serializers sin lógica de negocio + 67 vistas API + consumidores ASGI en Daphne.",
      },
      {
        title: "Broker & Caché",
        tech: "Redis",
        detail: "Pub/Sub de eventos de tablero Kanban, invalidación selectiva de caché y colas de notificaciones.",
      },
      {
        title: "Persistencia & Fiscal",
        tech: "PostgreSQL 15 + ARCA",
        detail: "65 modelos relacionales, 188 migraciones aplicadas, integración con facturación electrónica y auditoría.",
      },
    ],
    keyEngineeringDecisions: [
      {
        title: "Aislamiento de archivos en almacenamiento (Caso Real Prod)",
        description:
          "Para evitar que django-cleanup deje referencias huérfanas al compartir imágenes base entre múltiples estructuras/refugios, diseñé un servicio de clonado físico (ContentFile) que garantiza ciclo de vida independiente por entidad.",
      },
      {
        title: "Separación estricta de permisos RBAC multi-socio",
        description:
          "Roles diferenciados (CEO, Admin, Socio Comercial, Operario, RRHH) donde cada socio visualiza y liquida únicamente las órdenes y flujos de caja de su unidad de negocio.",
      },
    ],
    metrics: [
      { value: "13", label: "Módulos de Negocio Activos" },
      { value: "65", label: "Modelos de Datos (188 Migraciones)" },
      { value: "~136.8k", label: "Líneas de Código en Repo" },
      { value: "-94%", label: "Tráfico Móvil (WebSockets + Redis)" },
    ],
    stack: [
      "Python",
      "Django 5",
      "Django REST Framework",
      "Django Channels (WebSockets)",
      "Redis",
      "PostgreSQL 15",
      "Next.js",
      "Refine",
      "Docker",
      "Sentry",
      "ARCA / Facturación Electrónica",
    ],
    images: [
      "/proyectos/zona/zona.jpeg",
      "/proyectos/zona/123.jpeg",
      "/proyectos/zona/45.jpeg",
      "/proyectos/zona/empleados.jpeg",
      "/proyectos/zona/78.jpeg",
    ],
    liveUrl: "https://www.zonaurbanapublicidad.com.ar/",
    pdfReportUrl: "/zona-en-numeros.pdf",
  },
  {
    id: "arquitectura-nestjs-prisma",
    badge: "CASO DE ESTUDIO #03 · DDD ESTRICTO CON NESTJS, PRISMA & TRANSACCIONES",
    title: "Plataformas SaaS & Billetera Distribuida (Futboliga / Wallet v2)",
    clientType: "Arquitectura Hexagonal, Modelado Relacional y Consistencia Financiera",
    subtitle:
      "Cómo diseño sistemas en el ecosistema TypeScript (NestJS + Prisma / TypeORM + PostgreSQL + Zod) donde las reglas de negocio viven aisladas del framework y la performance se defiende con tests automáticos.",
    accentColor: "emerald",
    problem: {
      headline: "Los vicios típicos que evito en proyectos TypeScript/Backend",
      points: [
        "Controladores y servicios acoplados al ORM (Prisma/TypeORM) donde cambiar una regla de negocio obliga a levantar toda la base de datos para correr un test.",
        "Endpoints de listado que funcionan rápido en desarrollo con 5 filas pero explotan en producción con N+1 queries cuando hay miles de registros.",
        "Manejo de dinero con números flotantes (float/double) o verificaciones de idempotencia hechas con un SELECT antes de un INSERT (vulnerables a race conditions).",
        "Migraciones de base de datos sin estrategia de rollback en sistemas que mueven dinero o estados críticos.",
      ],
    },
    solution: {
      headline: "Ingeniería de software con reglas verificables en CI",
      points: [
        "Fronteras de capas forzadas por ESLint: domain/ (TypeScript puro, cero imports de Nest o Prisma), application/ (casos de uso + interfaces de Repository), infrastructure/ (implementaciones Prisma y Fakes en memoria) y http/ (controllers finos).",
        "Guardián automático anti N+1: todo endpoint de listado es paginado por diseño (esquema Zod compartido) y lleva un test que cuenta los eventos query de Prisma con 1 fila vs. 20 filas — la cantidad de queries debe ser idéntica.",
        "Dinero e Idempotencia en la Base: importes siempre en centavos enteros (Int/BIGINT), claves de idempotencia determinísticas respaldadas por constraints UNIQUE en PostgreSQL y patrón Outbox + Saga orquestada para transferencias entre microservicios.",
        "Migraciones reversibles: cada migración de Prisma/SQL que modifica estructura crítica se acompaña de su script down.sql verificado, o se elige TypeORM cuando el rollback transaccional nativo es prioritario (documentado en ADRs).",
      ],
    },
    architectureFlow: [
      {
        title: "Domain Layer (Puro)",
        tech: "TypeScript · TDD",
        detail: "Entidades, Value Objects y calculadores puros. Se testean en milisegundos sin Nest ni Docker.",
      },
      {
        title: "Application Layer",
        tech: "Use Cases + Ports",
        detail: "Orquesta el dominio usando interfaces de Repository. Testeado con FakeRepositories en memoria.",
      },
      {
        title: "Infrastructure Layer",
        tech: "Prisma 7 / TypeORM + Redis",
        detail: "Implementa los repositorios reales contra PostgreSQL, maneja locks, batching (where: { id: { in } }) y caché.",
      },
      {
        title: "HTTP & Shared Contracts",
        tech: "NestJS + Zod",
        detail: "DTOs solo para validar/transformar input, respuestas estandarizadas (/api/v1) y errores tipados.",
      },
    ],
    keyEngineeringDecisions: [
      {
        title: "Por qué el test 1 vs. N supera a cualquier monitor de performance",
        description:
          "Un reporte de queries lentas nadie lo mira hasta que producción ya se arrastró. En cambio, un test de integración que escucha prisma.$on('query') y falla en el Pull Request si sembrar 20 filas ejecuta más queries que sembrar 1 fila corta el N+1 de raíz.",
      },
      {
        title: "ADRs (Architecture Decision Records) para cada decisión costosa",
        description:
          "Documentar qué alternativas se descartaron y por qué (ej. Saga orquestada vs coreografiada, o búsquedas anti-enumeración con tope fijo) ahorra meses de discusiones circulares cuando el equipo crece.",
      },
    ],
    metrics: [
      { value: "4 Capas", label: "Verificadas por Linter (ESLint)" },
      { value: "1 = 20", label: "Aserción de Queries en Listados" },
      { value: "Centavos", label: "Cero Floats en Operaciones de Dinero" },
      { value: "ADRs", label: "Decisiones Técnicas Documentadas" },
    ],
    stack: [
      "TypeScript",
      "NestJS",
      "Prisma ORM",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Zod",
      "Next.js",
      "pnpm Workspaces",
      "Docker",
      "Jest / Testcontainers",
    ],
    images: [],
    liveUrl: "https://landingfut.vercel.app/",
  },
  {
    id: "huevo-de-oro",
    badge: "CASO DE ESTUDIO #04 · MAYORISTA WEB + MOBILE + IA LOCAL",
    title: "Huevo de Oro — Ecosistema Mayorista & Distribución",
    clientType: "Distribuidora Mayorista Avícola (Galpón, Caja, Reparto y Ventas en Calle)",
    subtitle:
      "Digitalización total de un mayorista: ERP web de inventario multidimensional y caja por turnos + App Móvil en React Native con despacho por QR + Asistente de IA local on-premise.",
    accentColor: "amber",
    problem: {
      headline: "El caos operativo antes del sistema",
      points: [
        "El stock avícola se maneja en múltiples dimensiones simultáneas (cajones, maples, docenas, unidades por categoría y granja): llevarlo en planillas o papel generaba quiebres de stock y diferencias de caja todos los días.",
        "Los vendedores en calle tomaban pedidos a mano y los changarines/encargados de galpón despachaban sin validación cruzada, provocando entregas duplicadas o errores de armado.",
        "Gasto enorme en talonarios de papel y demoras en pasar los comprobantes y estados de cuenta corriente a los clientes habituales.",
        "El dueño quería consultar métricas de rentabilidad y ventas en lenguaje natural, pero sin subir información financiera sensible de su negocio a nubes de terceros.",
      ],
    },
    solution: {
      headline: "Arquitectura omnicanal pensada para el piso de venta real",
      points: [
        "ERP Web Central (Django 5 + PostgreSQL + Celery/Redis): inventario inteligente con conversión de unidades, alertas de stock crítico, arqueo de caja riguroso por turnos, cuentas corrientes con límite de crédito y liquidación automática de comisiones de vendedores.",
        "App Móvil Nativa (React Native + Expo + Zustand): los vendedores arman pedidos en tiempo real desde la calle, envían comprobantes PDF con QR directo al WhatsApp del cliente, y el galpón valida la entrega escaneando el código QR o palabra clave de despacho.",
        "Asistente de IA 100% Local (Ollama + Qwen 2.5 + LangChain Text-to-SQL): corre dentro del servidor local en Docker sin mandar un byte afuera. Se conecta a PostgreSQL mediante un rol exclusivo de solo lectura (ai_reader) aplicando el Principio de Menor Privilegio.",
        "Infraestructura blindada: servidor local completamente dockerizado y publicado hacia la app móvil mediante Cloudflare Tunnels, sin abrir puertos en el router del cliente.",
      ],
    },
    architectureFlow: [
      {
        title: "App Móvil de Campo",
        tech: "React Native + Expo + QR",
        detail: "Catálogo en vivo, carrito persistente (Zustand), escáner QR de despacho y envío directo por WhatsApp.",
      },
      {
        title: "Túnel Seguro & API",
        tech: "Cloudflare Tunnel + DRF",
        detail: "Exposición cero de puertos locales; autenticación JWT con RBAC (Vendedor, Encargado, Admin).",
      },
      {
        title: "Core ERP & Workers",
        tech: "Django 5 + Celery + Redis",
        detail: "Cálculo de comisiones, generación de PDFs con ReportLab, alertas predictivas de stock y arqueos.",
      },
      {
        title: "DB + IA On-Premise",
        tech: "PostgreSQL 16 + Ollama",
        detail: "Modelo Qwen 2.5 local consultando vía rol restringido ai_reader (READ ONLY a nivel motor SQL).",
      },
    ],
    keyEngineeringDecisions: [
      {
        title: "Seguridad de IA a nivel motor de Base de Datos (ai_reader)",
        description:
          "En vez de confiar en un prompt para que el LLM no haga un DROP o UPDATE, el asistente Text-to-SQL usa una credencial de PostgreSQL con permisos exclusivamente SELECT sobre vistas seguras. Físicamente no puede alterar datos.",
      },
      {
        title: "Validación criptográfica/QR en la entrega física",
        description:
          "Ningún pedido pagado sale del galpón sin que el encargado valide el código de despacho desde la app móvil, cerrando el circuito entre caja, stock y logística.",
      },
    ],
    metrics: [
      { value: "100%", label: "Eliminación de Boletas en Papel" },
      { value: "Web + APK", label: "Sincronización en Tiempo Real" },
      { value: "0 Cloud", label: "IA Local (Ollama + Read-Only SQL)" },
      { value: "3 Roles", label: "Vendedor · Encargado · Admin" },
    ],
    stack: [
      "Python",
      "Django 5",
      "Django REST Framework",
      "PostgreSQL 16",
      "Redis",
      "Celery",
      "React Native",
      "Expo",
      "Zustand",
      "Ollama (Qwen 2.5)",
      "LangChain",
      "Docker Compose",
      "Cloudflare Tunnel",
    ],
    images: [
      "/proyectos/sistema/s1.png",
      "/proyectos/sistema/s2.png",
      "/proyectos/sistema/s4.png",
      "/proyectos/sistema/s6.png",
      "/proyectos/appmovil/a1.png",
      "/proyectos/appmovil/a4.png",
      "/proyectos/appmovil/a7.png",
      "/proyectos/appmovil/a10.png",
    ],
  },
];
