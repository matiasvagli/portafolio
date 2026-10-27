import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TechMarqueeBanner from "@/components/ui/TechMarqueeBanner";

export const metadata: Metadata = {
  title: "Matías Vagliviello — Backend, ERPs y sistemas a medida",
  description:
    "Desarrollo backends, ERPs y aplicaciones que conectan operaciones reales. Conocé mis últimos trabajos: Sistema Zona, Futboliga y herramientas open source.",
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
        <main id="contenido" className="min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
