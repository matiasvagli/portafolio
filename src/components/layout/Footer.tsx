import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="commercial-footer print:hidden">
      <div className="commercial-shell commercial-footer-inner">
        <Link href="/" className="commercial-signature">
          <Image className="signature-logo" src="/comercial/logo-mv.webp" width={192} height={114} alt="" />
          <span><strong>{profileData.name}</strong><span>Desarrollo digital a medida</span></span>
        </Link>
        <nav aria-label="Más sobre mi trabajo">
          <Link href="/casos">Casos de estudio</Link>
          <Link href="/landings">Webs en vivo</Link>
          <Link href="/como-trabajo">Cómo trabajo</Link>
          <Link href="/open-source">Open source</Link>
          <Link href="/cv">CV</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
        <div className="commercial-social">
          <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} aria-hidden="true" /></a>
          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} aria-hidden="true" /></a>
          <a href={`mailto:${profileData.email}`} aria-label="Email"><Mail size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
