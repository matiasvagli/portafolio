import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { profileData } from "@/data/profile";

export default function HomeDetailsSection() {
  return (
      <section className="site-container pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] px-6 py-10 sm:px-10 sm:py-12">
          <p className="eyebrow mb-4">HABLEMOS DE TU OPERACIÓN</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">¿Cuántas planillas hacen falta para saber qué está pasando?</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">Contame dónde se traba tu negocio, qué querés construir o qué rol necesitás cubrir.</p>
          <div className="mt-7 flex flex-wrap gap-3"><a href={profileData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="button-primary"><MessageSquare className="h-4 w-4" /> Escribime por WhatsApp</a><Link href="/contacto" className="button-secondary">Enviar una consulta <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
  );
}
