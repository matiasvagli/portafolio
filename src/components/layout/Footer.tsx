import Link from "next/link";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0a0a0b] py-8 print:hidden">
      <div className="site-container flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3"><Terminal className="h-5 w-5 shrink-0 text-amber-400" /><div className="min-w-0"><p className="text-sm font-semibold">{profileData.name}</p><p className="mt-0.5 text-xs text-zinc-500">Criterio de negocio. Código en producción.</p></div></div>
        <nav aria-label="Enlaces al pie" className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-zinc-400"><Link href="/casos" className="hover:text-white">Proyectos</Link><Link href="/como-trabajo" className="hover:text-white">Cómo trabajo</Link><Link href="/open-source" className="hover:text-white">Open source</Link><Link href="/landings" className="hover:text-white">Webs en vivo</Link><Link href="/contacto" className="hover:text-white">Contacto</Link></nav>
        <div className="flex items-center gap-2 text-zinc-400">
          <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg border border-zinc-800 p-3 hover:text-amber-300"><Github className="h-4 w-4" /></a>
          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg border border-zinc-800 p-3 hover:text-amber-300"><Linkedin className="h-4 w-4" /></a>
          <a href={`mailto:${profileData.email}`} aria-label="Email" className="rounded-lg border border-zinc-800 p-3 hover:text-amber-300"><Mail className="h-4 w-4" /></a>
          <Link href="/cv" className="px-3 py-2 text-xs hover:text-white">CV / PDF</Link>
        </div>
      </div>
    </footer>
  );
}
