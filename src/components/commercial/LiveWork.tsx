import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import DevicePreview from "./DevicePreview";
import { productionLandings } from "@/data/open-source";

export default function LiveWork({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const CardHeading = standalone ? "h2" : "h3";

  return (
    <section id="trabajos" tabIndex={-1} className="commercial-shell live-work" aria-labelledby="live-work-title">
      <div className="work-heading">
        <Heading className="commercial-title" id="live-work-title">{standalone ? "Webs que podés recorrer" : "Proyectos que ya podés explorar"}</Heading>
        <p>Sitios publicados y casos de aplicaciones y sistemas. Recorré el resultado y mirá qué resolvió cada proyecto.</p>
      </div>
      <div className="work-grid">
        {productionLandings.map(site => (
          <article key={site.name} className="work-card">
            <DevicePreview address={new URL(site.url).hostname}>
              <div className="work-image">
                <Image src={site.image} alt={`Captura de ${site.name}`} width={1000} height={521} sizes="(min-width: 1000px) 390px, (min-width: 641px) 45vw, 90vw" />
              </div>
            </DevicePreview>
            <div className="work-info">
              <p className="work-niche">{site.niche}</p>
              <CardHeading>{site.name}</CardHeading>
              <p className="work-description">{site.description}</p>
              <p className="work-feature">{site.impact}</p>
              <a href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar sitio de ${site.name}`} className="work-link">Visitar sitio <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <Link className="work-link work-case-link" href="/casos">Ver casos de sistemas y aplicaciones <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}
