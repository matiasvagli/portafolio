import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

export default function CommercialHero() {
  return (
    <section className="commercial-shell studio-hero" aria-labelledby="home-title">
      <div className="studio-hero-copy">
        <p className="studio-kicker">Desarrollo digital a medida</p>
        <h1 id="home-title">Creamos lo que imaginás.<br /><em>Optimizamos lo que ya&nbsp;tenés.</em></h1>
        <p>Transformamos ideas en proyectos digitales y ayudamos a negocios a funcionar mejor. Desarrollamos webs, aplicaciones, sistemas y agentes de IA adaptados a vos.</p>
        <div className="commercial-actions">
          <a className="commercial-button" href="#contacto">Contame tu idea <ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="commercial-button commercial-button--plain" href="#soluciones">Explorá las soluciones <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <HeroShowcase />
    </section>
  );
}
