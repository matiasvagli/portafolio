export interface EngineeringPillar {
  id: string;
  badge: string;
  title: string;
  summary: string;
  principles: string[];
  codeTitle: string;
  codeLanguage: string;
  codeSnippet: string;
}

export const engineeringPillars: EngineeringPillar[] = [
  {
    id: "ddd-clean-code",
    badge: "01 · DDD & CLEAN ARCHITECTURE",
    title: "Dominio puro, sin sobre-ingeniería y desacoplado del framework",
    summary:
      "La solución más simple que resuelva el problema, pero lo más ordenada posible. Las reglas de negocio nunca viven en serializers de DRF ni en DTOs de NestJS: viven en el dominio y se testean sin levantar el servidor.",
    principles: [
      "Cero lógica de negocio en Serializers, Schemas (Pydantic/Zod) o Controllers: solo validación y transformación de entrada/salida.",
      "Patrón Repository con interfaces en la capa de aplicación: permite correr suites enteras de casos de uso con FakeRepositories en memoria en milisegundos.",
      "Límite estricto de ~400 líneas por archivo y una responsabilidad por módulo. Nada de monolitos inmanejables.",
      "Fronteras de arquitectura garantizadas por ESLint / tests: domain/ jamás importa NestJS, Prisma ni Django.",
    ],
    codeTitle: "Frontera de Capas & Caso de Uso con Repository Pattern",
    codeLanguage: "typescript",
    codeSnippet: `// ✅ domain/quote-calculator.ts — Puro, determinístico, dinero en centavos (Int)
export function calculateOrderTotalCents(
  items: ReadonlyArray<{ unitPriceCents: number; qty: number }>,
  discountBps: number // 10000 = 100%
): number {
  const subtotal = items.reduce((acc, item) => acc + item.unitPriceCents * item.qty, 0);
  const discount = Math.round((subtotal * discountBps) / 10_000);
  return Math.max(0, subtotal - discount);
}

// ✅ application/approve-budget.use-case.ts — Depende del puerto, no del ORM
export class ApproveBudgetUseCase {
  constructor(
    private readonly budgets: BudgetRepositoryPort,
    private readonly workOrders: WorkOrderRepositoryPort,
  ) {}

  async execute(budgetId: string): Promise<{ createdOrders: number }> {
    const budget = await this.budgets.findByIdOrThrow(budgetId);
    const groups = budget.partitionByBusinessUnitAndWorkType();
    await this.workOrders.saveBatch(groups);
    return { createdOrders: groups.length };
  }
}`,
  },
  {
    id: "db-modeling-consistency",
    badge: "02 · MODELADO DE DB & CONSISTENCIA",
    title: "PostgreSQL pensado desde las invariantes, los locks y la idempotencia",
    summary:
      "Un buen backend empieza por un esquema relacional que impida estados inválidos. La consistencia del dinero y la idempotencia se garantizan en el motor de base de datos, no rezando en el código de aplicación.",
    principles: [
      "Idempotencia real con constraints UNIQUE en la base de datos: evita la ventana de carrera (race condition) de hacer SELECT y después INSERT.",
      "Saga Pattern orquestada + Outbox transaccional cuando una operación cruza múltiples servicios que no comparten transacción ACID.",
      "Migraciones siempre reversibles (down.sql explícito) e índices compuestos diseñados para las consultas reales del negocio.",
      "Principio de Menor Privilegio: si un motor de IA consulta la base, lo hace con un rol PostgreSQL READ ONLY (ai_reader).",
    ],
    codeTitle: "Outbox Transaccional + Idempotencia en Base de Datos",
    codeLanguage: "sql",
    codeSnippet: `-- ✅ La garantía vive en PostgreSQL, no en un if() con race condition
CREATE TABLE wallet_ledger_entries (
    id UUID PRIMARY KEY,
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    amount_cents BIGINT NOT NULL, -- Nunca FLOAT para dinero
    idempotency_key VARCHAR(120) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_wallet_ledger_idempotency UNIQUE (idempotency_key)
);

-- Transacción atómica: Movimiento + Evento en Outbox en el mismo COMMIT
BEGIN;
  UPDATE wallets
     SET balance_cents = balance_cents - 150000,
         updated_at = NOW()
   WHERE id = $1 AND balance_cents >= 150000;

  INSERT INTO wallet_ledger_entries (id, wallet_id, amount_cents, idempotency_key)
  VALUES ($2, $1, -150000, 'transfer:' || $3 || ':debit');

  INSERT INTO outbox_events (id, aggregate_id, event_type, payload)
  VALUES ($4, $3, 'wallet.debited.v1', $5::jsonb);
COMMIT;`,
  },
  {
    id: "performance-n1-guards",
    badge: "03 · GUARDIANES ANTI N+1 (DJANGO & PRISMA)",
    title: "Performance defendida con tests automáticos 1 vs. N, no con reportes",
    summary:
      "Una lista sin paginar es un bug, no una decisión de estilo. Y para que ningún N+1 llegue a producción, cada endpoint de listado tiene un test automático que verifica que pedir 20 filas ejecute exactamente la misma cantidad de queries SQL que pedir 1 fila.",
    principles: [
      "Paginación obligatoria por diseño con límite máximo compartido en todos los endpoints de listado.",
      "En Django: select_related / prefetch_related validados con CaptureQueriesContext comparando N=1 contra N=20.",
      "En NestJS + Prisma: cliente de test instrumentado con prisma.$on('query') que falla en CI si alguien mete una query dentro de un loop.",
      "Carga en bloque (include o where: { id: { in: ids } }) en lugar de consultas repetidas.",
    ],
    codeTitle: "Guardián Automático 1 vs. N en Prisma / Django",
    codeLanguage: "typescript",
    codeSnippet: `// ✅ Test automático: si alguien mete un N+1 en el listado, el PR falla solo
it("la cantidad de queries SQL no crece con N (1 fila vs 20 filas)", async () => {
  await seedTeamMatches(1);
  const queriesWithOne = await countPrismaQueries(prisma, () =>
    request(app.getHttpServer()).get("/api/v1/teams/t1/matches?limit=50").expect(200)
  );

  await resetAndSeedTeamMatches(20);
  const queriesWithTwenty = await countPrismaQueries(prisma, () =>
    request(app.getHttpServer()).get("/api/v1/teams/t1/matches?limit=50").expect(200)
  );

  // Sin umbrales mágicos fijos: 1 fila y 20 filas deben ejecutar las mismas queries
  expect(queriesWithTwenty).toBe(queriesWithOne);
});`,
  },
  {
    id: "redis-docker-realtime",
    badge: "04 · REDIS, WEBSOCKETS & DOCKER",
    title: "Tiempo real sin derretir el servidor y entornos 100% reproducibles",
    summary:
      "Uso Redis donde realmente mueve la aguja: como broker de mensajería para WebSockets (Django Channels), caché estratégica y colas de trabajo (Celery), con toda la infraestructura empacada en Docker Compose lista para levantar con un comando.",
    principles: [
      "Reemplazo de polling HTTP agresivo por una única conexión WebSocket multiplexada (/ws/updates/) respaldada por Redis.",
      "Procesamiento asíncrono con Celery + Redis para generación de PDFs, liquidaciones masivas y sincronización externa.",
      "Contenedores Docker aislados: desde entornos de desarrollo y Testcontainers hasta sandboxes de seguridad sin red para auditar IA.",
      "Despliegues limpios en Linux, Railway, Vercel o servidores on-premise conectados por Cloudflare Tunnels.",
    ],
    codeTitle: "Arquitectura de Tiempo Real (Django Channels + Redis + Docker)",
    codeLanguage: "python",
    codeSnippet: `# ✅ Emisión de eventos en tiempo real al aprobar presupuesto / mover OT en Kanban
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def broadcast_work_order_Transition(work_order, actor_id: int) -> None:
    channel_layer = get_channel_layer() # Respaldado por Redis Pub/Sub
    payload = {
        "type": "kanban.work_order_updated",
        "workOrderId": str(work_order.id),
        "sector": work_order.sector_code,
        "status": work_order.status,
        "updatedBy": actor_id,
    }
    async_to_sync(channel_layer.group_send)(
        f"business_unit_{work_order.business_unit_id}",
        payload,
    )`,
  },
];
