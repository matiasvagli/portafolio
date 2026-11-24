import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/data/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Matías Vagliviello",
  },
  description: siteDescription,
  openGraph: { siteName: "MatiasVagliDev", locale: "es_AR", type: "website", title: siteTitle, description: siteDescription },
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
