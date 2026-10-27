# Portafolio — Matías Vagliviello (`@matiasvagli`)

Portafolio de ingeniería backend, arquitectura de sistemas (DDD / Clean Architecture) e IA aplicada.

## 🚀 Levantar en desarrollo

```bash
cd /home/matiasdev/portafolio
pnpm dev
```

Abre en: `http://localhost:3050`

## 🧱 Estructura de Archivos (Modular · <300 líneas por archivo)

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
│   │   ├── CaseStudiesSection.tsx
│   │   ├── EngineeringSection.tsx
│   │   ├── OpenSourceSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── CaseStudyCard.tsx
│       ├── ImageLightbox.tsx
│       └── TerminalSimulator.tsx
├── data/
│   ├── case-studies.ts         # Sistema Zona, Huevo de Oro El Mayorista, NestJS+Prisma
│   ├── engineering.ts          # DDD, DB Modeling, Tests 1 vs N, Redis/Docker
│   ├── open-source.ts          # SkillAudit, ragkit, Team Context MCP, Wallet Saga, CRUDFULL
│   └── profile.ts              # Datos personales, métricas y stack
└── schemas/
    └── contact.schema.ts       # Esquema Zod compartido cliente/servidor
```
