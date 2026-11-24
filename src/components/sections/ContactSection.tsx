import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { profileData } from "@/data/profile";
import type { ContactFormInput } from "@/schemas/contact.schema";
import { firstContactUrl, whatsappDraft } from "@/lib/whatsapp";

export default function ContactSection({ formAvailable, topic, loadDraft }: { formAvailable: boolean; topic?: ContactFormInput["asunto"]; loadDraft: boolean }) {
  const whatsapp = topic ? whatsappDraft(`Hola, Matías. Vi tu web. ${topic} y me gustaría charlar sobre eso.`) : firstContactUrl;

  return (
    <div className="commercial-page">
      <section className="commercial-shell contact-page" aria-labelledby="contact-title">
        <div className="contact-intro">
          <h1 className="commercial-title" id="contact-title">No necesitás tener todo resuelto para empezar.</h1>
          <p>Podés traer una idea, un proyecto en marcha o un problema que todavía no sabés cómo encarar. Contame en qué estás y vemos qué paso te conviene dar.</p>
          <div className="contact-channels">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" /> Escribirme por WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={`mailto:${profileData.email}`}><Mail size={20} aria-hidden="true" /> {profileData.email}</a>
          </div>
        </div>
        <ContactForm key={`${topic ?? ""}:${loadDraft}`} available={formAvailable} topic={topic} loadDraft={loadDraft} />
      </section>
    </div>
  );
}
