"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profileData } from "@/data/profile";

const sections = [
  { label: "Qué puedo hacer", anchor: "soluciones" },
  { label: "Trabajos", anchor: "trabajos" },
  { label: "Contacto", anchor: "contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const SectionLink = pathname === "/" ? "a" : Link;
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="commercial-nav print:hidden">
      <a href="#contenido" className="sr-only commercial-skip">Saltar al contenido</a>
      <div className="commercial-shell commercial-nav-inner">
        <Link href="/" className="commercial-signature" onClick={() => setMobileOpen(false)}>
          <Image className="signature-logo" src="/comercial/logo-mv.webp" width={192} height={114} alt="" />
          <span><strong>{profileData.name}</strong><span>Desarrollo freelance</span></span>
        </Link>
        <button ref={menuButton} type="button" aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} aria-controls="commercial-menu" onClick={() => setMobileOpen(value => !value)} className="commercial-menu-toggle">
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav aria-label="Navegación principal" id="commercial-menu" data-open={mobileOpen}>
          {sections.map(({ label, anchor }) => (
            <SectionLink href={pathname === "/" ? `#${anchor}` : `/#${anchor}`} key={anchor} onClick={() => setMobileOpen(false)} className={anchor === "contacto" ? "commercial-nav-contact" : undefined}>
              {label}{anchor === "contacto" && <ArrowUpRight size={17} aria-hidden="true" />}
            </SectionLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
