import { z } from "zod";
import type { ContactSubmission } from "../../schemas/contact.schema";

const configSchema = z.object({
  url: z.string().trim().url().refine(value => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(value)),
});

export class ContactDeliveryError extends Error {
  readonly code: "UPSTREAM_HTTP_ERROR" | "UPSTREAM_INVALID_RESPONSE" | "STORAGE_NOT_CONFIRMED";
  readonly upstreamStatus: number;

  constructor(
    code: ContactDeliveryError["code"],
    upstreamStatus: number,
  ) {
    super(code);
    this.name = "ContactDeliveryError";
    this.code = code;
    this.upstreamStatus = upstreamStatus;
  }
}

export function getGoogleSheetsConfig(env: NodeJS.ProcessEnv = process.env) {
  const parsed = configSchema.safeParse({
    url: env.GOOGLE_SHEETS_WEBHOOK_URL,
  });
  return parsed.success ? parsed.data : null;
}

export async function saveContactToSheets(
  submission: ContactSubmission,
  config: NonNullable<ReturnType<typeof getGoogleSheetsConfig>>,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submissionId: submission.submissionId,
      receivedAt: new Date().toISOString(),
      nombre: submission.nombre,
      email: submission.email,
      empresa: submission.empresa ?? "",
      tipoProyecto: submission.tipoProyecto,
      mensaje: submission.mensaje,
    }),
    signal: AbortSignal.timeout(12000),
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) throw new ContactDeliveryError("UPSTREAM_HTTP_ERROR", response.status);

  // Apps Script can return an HTML error page with HTTP 200 when the published
  // version is missing doPost or requires login. Neither confirms a saved lead.
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ContactDeliveryError("UPSTREAM_INVALID_RESPONSE", response.status);
  }

  const acknowledgment = z.object({
    success: z.literal(true),
    submissionId: z.literal(submission.submissionId),
  }).safeParse(result);

  if (!acknowledgment.success) throw new ContactDeliveryError("STORAGE_NOT_CONFIRMED", response.status);
}
