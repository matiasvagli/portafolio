import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/schemas/contact.schema";
import { getGoogleSheetsConfig, saveContactToSheets } from "@/lib/contact/google-sheets";

export const runtime = "nodejs";

// Public visitor endpoint. The Sheets credential stays on the server; input is
// bounded and validated here and the receiver authenticates every write.

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 16000) {
      return NextResponse.json({ success: false, error: { code: "PAYLOAD_TOO_LARGE", message: "La consulta es demasiado extensa." } }, { status: 413 });
    }
    rawBody = JSON.parse(body);
  } catch {
    return NextResponse.json({ success: false, error: { code: "INVALID_JSON", message: "No se pudo procesar la solicitud." } }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Datos de contacto inválidos.",
          fields: parsed.error.flatten().fieldErrors,
        },
      },
      { status: 422 }
    );
  }

  const config = getGoogleSheetsConfig();
  if (!config) {
    return NextResponse.json({ success: false, error: { code: "CONTACT_UNAVAILABLE", message: "El formulario no está disponible. Escribime por WhatsApp o email." } }, { status: 503 });
  }

  try {
    await saveContactToSheets(parsed.data, config);
    return NextResponse.json(
      {
        success: true,
        data: {
          submissionId: parsed.data.submissionId,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DELIVERY_FAILED",
          message: "No pudimos confirmar el envío. Reintentá o escribime por WhatsApp o email.",
        },
      },
      { status: 502 }
    );
  }
}
