import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { profileData } from "@/data/profile";

export default function ContactSection({ formAvailable }: { formAvailable: boolean }) {
  return (
    <section className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="min-w-0">
        <p className="eyebrow mb-5">CONTACTO DIRECTO</p>
        <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">Contame dónde<br />se traba tu negocio.</h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">Un sistema nuevo, una operación que creció o un equipo que necesita backend. Empecemos por lo que necesitás resolver.</p>
        <div className="mt-8 space-y-3">
          <a href={profileData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.04] p-4 sm:p-5"><MessageSquare className="h-5 w-5 shrink-0 text-amber-400" /><span className="min-w-0"><span className="block text-xs text-zinc-400">WhatsApp directo</span><span className="mt-1 block text-sm font-semibold sm:text-base">{profileData.phone}</span></span><ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-amber-300" /></a>
          <a href={`mailto:${profileData.email}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5"><Mail className="h-5 w-5 shrink-0 text-zinc-400" /><span className="min-w-0"><span className="block text-xs text-zinc-400">Email</span><span className="mt-1 block break-all text-sm font-semibold sm:text-base">{profileData.email}</span></span><ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-zinc-400" /></a>
        </div>
        <div className="mt-6 flex flex-wrap gap-5 text-xs text-zinc-400"><a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-amber-300"><Github className="h-4 w-4" /> GitHub</a><a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 hover:text-amber-300"><Linkedin className="h-4 w-4" /> LinkedIn</a><Link href="/cv" className="py-2 hover:text-amber-300">Ver CV / PDF</Link></div>
      </div>
      <ContactForm available={formAvailable} />
    </section>
  );
}
