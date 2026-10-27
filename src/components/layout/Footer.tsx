import Link from "next/link";
import { Terminal, Github, Linkedin, Mail, FileText } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0a0a0b] py-10">
      <div className="w-full max-w-[1680px] mx-auto px-6 sm:px-10 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              {profileData.name} ·{" "}
              <span className="font-mono text-amber-500">{profileData.handle}</span>
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Menos código, más criterio · DDD · Clean Architecture · Sistemas Reales
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
          <Link href="/casos" className="hover:text-zinc-100 px-2 py-1">
            Casos Reales
          </Link>
          <Link href="/como-trabajo" className="hover:text-zinc-100 px-2 py-1">
            Cómo Trabajo
          </Link>
          <Link href="/open-source" className="hover:text-zinc-100 px-2 py-1">
            Open Source
          </Link>
          <Link href="/landings" className="hover:text-zinc-100 px-2 py-1">
            Landings
          </Link>
          <Link href="/contacto" className="hover:text-zinc-100 px-2 py-1">
            Contacto
          </Link>
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <Link
            href="/cv"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-200"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>CV / PDF</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
