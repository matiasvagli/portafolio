import { z } from "zod";
import type { ContactSubmission } from "../../schemas/contact.schema";

const configSchema = z.object({
  url: z.string().url().refine(value => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(value)),
  token: z.string().min(32),
});

export function getGoogleSheetsConfig(env: NodeJS.ProcessEnv = process.env) {
  const parsed = configSchema.safeParse({
    url: env.GOOGLE_SHEETS_WEBHOOK_URL,
    token: env.GOOGLE_SHEETS_WEBHOOK_TOKEN,
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
      token: config.token,
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

  if (!response.ok) throw new Error("Google Sheets rejected the request");

  const acknowledgment = z.object({
    success: z.literal(true),
    submissionId: z.literal(submission.submissionId),
  }).safeParse(await response.json());

  if (!acknowledgment.success) throw new Error("Google Sheets did not confirm storage");
}
