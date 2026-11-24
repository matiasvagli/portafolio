import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { profileData } from "@/data/profile";
import { firstContactUrl } from "@/lib/whatsapp";

export default function ContactSection({ formAvailable }: { formAvailable: boolean }) {
  return (
    <div className="commercial-page">
      <section className="commercial-shell contact-page" aria-labelledby="contact-title">
        <div className="contact-intro">
          <h1 className="commercial-title" id="contact-title">Contame qué necesitás para tu negocio.</h1>
          <p>Pasame tu web, tu Instagram o contame cómo te llegan los pedidos hoy. Si veo algo que puedo resolver, te propongo una primera entrega con alcance y precio para que decidas.</p>
          <div className="contact-channels">
            <a href={firstContactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" /> Escribirme por WhatsApp <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={`mailto:${profileData.email}`}><Mail size={20} aria-hidden="true" /> {profileData.email}</a>
          </div>
        </div>
        <ContactForm available={formAvailable} />
      </section>
    </div>
  );
}
