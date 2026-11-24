import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { visitorPaths } from "@/data/visitor-paths";
import AgentTeamDemo from "./AgentTeamDemo";
import "./agent-team.css";

const aiPath = visitorPaths.find(path => path.id === "ia");

export default function AgentTeamSection() {
  return (
    <section className="agent-team-section studio-section" id="agentes" aria-labelledby="agent-team-title">
      <div className="commercial-shell">
        <header className="studio-heading">
          <p className="studio-kicker">Inteligencia artificial aplicada</p>
          <h2 className="commercial-title" id="agent-team-title">Tu equipo digital.</h2>
          <p>Una ayuda inteligente para cada área de tu negocio. Probá cómo ocho agentes trabajan en paralelo, se pasan información y te dejan las decisiones que requieren tu aprobación.</p>
        </header>
        <AgentTeamDemo />
        <div className="team-section-footer">
          <p><ShieldCheck size={22} aria-hidden="true" /> Conectados a tus sistemas, con permisos definidos, tareas a medida y supervisión humana.</p>
          <Link href={{ pathname: "/contacto", query: { asunto: aiPath?.topic } }} className="team-footer-link">Hablemos de tus agentes <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
