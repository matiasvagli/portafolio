"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowRight, Bell, Check, Circle, FileCheck2, LockKeyhole, Play, RotateCcw, ShieldCheck, Workflow } from "lucide-react";
import { agentTeam, waveLabels } from "@/data/agent-team";

type Agent = (typeof agentTeam)[number];

export default function AgentTeamDemo() {
  const [phase, setPhase] = useState(-1);
  const [selected, setSelected] = useState<Agent>(agentTeam[0]);
  const [approved, setApproved] = useState<string[]>([]);
  const finished = phase >= waveLabels.length;
  const running = phase >= 0 && !finished;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setPhase(phase + 1), 1350);
    return () => window.clearTimeout(timer);
  }, [phase, running]);

  const done = agentTeam.filter(agent => agent.wave < phase);
  const alerts = done.filter(agent => "alert" in agent);
  const approvalActions = done.filter(agent => "approval" in agent);
  const pendingApprovals = approvalActions.length - approved.length;
  const documents = done.reduce((count, agent) => count + agent.documents, 0);
  const selectedDone = selected.wave < phase;
  const selectedRunning = selected.wave === phase;
  const status = finished ? "Simulación finalizada" : running ? waveLabels[phase] : "Lista para iniciar";

  function reset(nextPhase: number) {
    setPhase(nextPhase);
    setApproved([]);
  }

  return (
    <div className="team-console">
      <div className="team-browser">
        <span className="device-controls" aria-hidden="true"><i /><i /><i /></span>
        <span className="team-address"><LockKeyhole size={13} aria-hidden="true" /> operaciones.demo / equipo</span>
        <span className="team-demo-label">Datos ficticios</span>
      </div>
      <div className="team-app-head">
        <div className="team-brand"><span><Workflow size={22} aria-hidden="true" /></span><div><h3>Operaciones del taller</h3><p>Taller Veta · Entorno de simulación</p></div></div>
        <div className="team-run">
          <button type="button" aria-disabled={running} onClick={() => { if (!running) reset(0); }}>
            {finished ? <RotateCcw size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />} {finished ? "Volver a simular" : running ? "Simulando…" : "Simular un día"}
          </button>
          <button type="button" className="team-reset" aria-disabled={phase < 0} onClick={() => { if (phase >= 0) reset(-1); }} aria-label="Reiniciar simulación"><RotateCcw size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="team-progress" role="status"><Activity size={15} aria-hidden="true" />{status}</div>
      <dl className="team-metrics">
        <div><Check size={16} aria-hidden="true" /><dt>Tareas completas</dt><dd>{done.length}<small> / {agentTeam.length}</small></dd></div>
        <div><FileCheck2 size={16} aria-hidden="true" /><dt>Documentos procesados</dt><dd>{documents}</dd></div>
        <div><Bell size={16} aria-hidden="true" /><dt>Alertas detectadas</dt><dd>{alerts.length}</dd></div>
        <div><ShieldCheck size={16} aria-hidden="true" /><dt>Por aprobar</dt><dd>{pendingApprovals}</dd></div>
      </dl>
      <div className="team-workspace">
        <div className="team-roster" role="group" aria-label="Seleccioná un agente">
          {agentTeam.map(agent => (
            <button key={agent.id} type="button" aria-pressed={agent.id === selected.id} aria-controls="team-inspector" onClick={() => setSelected(agent)}>
              <span className="team-avatar" data-tone={agent.tone}><agent.Icon size={16} aria-hidden="true" /></span>
              <span><strong>{agent.name}</strong><small>{agent.wave < phase ? "Completo" : agent.wave === phase ? "En curso" : "En espera"}</small></span>
              {agent.wave < phase ? <Check className="team-task-tick" size={15} aria-hidden="true" /> : <Circle className="team-task-dot" data-running={agent.wave === phase} size={9} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="team-main">
          <div className="team-inspector" id="team-inspector">
            <div className="team-inspector-head">
              <span className="team-avatar" data-tone={selected.tone}><selected.Icon size={23} aria-hidden="true" /></span>
              <div><h4>Agente {selected.name.toLowerCase()}</h4><p>{selected.role}</p></div>
            </div>
            <div className="team-result">
              <span>{selectedDone ? "Resultado" : selectedRunning ? "Trabajando" : "Tarea programada"}</span>
              <strong>{selectedDone ? selected.outcome : selected.task}</strong>
              <small>Fuente · {selected.source}</small>
            </div>
            {selectedDone && "alert" in selected && <p className="team-alert"><Bell size={15} aria-hidden="true" /> {selected.alert}</p>}
            {selectedDone && <p className="team-handoff"><ArrowDownRight size={16} aria-hidden="true" /> {selected.name} <ArrowRight size={14} aria-hidden="true" /> {selected.to}</p>}
          </div>
          <div className="team-activity">
            <h4>Actividad reciente</h4>
            {done.length ? <ol>
              {done.slice(-3).reverse().map(agent => <li key={agent.id}><Check size={14} aria-hidden="true" /><span>{agent.name} compartió su resultado con {agent.to}.</span></li>)}
            </ol> : <p>Iniciá la simulación para ver qué comparte cada agente y cómo avanza el trabajo.</p>}
          </div>
          <div className="team-activity team-approvals">
            <h4>Revisión humana</h4>
            {!approvalActions.length && <p>Acá aparecen las acciones que el equipo deja para tu aprobación.</p>}
            {approvalActions.map(agent => {
              const isApproved = approved.includes(agent.id);
              return (
                <div className="team-approval-row" key={agent.id}>
                  <span>{agent.approval}</span>
                  <button type="button" aria-disabled={isApproved} aria-label={`${isApproved ? "Aprobado en demo" : "Aprobar en demo"}: ${agent.approval.toLowerCase()}`} onClick={() => {
                    setApproved(current => current.includes(agent.id) ? current : [...current, agent.id]);
                  }}>{isApproved ? "Aprobado en demo" : "Aprobar en demo"}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
