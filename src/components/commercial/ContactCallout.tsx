import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { profileData } from "@/data/profile";
import { firstContactUrl } from "@/lib/whatsapp";

export default function ContactCallout() {
  return (
    <section id="contacto" tabIndex={-1} className="commercial-shell contact-callout" aria-labelledby="contact-callout-title">
      <div className="contact-callout-inner">
        <div className="contact-callout-copy">
          <h2 className="commercial-title" id="contact-callout-title">¿Cómo te llegan los pedidos hoy?</h2>
          <p>Pasame tu web, tu Instagram o contame cómo trabajás. Si veo algo que puedo resolver, te propongo una primera entrega con alcance y precio para que decidas.</p>
          <div className="commercial-actions">
            <a className="commercial-button" href={firstContactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> Escribirme por WhatsApp</a>
            <Link className="commercial-button commercial-button--plain" href="/contacto">Prefiero el formulario <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <figure className="contact-portrait">
          <Image src={profileData.avatar} alt="" width={180} height={180} sizes="(min-width: 761px) 180px, 50px" />
          <figcaption>{profileData.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}
