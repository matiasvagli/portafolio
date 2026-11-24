import Image from "next/image";

const steps = [
  { title: "Investigamos el problema", detail: "Entendemos para quién es tu idea, qué necesita esa persona y cómo lo resuelve hoy." },
  { title: "Construimos el MVP", detail: "Elegimos la tecnología y armamos una primera versión con lo esencial para probar la idea." },
  { title: "Validamos con usuarios", detail: "Observamos cómo usan esa versión, escuchamos sus comentarios y decidimos qué ajustar." },
];

export default function IdeaValidation() {
  return (
    <div className="solution-idea">
      <Image
        className="solution-idea-image"
        src="/comercial/idea-mvp.webp"
        width={1458}
        height={720}
        alt="Un equipo organiza en una pizarra la investigación, la tecnología y las pruebas con usuarios de su primera versión."
      />
      <ol className="solution-idea-steps" role="list">
        {steps.map(({ title, detail }) => (
          <li key={title}>
            <h4>{title}</h4>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
