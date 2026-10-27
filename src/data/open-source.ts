export interface OpenSourceTool {
  id: string;
  name: string;
  tagline: string;
  category: string;
  problemSolved: string;
  howItWorks: string;
  commandOrSnippet: string;
  stack: string[];
  repoUrl: string;
  highlightBadge: string;
}

export interface ProductionLanding {
  name: string;
  niche: string;
  description: string;
  impact: string;
  url: string;
  tech: string[];
  image: string;
}

export const openSourceTools: OpenSourceTool[] = [
  {
    id: "bitgote",
    name: "BitGoTe 🥸 — Firewall Local para Agentes de IA",
    tagline:
      "Custodio de secretos en tránsito, firewall de salida y aislamiento en Linux para Claude Code, Cursor, Codex y agentes MCP.",
    category: "Go (Golang) · AI Security · Proxy TLS · nftables · age Vault",
    highlightBadge: "PROYECTO INSIGNIA · SEGURIDAD IA",
    problemSolved:
      "Nació de un caso real con Sistema Zona: ante un incidente en Railway hubo que rotar todas las variables cruzadas entre Railway y Vercel. Si se lo delegás a un agente de IA, lee tus credenciales reales y quedan grabadas en el contexto y la nube del proveedor del LLM.",
    howItWorks:
      "El agente corre aislado en otro usuario de Linux (bitgote-agent) cuya única salida de red por nftables es el proxy de BitGoTe. El agente nunca ve un secreto: usa referencias {{bitgote:sistemazona/prod/API_URL}}. El proxy verifica la política sellada (bitgote.yaml con SHA-256), bloquea IPs privadas/SSRF, te pide aprobación humana por /dev/tty, inyecta el valor real en tránsito desde la bóveda cifrada con age y redacta cualquier aparición en la respuesta con [BITGOTE:REDACTED].",
    commandOrSnippet: `# El agente opera a ciegas con referencias; el valor real jamás entra al contexto del LLM:
curl https://api.vercel.com/v10/projects/sistemazona-web/env \\
  -H "Authorization: Bearer {{bitgote:sistemazona/prod/VERCEL_TOKEN}}" \\
  -d '{"key":"API_URL","value":"{{bitgote:sistemazona/prod/API_URL}}"}'

# bitgote proxy valida bitgote.yaml → pide confirmación en /dev/tty → inyecta → redacta:
# Agente recibe: 201 {"key":"API_URL","value":"[BITGOTE:REDACTED]"}`,
    stack: [
      "Go (Golang)",
      "filippo.io/age",
      "Proxy TLS (CA Efímera)",
      "Linux nftables",
      "/dev/tty Approval",
      "Anti-SSRF",
      "Railway & Vercel Importer",
    ],
    repoUrl: "https://github.com/matiasvagli/bitgote",
  },
  {
    id: "skillaudit",
    name: "SkillAudit",
    tagline: "Sandbox de seguridad en Docker para auditar MCP Servers y Skills de IA",
    category: "AI Security · MCP Server · Docker Sandbox",
    highlightBadge: "Auditoría Dinámica MCP",
    problemSolved:
      "Cualquiera puede publicar un MCP server que robe ~/.ssh o ~/.aws, exfiltre datos o esconda prompt injection en el código fuente para engañar a un revisor estático.",
    howItWorks:
      "En vez de confiar en leer el código, SkillAudit ejecuta el MCP server sospechoso dentro de un contenedor Docker aislado sin red, con honeypots y monitoreo de syscalls (strace), y devuelve la telemetría cruda para auditar su comportamiento real.",
    commandOrSnippet: `docker build -t skillaudit-sandbox:latest ./sandbox/
# El agente dispara run_package_tests() → corre en Docker con honeypots + strace`,
    stack: ["Python", "MCP Protocol", "Docker Sandbox", "Linux strace", "Honeypots"],
    repoUrl: "https://github.com/matiasvagli/skillaudit",
  },
  {
    id: "ragkit",
    name: "ragkit",
    tagline: "Pipeline de ingesta RAG autoconfigurable para NestJS y Node.js",
    category: "TypeScript · NestJS · RAG Architecture",
    highlightBadge: "Zero-Config RAG",
    problemSolved:
      "Cada proveedor de IA requiere chunk size, overlap, modelo de embeddings y dimensiones de vector distintas. Configurarlos a mano en cada proyecto genera pipelines frágiles y acoplados.",
    howItWorks:
      "Declarás el proveedor en una variable de entorno (openai, claude/voyage, gemini) y ragkit autoconfigura toda la cadena de adapters intercambiables: Loader → Chunker → Embedder → VectorStore (pgvector, Qdrant o Pinecone).",
    commandOrSnippet: `RAG_PROVIDER=gemini  # → chunk 800, gemini-embedding-001, 768 dims
RAG_VECTOR_STORE=pgvector
# Cambiar de proveedor de IA no requiere tocar una línea de código`,
    stack: ["TypeScript", "NestJS", "pgvector", "Qdrant", "Pinecone", "CLI"],
    repoUrl: "https://github.com/matiasvagli/ragkit",
  },
  {
    id: "team-context-mcp",
    name: "Team Context MCP Server",
    tagline: "Memoria técnica persistente y compartida para equipos que desarrollan con LLMs",
    category: "Python · MCP Server · Local Embeddings",
    highlightBadge: "Zero Vendor Lock-in",
    problemSolved:
      "Cada sesión con un LLM arranca de cero, las soluciones a bugs complejos no cruzan del backend al frontend, y cuando un dev se va del equipo el conocimiento institucional se evapora.",
    howItWorks:
      "Mantiene una base local (SQLite + embeddings locales, sin enviar código a la nube ni requerir API keys de IA) e inyecta vía protocolo MCP las decisiones de arquitectura, ADRs y debug memory relevantes antes de cada respuesta.",
    commandOrSnippet: `Tu LLM (Claude / Cursor / Gemini) ──► Team Context MCP
  ├── ~/.team-mcp/proyecto.db      (ADRs y arquitectura)
  └── ~/.team-mcp/debug-memory.db  (bugs históricos cross-repo)`,
    stack: ["Python", "MCP Protocol", "SQLite", "Local Embeddings", "CLI"],
    repoUrl: "https://github.com/matiasvagli/Team-Context-MCP-Server",
  },
  {
    id: "microservicios-wallet-saga",
    name: "Wallet System — Saga Pattern",
    tagline: "Billetera digital distribuida con Saga orquestada, compensaciones e idempotencia",
    category: "Microservicios · Saga · Outbox · RabbitMQ",
    highlightBadge: "Consistencia Distribuida",
    problemSolved:
      "Cuando el débito y el crédito ocurren en microservicios con bases de datos separadas, un fallo a mitad de camino puede hacer desaparecer el dinero sin una transacción ACID compartida.",
    howItWorks:
      "API Gateway + 4 microservicios independientes con una base PostgreSQL por servicio, orquestador de Saga que ejecuta transacciones compensatorias automáticas si falla un paso, Outbox transaccional, RabbitMQ y claves de idempotencia UNIQUE.",
    commandOrSnippet: `POST /transfer → PENDING + Outbox Event
  ├─ 1. debit(A, $100, key="debit-<txId>")   [OK]
  ├─ 2. credit(B, $100, key="credit-<txId>") [FAIL]
  └─ 3. compensate(A, +$100, "comp-<txId>")  [REVERTED SAFE]`,
    stack: ["Python / NestJS", "PostgreSQL", "RabbitMQ", "Redis", "Docker Compose", "Saga Pattern"],
    repoUrl: "https://github.com/matiasvagli/Microservicios",
  },
  {
    id: "crudfull",
    name: "CRUDFULL",
    tagline: "Generador CLI de arquitecturas modulares y recursos CRUD para FastAPI",
    category: "Python CLI · FastAPI · Clean Architecture",
    highlightBadge: "Developer Velocity",
    problemSolved:
      "Arrancar microservicios o APIs en FastAPI suele llevar horas de código repetitivo (modelos, schemas, repositorios, servicios, routers, tests y Docker) o terminar en estructuras desordenadas.",
    howItWorks:
      "Con un solo comando CLI genera toda la estructura por capas lista para producción soportando 3 motores: ghost (in-memory para prototipos), sql (SQLAlchemy Async + Postgres) y mongo (Beanie ODM).",
    commandOrSnippet: `crudfull generate resource Product name:str price_cents:int active:bool --db sql
# Genera Modelos, Schemas Pydantic, Servicios, Routers, Tests y Docker`,
    stack: ["Python", "FastAPI", "SQLAlchemy Async", "Beanie / MongoDB", "Typer CLI", "Pytest"],
    repoUrl: "https://github.com/matiasvagli/crudfull",
  },
];

