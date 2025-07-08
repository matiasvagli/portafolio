import Image from 'next/image'

interface Proyecto {
  id: number
  titulo: string
  descripcion: string
  tecnologias: string[]
  imagen: string
  linkDemo?: string

}

export default function ProyectosDestacados() {
  // Datos de ejemplo - reemplaza con tus proyectos reales
  const proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: "Sistema de Gestión de Ventas",
      descripcion: "Sistema web completo desarrollado en Django para gestionar ventas, inventario, gastos y control financiero en tiempo real.",
      tecnologias: ["Django", "Python", "HTML", "CSS", "JavaScript", "SQLite"],
      imagen: "/imagenes/webapp/panel.png",
      linkDemo: "/proyectos/sistema-ventas",
      
     },
    {

      id: 2,
      titulo: "E-commerce App",
      descripcion: "Una aplicación de comercio electrónico completa con carrito de compras, pagos .",
      tecnologias: ["React", "Next.js", "TypeScript","Tailwind CSS"],
      imagen: "/imagenes/tiendaapp/tienda.png",
      linkDemo: "/proyectos/ecommerce",
     },
    {
      id: 3,
      titulo: "Crypto Futures Yield Calculator",
      descripcion: "Calcula el rendimiento anualizado de contratos futuros trimestrales de criptomonedas comparando precios spot vs futuros.",
      tecnologias: ["Python"],
      imagen: "/imagenes/crypto/okx.png",
      linkDemo: "/proyectos/crypto-futures",
     
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aquí tienes algunos de mis proyectos más recientes que demuestran mis habilidades y experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
              {/* Imagen del proyecto */}
              <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {proyecto.titulo}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {proyecto.descripcion}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {proyecto.tecnologias.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Enlaces */}
                <div className="flex gap-3">
                  {proyecto.linkDemo && (
                    <a
                      href={proyecto.linkDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Ver Demo
                    </a>
                  )}
                
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para ver todos los proyectos */}
        <div className="text-center mt-12">
          <a
            href="/proyectos"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Ver todos los proyectos
          </a>
        </div>
      </div>
    </section>
  )
}
