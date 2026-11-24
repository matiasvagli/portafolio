import type { Metadata } from "next";
import "./globals.css";
import "@/components/commercial/commercial.css";
import "@/components/commercial/catalog.css";
import "@/components/commercial/catalog-phone.css";
import "@/components/commercial/solutions.css";
import "@/components/commercial/sales-previews.css";
import "@/components/commercial/landing-previews.css";
import "@/components/commercial/contact.css";
import "@/components/commercial/portfolio-pages.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Matías Vagliviello | Webs, sistemas y agentes de IA para comercios",
    template: "%s | Matías Vagliviello",
  },
  description: "Desarrollo webs, tiendas y sistemas a medida. Integro ventas por WhatsApp, agentes de IA, stock y facturación electrónica con ARCA.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0a0b] text-zinc-100 antialiased selection:bg-amber-500/25 selection:text-amber-200 bg-engineering-grid">
        <Navbar />
        <main id="contenido" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