export const productionLandings: ProductionLanding[] = [
  {
    name: "Zona Urbana Publicidad",
    niche: "Publicidad Exterior & Vía Pública (OOH)",
    description:
      "Presencia web comercial y catálogo de formatos publicitarios en vía pública para empresa de publicidad exterior, complementando el ecosistema operativo de Sistema Zona.",
    impact: "Canal comercial activo en producción conectado con la operación de presupuestos.",
    url: "https://www.zonaurbanapublicidad.com.ar/",
    tech: ["Next.js", "Tailwind CSS", "SEO Local", "Optimización de Carga"],
    image: "/proyectos/landings/landing-zona-urbana.jpg",
  },
  {
    name: "Coruja Casas Serranas",
    niche: "Turismo & Alquiler Vacacional en Córdoba",
    description:
      "Plataforma web para alquiler de cabañas en las sierras con fichas visuales por propiedad, galería optimizada, ubicación en Google Maps y embudo directo a WhatsApp y Email.",
    impact: "+300% en consultas online y reducción del 60% en tiempos de respuesta comercial.",
    url: "https://corujacasasserranas.com.ar/",
    tech: ["Next.js", "React SSR", "Tailwind CSS", "Vercel CDN"],
    image: "/proyectos/landings/landing-coruja.jpg",
  },
  {
    name: "Futboliga",
    niche: "Plataforma para Ligas y Equipos de Fútbol Amateur",
    description:
      "Landing y producto web mobile-first para organizar planteles, partidos, convocatorias, asistencia y tesorería de equipos y ligas amateurs.",
    impact: "Producto SaaS respaldado por un monorepo NestJS + Prisma 7 + Zod.",
    url: "https://landingfut.vercel.app/",
    tech: ["Next.js", "NestJS", "Prisma 7", "Zod", "Tailwind CSS"],
    image: "/proyectos/landings/landing-futboliga.jpg",
  },
];
