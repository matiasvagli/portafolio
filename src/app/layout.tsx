import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { personalData, getSiteTitle } from "@/config/personalData";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: getSiteTitle(),
  description: personalData.description,
  keywords: personalData.keywords,
  authors: [{ name: personalData.name }],
  openGraph: {
    title: getSiteTitle(),
    description: personalData.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
