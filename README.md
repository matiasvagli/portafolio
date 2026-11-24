# Portafolio — Matías Vagliviello (`@matiasvagli`)

Portafolio freelance para pequeños comercios. La portada incluye un catálogo
de muestra que abre una conversación simulada, siete soluciones interactivas,
tres webs publicadas y acceso a WhatsApp y al formulario. Las muestras funcionan
en el navegador. Las fichas de trabajos reutilizan las capturas y los destinos de
`productionLandings`.

El pie enlaza al CV, los casos de estudio, el stack y el trabajo open source.

## Contacto con Google Sheets

El formulario guarda las consultas en Google Sheets. El Apps Script de la
planilla también puede avisar por email cuando entra una consulta nueva. Vercel
usa `GOOGLE_SHEETS_WEBHOOK_URL` para llegar al receptor. Ver
[la configuración](docs/google-sheets.md) y el [script receptor](scripts/google-sheets-contact.gs).
Sin configuración, ofrece WhatsApp y email y mantiene el envío deshabilitado.

## Verificación

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

Los tests usan el runner de Node 22 y verifican validación, confirmación de
almacenamiento, errores del receptor, celdas seguras y reintentos.

## Desarrollo local

```bash
pnpm dev
```

Abre en `http://localhost:3050`.

La portada y las muestras están en `src/components/commercial/`. Los enlaces
de WhatsApp se arman en `src/lib/whatsapp.ts` a partir de `profileData`.
La configuración de Google Sheets y el envío residen en
`src/lib/contact/google-sheets.ts`.
