# Portafolio — Matías Vagliviello (`@matiasvagli`)

Portafolio de ingeniería backend, arquitectura de sistemas (DDD / Clean Architecture) e IA aplicada.

La portada muestra una fábrica animada con Docker y un carrusel de sistemas,
landings y herramientas open source, seguido de casos destacados, método de
trabajo y contacto. El carrusel se puede pausar y navegar manualmente; respeta
movimiento reducido y se pausa fuera de pantalla o con la pestaña oculta.

Las imágenes de los sistemas que salen del contenedor se eligen en
`containerImages`, en `src/data/showcase.ts`. Son independientes de las imágenes
de la notebook de abajo, que se configuran en `src/data/home.ts`.

La sección de casos usa una sola notebook compacta que alterna Futboliga y
Sistema Zona: arranque, problema resuelto y captura. Tiene selección manual,
pausa y repetición; se pausa fuera de pantalla y con la pestaña oculta.
Con movimiento reducido, muestra las capturas directamente y permite elegir el caso.
Se presenta como una selección de últimos trabajos. En escritorio, el método
de trabajo y open source ocupan los costados de la notebook; en pantallas más
chicas se acomodan debajo. El contacto sigue a este bloque sin secciones repetidas.
Las capturas de Futboliga muestran la app (vestuario y acceso), aportadas por Matías,
y su ficha está en `/casos#futboliga`. El carrusel de Docker conserva su selección
independiente, con Huevo de Oro al final.
En casos/proyectos, Futboliga aparece primero y Huevo de Oro último; la numeración
y los filtros siguen ese orden.

## Contacto con Google Sheets

El formulario usa Apps Script vinculado a la planilla, como la landing de BitGoTe.
Solo requiere `GOOGLE_SHEETS_WEBHOOK_URL` en el servidor; no necesita token ni ID de planilla.
Ver [la configuración](docs/google-sheets.md) y el [script receptor](scripts/google-sheets-contact.gs).
Sin configuración, ofrece WhatsApp y email y mantiene el envío deshabilitado.

## Verificación

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

Los tests usan el runner de Node 22 y verifican validación, confirmación de
almacenamiento, errores del receptor, celdas seguras y reintentos.

## 🚀 Levantar en desarrollo

```bash
cd /home/matiasdev/portafolio
pnpm dev
```

Abre en: `http://localhost:3050`

## 🧱 Estructura de archivos

```text
src/
├── app/
│   ├── api/contact/route.ts    # Endpoint validado con Zod
│   ├── cv/page.tsx             # CV imprimible / PDF actualizado
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProjectsSection.tsx
│   │   ├── featured-projects.css
│   │   ├── HomeDetailsSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── EngineeringSection.tsx
│   │   ├── OpenSourceSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── CaseStudyCard.tsx
│       ├── ImageLightbox.tsx
│       ├── TerminalSimulator.tsx
│       ├── SystemBuildScene.tsx
│       ├── system-build-scene.css
│       ├── system-build-factory.css
│       ├── system-build-motion.css
│       ├── ProjectNotebook.tsx
│       ├── project-notebook.css
│       └── ContactForm.tsx
├── lib/contact/google-sheets.ts # Envío privado y confirmación del receptor
├── data/
│   ├── case-studies.ts         # Sistema Zona, Huevo de Oro El Mayorista, NestJS+Prisma
│   ├── engineering.ts          # DDD, DB Modeling, Tests 1 vs N, Redis/Docker
│   ├── open-source.ts          # SkillAudit, ragkit, Team Context MCP, Wallet Saga, CRUDFULL
│   └── profile.ts              # Datos personales, métricas y stack
└── schemas/
    └── contact.schema.ts       # Esquema Zod compartido cliente/servidor
```
