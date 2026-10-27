export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface StackCategory {
  id: string;
  title: string;
  subtitle: string;
  badgeColor: string;
  items: {
    name: string;
    detail: string;
  }[];
}

export const profileData = {
  name: "Matías Vagliviello",
  handle: "@matiasvagli",
  age: 42,
  role: "Backend Developer & Systems Architect",
  tagline: "Entiendo problemas reales de negocio y los convierto en arquitectura de software que no se cae.",
  location: "Buenos Aires, Argentina",
  email: "vaglimatias@gmail.com",
  phone: "+54 9 11 6846-5477",
  whatsappUrl: "https://wa.me/5491168465477?text=Hola%20Mat%C3%ADas%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20de%20un%20proyecto",
  githubUrl: "https://github.com/matiasvagli",
  linkedinUrl: "https://www.linkedin.com/in/matias-vagliviello-07403736b",
  avatar: "/personal/p3.jpg",
  manifesto: [
    "Tengo 42 años, calle de negocio real y estoy 100% vigente en la ingeniería de software actual.",
    "No escribo código por deporte ni meto capas 'por si acaso': primero entiendo dónde pierde plata, tiempo o control una operación, y después diseño el modelo de datos, el dominio y la infraestructura exacta que lo resuelve.",
    "Me especializo en lo que no se ve, pero se nota cuando falla: que la plata no desaparezca si un servicio se cae a mitad de una transferencia, que un listado no se arrastre con N+1 queries cuando la base crece, y que los agentes de IA trabajen aislados sin filtrar credenciales.",
  ],
  heroMetrics: [
    {
      value: "42",
      label: "Años · Plena Vigencia",
      sublabel: "Madurez para entender el negocio + dominio técnico actual",
    },
    {
      value: "+136k",
      label: "Líneas en Producción",
      sublabel: "ERPs, apps móviles de campo, microservicios y CLIs",
    },
    {
      value: "0 N+1",
      label: "Queries Descontroladas",
      sublabel: "Tests automáticos 1 vs. N y paginación obligatoria por diseño",
    },
    {
      value: "5+",
      label: "Tools Open Source",
      sublabel: "MCP servers, sandboxes Docker, pipelines RAG y generadores",
    },
  ] satisfies MetricItem[],
  stackCategories: [
    {
      id: "backend",
      title: "Backend & Arquitectura",
      subtitle: "Núcleo transaccional y APIs",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      items: [
        { name: "Python · Django 5 & DRF", detail: "ERPs complejos, Signals, Channels (WebSockets), Celery" },
        { name: "FastAPI", detail: "APIs async de alta velocidad, SQLAlchemy Async, Pydantic v2" },
        { name: "TypeScript · NestJS", detail: "Monolitos modulares y microservicios con DDD estricto" },
        { name: "Go (Golang)", detail: "Binarios seguros, concurrencia, proxies y custodios criptográficos" },
      ],
    },
    {
      id: "data",
      title: "Datos, Caché & Mensajería",
      subtitle: "Modelado relacional y tiempo real",
      badgeColor: "bg-zinc-800 text-zinc-200 border-zinc-700",
      items: [
        { name: "PostgreSQL", detail: "Modelado relacional, locks, índices estratégicos, RLS, constraints UNIQUE" },
        { name: "Prisma & TypeORM", detail: "Repositorios desacoplados, migraciones reversibles (down.sql), conteo 1 vs N" },
        { name: "Redis", detail: "Caché de baja latencia, broker de WebSockets (Daphne/Channels) y colas" },
        { name: "RabbitMQ", detail: "Eventos de dominio, Saga Pattern y Outbox transaccional" },
      ],
    },
    {
      id: "ai-infra",
      title: "IA Aplicada, DevOps & Front",
      subtitle: "De punta a punta hasta producción",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      items: [
        { name: "MCP Servers & RAG", detail: "Protocolo MCP, pipelines de ingesta, Ollama local, Text-to-SQL seguro" },
        { name: "Docker & Linux", detail: "Docker Compose, sandboxes aislados, Cloudflare Tunnels, CI/CD" },
        { name: "Next.js & React Native", detail: "Interfaces operativas (Refine, Tailwind, Zod) y apps de campo (Expo)" },
        { name: "Observabilidad & Testing", detail: "Sentry, TDD en dominio, repositorios Fake en memoria, Testcontainers" },
      ],
    },
  ] satisfies StackCategory[],
};
