import { z } from "zod";

export const contactTopics = [
  "Web para mi negocio",
  "Formulario de presupuesto a medida",
  "Catálogo con carrito",
  "Ventas por WhatsApp",
  "Agente de IA para ventas",
  "Automatizar WhatsApp o email",
  "Seguimiento de pedidos",
  "Sistema de gestión a medida",
  "Facturación con ARCA y stock",
  "Otra consulta",
] as const;

// Leave room for the subject in the existing Apps Script message field.
export const commercialMessageLimit = 1900;

const contactFields = z.object({
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
  asunto: z.enum(contactTopics, { errorMap: () => ({ message: "Elegí un asunto de la lista." }) }).optional(),
  mensaje: z
    .string()
    .trim()
    .min(15, "Contame un poco más sobre lo que necesitás (mínimo 15 caracteres).")
    .max(2000, "Usá hasta 2000 caracteres."),
});

function validateSubjectMessage({ asunto, mensaje }: z.infer<typeof contactFields>, ctx: z.RefinementCtx) {
  if (asunto && mensaje.length > commercialMessageLimit) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["mensaje"], message: "Usá hasta 1900 caracteres." });
  }
}

export const contactFormSchema = contactFields.superRefine(validateSubjectMessage);

export const contactSubmissionSchema = contactFields.extend({
  submissionId: z.string().uuid(),
  website: z.string().max(0).optional(),
}).superRefine(validateSubjectMessage);

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
