import Link from "next/link";
import { ArrowRight, ChevronDown, ClipboardCheck, MessageSquare, Rocket } from "lucide-react";
import { engineeringPillars } from "@/data/engineering";
import { profileData } from "@/data/profile";

const steps = [
  {
    title: "Entiendo cómo trabajás",
    description: "Vemos juntos cómo llegan las consultas, qué datos necesitás y dónde se pierde tiempo. Me podés mostrar tu web, tu Instagram o las herramientas que ya usás.",
    Icon: MessageSquare,
  },
  {
    title: "Definimos una primera entrega",
    description: "Te paso el alcance y el precio antes de arrancar. Puede ser una web para recibir consultas, un agente que atienda por WhatsApp o una parte de tu sistema de gestión.",
    Icon: ClipboardCheck,
  },
  {
    title: "Lo probamos y lo ponemos en marcha",
    description: "Recorremos casos reales de tu negocio desde el celular o la compu. Ajusto lo que haga falta y dejamos claro cómo usarlo y qué podemos sumar después.",
    Icon: Rocket,
  },
];

export default function EngineeringSection() {
  return (
    <section className="commercial-shell portfolio-inner">
      <header className="portfolio-heading">
        <h1 className="commercial-title">Cómo trabajo</h1>
        <p>Me mostrás cómo vendés y cómo te organizás hoy. A partir de eso, te propongo una primera entrega que puedas probar y usar en tu negocio.</p>
      </header>

      <ol className="method-steps" aria-label="Etapas del trabajo">
        {steps.map(({ title, description, Icon }) => (
          <li key={title}>
            <span className="method-icon"><Icon size={22} aria-hidden="true" /></span>
            <h2>{title}</h2>
            <p>{description}</p>
          </li>
        ))}
      </ol>

      <section className="method-technical" aria-labelledby="method-technical-title">
        <h2 id="method-technical-title">Cómo construyo los sistemas</h2>
        <p>Así pruebo las reglas del negocio, cuido los datos y verifico que el sistema responda bien cuando crece.</p>
        <div className="method-accordion">
          {engineeringPillars.map(pillar => (
            <details key={pillar.id} className="portfolio-expand">
              <summary>{pillar.title}<ChevronDown size={18} aria-hidden="true" /></summary>
              <div className="portfolio-expand-body method-pillar">
                <p>{pillar.summary}</p>
                <ul>{pillar.principles.map(principle => <li key={principle}>{principle}</li>)}</ul>
                <h3>{pillar.codeTitle}</h3>
                <pre tabIndex={0} aria-label={`Ejemplo de código en ${pillar.codeLanguage}`}><code>{pillar.codeSnippet}</code></pre>
              </div>
            </details>
          ))}
          <details id="stack" className="portfolio-expand">
            <summary>Tecnologías que uso <ChevronDown size={18} aria-hidden="true" /></summary>
            <div className="portfolio-expand-body method-stack">
              {profileData.stackCategories.map(category => (
                <div key={category.id}>
                  <h3>{category.title}</h3>
                  <dl>{category.items.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.detail}</dd></div>)}</dl>
                </div>
              ))}
            </div>
          </details>
        </div>
        <div className="method-links">
          <Link href="/casos" className="work-link">Ver casos de estudio <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link href="/open-source" className="work-link">Ver trabajos open source <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </section>
  );
}
