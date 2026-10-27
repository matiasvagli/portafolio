"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Github, FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "@/data/profile";

const navRoutes = [
  { label: "Inicio", href: "/" },
  { label: "Casos Reales", href: "/casos" },
  { label: "Cómo Trabajo (DDD & DB)", href: "/como-trabajo" },
  { label: "Open Source", href: "/open-source" },
  { label: "Landings en Vivo", href: "/landings" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center group-hover:border-amber-500/70 transition-colors">
            <Terminal className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold tracking-tight text-zinc-100 text-base">
                {profileData.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-zinc-700">
                42 AÑOS · VIGENTE
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              Arquitectura Backend · DDD · Sistemas Críticos
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 rounded-lg p-1">
          {navRoutes.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-xs font-mono transition-all ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>matiasvagli</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>

          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold text-zinc-950 bg-zinc-100 hover:bg-amber-400 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV / PDF</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Abrir menú"
          className="xl:hidden p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-[#0a0a0b] border-b border-zinc-800 px-6 pt-3 pb-6"
          >
            <div className="flex flex-col gap-1.5">
              {navRoutes.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3.5 py-2.5 rounded-lg text-sm font-mono ${
                      isActive
                        ? "bg-amber-500 text-zinc-950 font-bold"
                        : "text-zinc-200 hover:bg-zinc-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-zinc-800 flex gap-3">
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-white"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <Link
                  href="/cv"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-bold bg-zinc-100 text-zinc-950"
                >
                  <FileText className="w-4 h-4" />
                  CV / PDF
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
