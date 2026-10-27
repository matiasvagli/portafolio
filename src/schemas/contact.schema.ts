import { z } from "zod";

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre (mínimo 2 caracteres)")
    .max(80, "Nombre demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Ingresá un email válido")
    .max(120, "Email demasiado largo"),
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
    .trim()
    .min(15, "Contame un poco más del problema a resolver (mínimo 15 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
});

export const contactSubmissionSchema = contactFormSchema.extend({
  submissionId: z.string().uuid(),
  website: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
