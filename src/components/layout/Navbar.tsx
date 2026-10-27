"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, FileText, Menu, Terminal, X } from "lucide-react";
import { profileData } from "@/data/profile";

const navRoutes = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/casos" },
  { label: "Cómo trabajo", href: "/como-trabajo" },
  { label: "Open source", href: "/open-source" },
  { label: "Webs en vivo", href: "/landings" },
];

export default function Navbar() {
  const pathname = usePathname();
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
    <header className="sticky inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-[#0a0a0b]/95 backdrop-blur-md print:hidden">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded focus:bg-amber-400 focus:p-3 focus:text-zinc-950">Saltar al contenido</a>
      <div className="site-container flex h-[76px] items-center justify-between gap-4">
        <Link href="/" onClick={() => setMobileOpen(false)} className="group flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 group-hover:border-amber-400/60"><Terminal className="h-4 w-4 text-amber-400" /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-bold tracking-tight sm:text-base">{profileData.name}</span><span className="block truncate text-[10px] text-zinc-400 sm:text-xs">Backend & sistemas a medida</span></span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden shrink-0 items-center gap-0.5 xl:flex">
          {navRoutes.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`whitespace-nowrap rounded-md px-3 py-2.5 text-xs transition-colors ${pathname === item.href ? "bg-zinc-800 text-amber-300" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>{item.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/cv" className="hidden min-h-10 items-center gap-1.5 rounded-lg px-3 text-xs text-zinc-400 hover:text-white sm:inline-flex"><FileText className="h-3.5 w-3.5" /> CV</Link>
          <Link href="/contacto" className="hidden min-h-10 items-center gap-1.5 rounded-lg bg-amber-400 px-4 text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-300 sm:inline-flex">Hablemos <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          <button ref={menuButton} type="button" aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(value => !value)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 xl:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileOpen && <nav id="mobile-menu" aria-label="Navegación móvil" className="site-container max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-zinc-800 py-4 xl:hidden">
        {[...navRoutes, { label: "Contacto", href: "/contacto" }, { label: "Ver CV / guardar PDF", href: "/cv" }].map(item => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className={`block rounded-lg px-3 py-3 text-sm ${pathname === item.href ? "bg-zinc-900 text-amber-300" : "text-zinc-300 hover:bg-zinc-900"}`}>{item.label}</Link>)}
      </nav>}
    </header>
  );
}
