import { ClipboardList, Factory, ScanLine, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import "../ai-assessment-demo.css";

const scenarios = [
  {
    id: "margen", label: "Margen", Icon: TrendingUp,
    problem: "Los presupuestos tardan en salir y algunos pedidos se cierran con poco margen.",
    options: [
      {
        name: "Cotizador con reglas",
        setup: "Bajo · Configurar costos y margen mínimo",
        maintenance: "Bajo · Mantener los precios al día",
        benefit: "Cotizar más rápido y cuidar el margen de cada pedido.",
      },
      {
        name: "Asistente de presupuestos con IA",
        setup: "Medio · Conectar catálogo y consultas",
        maintenance: "Medio · Consumo y revisión de borradores",
        benefit: "Preparar cotizaciones a partir de consultas con texto libre.",
      },
    ],
    recommendation: "Empezar con el cotizador si el precio se calcula con reglas repetibles.",
    metric: "Margen por pedido y tiempo de cotización.",
  },
  {
    id: "produccion", label: "Producción", Icon: Factory,
    problem: "El equipo pierde tiempo pasando a producción pedidos que llegan en audios, mensajes y fotos.",
    options: [
      {
        name: "Formulario de órdenes",
        setup: "Bajo · Definir campos y flujo de carga",
        maintenance: "Bajo · Actualizar campos cuando cambie el proceso",
        benefit: "Recibir datos completos y evitar idas y vueltas antes de producir.",
      },
      {
        name: "Captura de pedidos con IA",
        setup: "Medio · Conectar canales y validar los datos extraídos",
        maintenance: "Medio · Consumo y revisión de órdenes",
        benefit: "Convertir mensajes, audios y fotos en borradores de órdenes.",
      },
    ],
    recommendation: "Probar la captura con IA en un canal si gran parte de los pedidos llega en formatos distintos.",
    metric: "Tiempo de carga y errores por orden.",
  },
  {
    id: "control", label: "Control", Icon: ScanLine,
    problem: "Las diferencias de stock se descubren tarde, cuando ya faltan productos o toca reponer de urgencia.",
    options: [
      {
        name: "Alertas por diferencias de stock",
        setup: "Bajo · Conectar el inventario y definir umbrales",
        maintenance: "Bajo · Ajustar las alertas",
        benefit: "Detectar faltantes o descuadres al registrar un movimiento.",
      },
      {
        name: "Detección de patrones con IA",
        setup: "Alto · Preparar históricos y validar patrones",
        maintenance: "Medio · Revisar alertas y calidad de datos",
        benefit: "Priorizar desvíos atípicos por producto o sucursal.",
      },
    ],
    recommendation: "Empezar con alertas por diferencias. Evaluar la IA si hay buen historial y los desvíos siguen sin explicación.",
    metric: "Pérdidas de inventario y tiempo de detección.",
  },
];

export default function AIAssessmentDemo() {
  const [selected, setSelected] = useState(0);
  const scenario = scenarios[selected];

  return (
    <div className="demo-window ai-assessment">
      <div className="preview-app-bar">
        <span><ClipboardList size={18} aria-hidden="true" /> Diagnóstico de oportunidades</span>
        <span>Costos orientativos</span>
      </div>
      <div className="ai-assessment-body">
        <fieldset className="ai-assessment-picker">
          <legend>¿Qué querés mejorar?</legend>
          <div className="ai-assessment-options">
            {scenarios.map(({ id, label, Icon }, index) => (
              <label key={id}>
                <input type="radio" name="ai-assessment-scenario" value={id} checked={selected === index} onChange={() => setSelected(index)} />
                <span><Icon size={16} aria-hidden="true" />{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="ai-assessment-results" aria-live="polite">
          <p className="ai-assessment-problem">{scenario.problem}</p>
          <div className="ai-assessment-comparison">
            {scenario.options.map(option => (
              <article className="ai-assessment-card" key={option.name}>
                <h4>{option.name}</h4>
                <dl>
                  <div><dt>Costo inicial</dt><dd>{option.setup}</dd></div>
                  <div><dt>Costo recurrente</dt><dd>{option.maintenance}</dd></div>
                  <div><dt>Beneficio esperado</dt><dd>{option.benefit}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className="ai-assessment-recommendation">
            <Target size={19} aria-hidden="true" />
            <div>
              <h4>Por dónde empezar</h4>
              <p>{scenario.recommendation}</p>
              <p><strong>Qué medir</strong> · {scenario.metric}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
