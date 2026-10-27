import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechMarqueeBanner from "@/components/ui/TechMarqueeBanner";

export const metadata: Metadata = {
  title: "Matías Vagliviello (@matiasvagli) — Backend Architect · DDD · Sistemas Críticos",
  description:
    "Desarrollador Backend de 42 años 100% vigente. Especialista en entender problemas reales de negocio y resolverlos con arquitectura limpia (DDD, Django, NestJS, Prisma, PostgreSQL, Redis, Docker, MCP Servers & RAG).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0a0b] text-zinc-100 antialiased selection:bg-amber-500/25 selection:text-amber-200 bg-engineering-grid">
        <Navbar />
        <TechMarqueeBanner />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
