import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { productionLandings } from "@/data/open-source";

export default function LiveWork({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const CardHeading = standalone ? "h2" : "h3";

  return (
    <section id="trabajos" tabIndex={-1} className="commercial-shell live-work" aria-labelledby="live-work-title">
      <div className="work-heading">
        <Heading className="commercial-title" id="live-work-title">Webs que podés recorrer</Heading>
        <p>Te muestro tres sitios que desarrollé. Entrá a cualquiera y probá cómo funciona.</p>
      </div>
      <div className="work-grid">
        {productionLandings.map(site => (
          <article key={site.name} className="work-card">
            <div className="work-image">
              <Image src={site.image} alt={`Captura de ${site.name}`} width={1000} height={521} sizes="(min-width: 1000px) 390px, (min-width: 641px) 45vw, 90vw" />
            </div>
            <div className="work-info">
              <p className="work-niche">{site.niche}</p>
              <CardHeading>{site.name}</CardHeading>
              <p className="work-description">{site.description}</p>
              <a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar sitio de ${site.name}`} className="work-link">Visitar sitio <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <Link className="work-link work-case-link" href="/casos">Ver casos de sistemas y aplicaciones <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}
