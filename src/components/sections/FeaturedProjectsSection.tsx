import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import ProjectNotebook from "@/components/ui/ProjectNotebook";
import { workingSteps } from "@/data/home";
import { openSourceTools } from "@/data/open-source";
import "./featured-projects.css";

export default function FeaturedProjectsSection() {
  return (
    <section id="proyectos" className="site-container featured-work-section scroll-mt-24">
      <div className="featured-work-heading">
        <p className="eyebrow mb-2">UNA MUESTRA DE LO QUE CONSTRUYO</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Mis últimos trabajos, en acción.</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">Dos casos recientes. Más sistemas, webs y herramientas en mis proyectos.</p>
      </div>
      <div className="featured-work-grid">
        <aside className="featured-method" aria-labelledby="featured-method-title">
          <p className="eyebrow mb-3">CÓMO TRABAJO</p>
          <h3 id="featured-method-title" className="featured-aside-title">Primero entender. <br />Después construir.</h3>
          <ol className="featured-method-steps">
            {workingSteps.map(step => <li key={step.number}><span className="featured-step-number">/{step.number}</span><div><h4>{step.title}</h4><p>{step.description}</p></div></li>)}
          </ol>
          <Link href="/como-trabajo" className="featured-aside-link">Ver el método <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </aside>
        <div className="featured-demo">
          <ProjectNotebook />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-zinc-500">Esto es una parte.</span>
            <Link href="/casos" className="inline-flex min-h-11 items-center gap-2 font-semibold text-amber-300 hover:text-amber-200">Ver más proyectos <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <aside className="featured-open-source" aria-labelledby="featured-open-source-title">
          <p className="eyebrow mb-3">TAMBIÉN CONSTRUYO EN ABIERTO</p>
          <h3 id="featured-open-source-title" className="featured-aside-title">El código también <br />se puede mirar.</h3>
          <p className="featured-aside-copy">Herramientas para trabajar con IA, proteger credenciales y compartir conocimiento.</p>
          <ul className="featured-tools">
            {openSourceTools.slice(0, 3).map(tool => <li key={tool.id}><a href={tool.repoUrl} target="_blank" rel="noopener noreferrer"><span>{tool.name.split(" 🥸")[0]}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0" /></a><p>{tool.tagline}</p></li>)}
          </ul>
          <Link href="/open-source" className="featured-aside-link"><Github className="h-3.5 w-3.5" /> Más open source <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </aside>
      </div>
    </section>
  );
}
