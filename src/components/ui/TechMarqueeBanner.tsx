"use client";

const stackLogos = [
  { id: "py", name: "Python", role: "Backend Core", icon: "/icons/py.svg" },
  { id: "django", name: "Django 5 & DRF", role: "ERPs & Channels", icon: "/icons/django.svg" },
  { id: "fastapi", name: "FastAPI", role: "Async APIs", icon: "/icons/fastapi.svg" },
  { id: "ts", name: "TypeScript", role: "Strict Typing", icon: "/icons/ts.svg" },
  { id: "nestjs", name: "NestJS", role: "DDD & Microservicios", icon: "/icons/nestjs.svg" },
  { id: "prisma", name: "Prisma ORM", role: "Data Access", icon: "/icons/prisma.svg" },
  { id: "postgres", name: "PostgreSQL", role: "Modelado & ACID", icon: "/icons/postgres.svg" },
  { id: "redis", name: "Redis", role: "Caché & WebSockets", icon: "/icons/redis.svg" },
  { id: "docker", name: "Docker", role: "Contenedores & Sandbox", icon: "/icons/docker.svg" },
  { id: "go", name: "Go (Golang)", role: "BitGoTe & Seguridad", icon: "/icons/go.svg" },
  { id: "rabbitmq", name: "RabbitMQ", role: "Saga & Eventos", icon: "/icons/rabbitmq.svg" },
  { id: "nextjs", name: "Next.js", role: "Web & SSR", icon: "/icons/nextjs.svg" },
  { id: "react", name: "React Native", role: "Apps de Campo", icon: "/icons/react.svg" },
  { id: "linux", name: "Linux", role: "nftables & Infra", icon: "/icons/linux.svg" },
];

export default function TechMarqueeBanner() {
  // Duplicamos la lista para que el loop sea infinito y sin cortes
  const loopItems = [...stackLogos, ...stackLogos];

  return (
    <div className="relative w-full border-b border-zinc-800/80 bg-[#0d0e11] overflow-hidden py-3 select-none print:hidden">
      {/* Esfumados laterales para que entren y salgan suave */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0d0e11] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0d0e11] to-transparent z-10" />

      <div className="flex w-max animate-tech-marquee hover:[animation-play-state:paused]">
        {loopItems.map((tech, idx) => (
          <div
            key={`${tech.id}-${idx}`}
            className="mx-2.5 flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 transition-colors shrink-0"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-7 h-7 rounded-md object-contain shrink-0"
            />
            <div className="leading-tight">
              <div className="text-xs font-bold text-zinc-100 font-mono">
                {tech.name}
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                {tech.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
