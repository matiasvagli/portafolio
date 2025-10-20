interface Habilidad {
  nombre: string
  nivel: 'Profesional' | 'Sólido' | 'Intermedio' | 'En Progreso' | 'Iniciando' | 'Básico'
  categoria:
    | 'Lenguajes'
    | 'Frontend'
    | 'Backend'
    | 'Bases de Datos'
    | 'DevOps & Deploy'
    | 'Herramientas'
    | 'IA & Automatización'
    | 'Blockchain'
    | 'Fundamentos'
  nota?: string
}

const ICON_BY_CATEGORY: Record<string, string> = {
  Lenguajes: '🚀',
  Frontend: '💻',
  Backend: '⚙️',
  'Bases de Datos': '🛢️',
  'DevOps & Deploy': '🐳',
  Herramientas: '🧰',
  'IA & Automatización': '🤖',
  Blockchain: '⛓️',
  Fundamentos: '🧠'
}

const nivelClasses = (nivel: Habilidad['nivel']) => {
  switch (nivel) {
    case 'Profesional':
      return { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-100' }
    case 'Sólido':
      return { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-100' }
    case 'Intermedio':
      return { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-100' }
    case 'En Progreso':
      return { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-100' }
    case 'Iniciando':
      return { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-100' }
    case 'Básico':
      return { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-200' }
    default:
      return { bg: 'bg-gray-400', text: 'text-gray-400', border: 'border-gray-200' }
  }
}

export default function Habilidades() {
  const habilidades: Habilidad[] = [
    // Lenguajes
    { nombre: 'JavaScript', nivel: 'Sólido', categoria: 'Lenguajes' },
    { nombre: 'TypeScript', nivel: 'Sólido', categoria: 'Lenguajes' },
    { nombre: 'Python', nivel: 'Sólido', categoria: 'Lenguajes' },
    { nombre: 'Golang', nivel: 'Iniciando', categoria: 'Lenguajes' },

    // Frontend
    { nombre: 'React', nivel: 'Sólido', categoria: 'Frontend', nota: 'SSR / CSR / SPA' },
    { nombre: 'Next.js', nivel: 'Sólido', categoria: 'Frontend', nota: 'SSR / SSG / ISR / App Router' },
    { nombre: 'HTML & CSS', nivel: 'Sólido', categoria: 'Frontend' },
    { nombre: 'Tailwind CSS', nivel: 'Sólido', categoria: 'Frontend' },
    { nombre: 'Bootstrap', nivel: 'Intermedio', categoria: 'Frontend' },

    // Backend
    { nombre: 'Node.js (Express)', nivel: 'Intermedio', categoria: 'Backend' },
    { nombre: 'Django', nivel: 'Sólido', categoria: 'Backend' },
    { nombre: 'FastAPI', nivel: 'Sólido', categoria: 'Backend' },
    { nombre: 'REST APIs / JWT / MVC', nivel: 'Sólido', categoria: 'Backend' },
    { nombre: 'Microservicios', nivel: 'En Progreso', categoria: 'Backend', nota: 'Arquitectura básica' },

    // Bases de Datos
    { nombre: 'PostgreSQL', nivel: 'Sólido', categoria: 'Bases de Datos' },
    { nombre: 'MySQL', nivel: 'Sólido', categoria: 'Bases de Datos' },
    { nombre: 'MongoDB', nivel: 'Intermedio', categoria: 'Bases de Datos' },
  { nombre: 'ORMs: Prisma, Sequelize, Django ORM, SQLAlchemy', nivel: 'Sólido', categoria: 'Bases de Datos' },
  { nombre: 'Redis', nivel: 'Iniciando', categoria: 'Bases de Datos', nota: 'Cache, session store y Pub/Sub' },

    // DevOps & Deploy
    { nombre: 'Docker / Docker Compose', nivel: 'Sólido', categoria: 'DevOps & Deploy' },
    { nombre: 'Vercel, Render, Railway', nivel: 'Profesional', categoria: 'DevOps & Deploy', nota: 'Deploy en producción' },
    { nombre: 'Nginx', nivel: 'En Progreso', categoria: 'DevOps & Deploy' },
    { nombre: 'Cloudflare (DNS, SSL)', nivel: 'Profesional', categoria: 'DevOps & Deploy' },

    // Herramientas
    { nombre: 'Git / GitHub', nivel: 'Sólido', categoria: 'Herramientas' },
    { nombre: 'Postman / Insomnia / ThunderClient', nivel: 'Sólido', categoria: 'Herramientas' },
    { nombre: 'VS Code', nivel: 'Profesional', categoria: 'Herramientas' },
    { nombre: 'Figma (colaboración)', nivel: 'Intermedio', categoria: 'Herramientas' },
    { nombre: 'CI/CD (GitHub Actions)', nivel: 'Básico', categoria: 'Herramientas' },

    // IA & Automatización
    { nombre: 'OpenAI API / LangChain', nivel: 'Básico', categoria: 'IA & Automatización' },
    { nombre: 'Chatbots e Integraciones', nivel: 'Intermedio', categoria: 'IA & Automatización' },

    // Blockchain
    { nombre: 'Solidity (basics)', nivel: 'Básico', categoria: 'Blockchain' },
    { nombre: 'Web3.js / Ethers.js', nivel: 'Básico', categoria: 'Blockchain' },

    // Fundamentos
    { nombre: 'Clean Code / Buenas prácticas', nivel: 'Sólido', categoria: 'Fundamentos' },
    { nombre: 'SOLID', nivel: 'Sólido', categoria: 'Fundamentos' },
    { nombre: 'Estructuras de Datos y Algoritmos', nivel: 'Sólido', categoria: 'Fundamentos' },
    { nombre: 'Patrones de diseño', nivel: 'En Progreso', categoria: 'Fundamentos' }
  ]

  const categorias = [
    'Lenguajes',
    'Frontend',
    'Backend',
    'Bases de Datos',
    'DevOps & Deploy',
    'Herramientas',
    'IA & Automatización',
    'Blockchain',
    'Fundamentos'
  ] as const

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Habilidades Técnicas</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mt-2">Resumen profesional y niveles de experiencia — diseño compacto y limpio.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map((categoria) => (
            <div key={categoria} className="p-3 border rounded-lg bg-white hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center text-lg">
                  {ICON_BY_CATEGORY[categoria]}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{categoria}</h3>
              </div>

              <ul className="divide-y divide-gray-100">
                {habilidades
                  .filter((h) => h.categoria === categoria)
                  .map((h, idx) => {
                    const c = nivelClasses(h.nivel)
                    return (
                      <li key={idx} className="py-2 flex justify-between items-start hover:bg-gray-50 rounded p-1 transition-colors">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{h.nombre}</div>
                          {h.nota && <div className="text-xs text-gray-500">{h.nota}</div>}
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center gap-2 px-2 py-0.5 text-xs font-semibold rounded-full border ${c.border} bg-white`}>
                            <span className={`${c.bg} w-2 h-2 rounded-full inline-block`} />
                            <span className={`${c.text} text-xs`}>{h.nivel}</span>
                          </span>
                        </div>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span className="mr-4">Niveles: Profesional = experiencia de producción; Sólido = uso frecuente; Intermedio/En Progreso = aprendizaje activo.</span>
        </div>
      </div>
    </section>
  )
}
