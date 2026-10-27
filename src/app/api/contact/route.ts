import { NextResponse } from "next/server";
import { contactFormSchema } from "@/schemas/contact.schema";

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(rawBody);

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

    return NextResponse.json(
      {
        success: true,
        data: {
          receivedAt: new Date().toISOString(),
          nombre: parsed.data.nombre,
          tipoProyecto: parsed.data.tipoProyecto,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "No se pudo procesar el cuerpo de la solicitud.",
        },
      },
      { status: 400 }
    );
  }
}
