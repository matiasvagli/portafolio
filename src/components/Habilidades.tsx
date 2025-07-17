interface Habilidad {
  nombre: string
  estado: 'Aprendiendo' | 'Trabajando' | 'Trabajando' | 'En Proyecto'
  categoria: 'Lenguajes' | 'Frontend' | 'Backend' | 'Base de Datos' | 'DevOps + Servicios Cloud' | 'Herramientas' | 'Blockchain' | 'Conceptos'
}

export default function Habilidades() {
  const habilidades: Habilidad[] = [
    // Lenguajes
    { nombre: 'JavaScript', estado: 'Trabajando', categoria: 'Lenguajes' },
    { nombre: 'TypeScript', estado: 'Trabajando', categoria: 'Lenguajes' },
    { nombre: 'Python', estado: 'Trabajando', categoria: 'Lenguajes' },
    { nombre: 'Golang', estado: 'Aprendiendo', categoria: 'Lenguajes' },
    
    // Frontend (Fundamentals, Frameworks & Librerías)
    { nombre: 'HTML/CSS', estado: 'Trabajando', categoria: 'Frontend' },
    { nombre: 'React', estado: 'Trabajando', categoria: 'Frontend' },
    { nombre: 'Next.js', estado: 'Trabajando', categoria: 'Frontend' },
    { nombre: 'Tailwind CSS', estado: 'Trabajando', categoria: 'Frontend' },
    { nombre: 'Bootstrap', estado: 'Trabajando', categoria: 'Frontend' },

    // Backend (Frameworks & APIs)
    { nombre: 'Node.js', estado: 'Trabajando', categoria: 'Backend' },
    { nombre: 'Django', estado: 'Trabajando', categoria: 'Backend' },
    { nombre: 'Express.js', estado: 'Trabajando', categoria: 'Backend' },
    { nombre: 'FastAPI', estado: 'Trabajando', categoria: 'Backend' },
    { nombre: 'REST APIs', estado: 'Trabajando', categoria: 'Backend' },

    // Base de Datos
    { nombre: 'MongoDB', estado: 'Trabajando', categoria: 'Base de Datos' },
    { nombre: 'PostgreSQL', estado: 'Trabajando', categoria: 'Base de Datos' },
    { nombre: 'MySQL', estado: 'Trabajando', categoria: 'Base de Datos' },
    
    // DevOps + Servicios Cloud
    { nombre: 'Docker', estado: 'Aprendiendo', categoria: 'DevOps + Servicios Cloud' },
    { nombre: 'AWS', estado: 'Aprendiendo', categoria: 'DevOps + Servicios Cloud' },
    { nombre: 'Vercel', estado: 'Trabajando', categoria: 'DevOps + Servicios Cloud' },
    { nombre: 'Render', estado: 'Trabajando', categoria: 'DevOps + Servicios Cloud' },
    { nombre: 'NeonDB', estado: 'Trabajando', categoria: 'DevOps + Servicios Cloud' },
    
    // Herramientas
    { nombre: 'Git/GitHub', estado: 'Trabajando', categoria: 'Herramientas' },
    { nombre: 'VS Code', estado: 'Trabajando', categoria: 'Herramientas' },
    { nombre: 'Figma', estado: 'Trabajando', categoria: 'Herramientas' },
    { nombre: 'Postman', estado: 'Trabajando', categoria: 'Herramientas' },
    { nombre: 'IA/ChatGPT', estado: 'Trabajando', categoria: 'Herramientas' },
    
    // Blockchain & Cripto
    { nombre: 'APIs Cripto', estado: 'Trabajando', categoria: 'Blockchain' },
    { nombre: 'Smart Contracts', estado: 'Trabajando', categoria: 'Blockchain' },
    { nombre: 'DeFi Protocols', estado: 'Trabajando', categoria: 'Blockchain' },
    { nombre: 'Blockchain Tech', estado: 'Trabajando', categoria: 'Blockchain' },
    { nombre: 'Solidity', estado: 'Aprendiendo', categoria: 'Blockchain' },
    
    // Conceptos & Fundamentos
    { nombre: 'Lógica de Programación', estado: 'Trabajando', categoria: 'Conceptos' },
    { nombre: 'Algoritmos', estado: 'Trabajando', categoria: 'Conceptos' },
    { nombre: 'Estructuras de Datos', estado: 'Trabajando', categoria: 'Conceptos' },
    { nombre: 'Patrones de Diseño', estado: 'Aprendiendo', categoria: 'Conceptos' },
    { nombre: 'Clean Code', estado: 'Trabajando', categoria: 'Conceptos' }
  ]

  const categorias = ['Lenguajes', 'Frontend', 'Backend', 'Base de Datos', 'DevOps + Servicios Cloud', 'Herramientas', 'Blockchain', 'Conceptos'] as const

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Experto': return 'bg-green-500'
      case 'Trabajando': return 'bg-blue-500'
      case 'En Proyecto': return 'bg-purple-500'
      case 'Aprendiendo': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Experto': return '⭐'
      case 'Trabajando': return '💼'
      case 'En Proyecto': return '🚀'
      case 'Aprendiendo': return '📚'
      default: return '❓'
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estas son las tecnologías y herramientas con las que trabajo día a día
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {categorias.map((categoria) => (
            <div key={categoria} className="bg-white rounded-xl p-4 shadow-lg">
              <h3 className="text-base font-bold text-gray-900 mb-3 text-center">
                {categoria}
              </h3>                <div className="space-y-2">
                {habilidades
                  .filter(h => h.categoria === categoria)
                  .map((habilidad, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 text-sm">
                          {habilidad.nombre}
                        </span>
                        <span className="text-base">
                          {getEstadoIcon(habilidad.estado)}
                        </span>
                      </div>
                      
                      {/* Badge de estado */}
                      <div className="flex">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${getEstadoColor(habilidad.estado)}`}>
                          {habilidad.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🚀 En Constante Evolución
            </h3>
            <p className="text-gray-700 text-base mb-4">
              La tecnología nunca se detiene, y yo tampoco. Siempre estoy explorando nuevas herramientas y mejorando mis skills existentes.
            </p>
            
            {/* Estados explicados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <span className="text-gray-600">Aprendiendo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">💼</span>
                <span className="text-gray-600">Trabajando</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🚀</span>
                <span className="text-gray-600">En Proyecto</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">⭐</span>
                <span className="text-gray-600">Trabajando</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
