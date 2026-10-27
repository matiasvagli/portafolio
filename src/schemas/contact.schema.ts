import { z } from "zod";

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "Ingresá tu nombre (mínimo 2 caracteres)")
    .max(80, "Nombre demasiado largo")
    .trim(),
  email: z
    .string()
    .email("Ingresá un email válido")
    .max(120, "Email demasiado largo")
    .trim(),
  empresa: z
    .string()
    .max(100, "Máximo 100 caracteres")
    .trim()
    .optional()
    .or(z.literal("")),
  tipoProyecto: z.enum([
    "arquitectura-backend",
    "erp-medida",
    "ia-mcp-rag",
    "auditoria-optimizacion",
    "otro",
  ]),
  mensaje: z
    .string()
    .min(15, "Contame un poco más del problema a resolver (mínimo 15 caracteres)")
    .max(2000, "Máximo 2000 caracteres")
    .trim(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
