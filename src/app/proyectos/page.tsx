'use client'

import { Metadata } from 'next'
import Image from 'next/image'
import { useState } from 'react'

interface Proyecto {
  id: number
  titulo: string
  descripcion: string
  descripcionCompleta: string
  tecnologias: string[]
  imagen: string
  linkDemo?: string
  linkCodigo: string
  categoria: 'Web App' | 'E-commerce' | 'Dashboard' | 'API' | 'Mobile'
  fecha: string
}

export default function Proyectos() {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null)
  
  const proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: "Sistema de gestión de ventas, stock y finanzas",
      descripcion: "Sistema web para ventas y control de caja",
      descripcionCompleta: "Sistema web desarrollado en Django para gestionar ventas, stock, gastos y control de caja. Incluye reportes diarios de ganancias y panel administrativo para el negocio. Permite registrar productos, operaciones y obtener un resumen financiero en tiempo real.",
      tecnologias: ["Django", "Python", "PostgreSQL", "HTML", "CSS", "JavaScript"],
      imagen: "/imagenes/webapp/panelprivado.png",
      linkDemo: "/proyectos/sistema-ventas",
      linkCodigo: "#",
      categoria: "Web App",
      fecha: "2024"
    },
    {
      id: 2,
      titulo: "E-commerce Full Stack",
      descripcion: "Tienda online completa con carrito y pagos",
      descripcionCompleta: "Una aplicación de comercio electrónico completa con autenticación de usuarios, carrito de compras, sistema de pagos con Stripe, panel de administración y gestión de inventario. Incluye funciones de búsqueda, filtros y recomendaciones.",
      tecnologias: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
      imagen: "/imagenes/webapp/panel.png",
      linkDemo: "#",
      linkCodigo: "#",
      categoria: "E-commerce",
      fecha: "2023"
    },
    {
      id: 3,
      titulo: "Dashboard Analytics",
      descripcion: "Panel de control con gráficos interactivos",
      descripcionCompleta: "Dashboard para análisis de datos con gráficos interactivos, métricas en tiempo real y reportes personalizados. Incluye autenticación de usuarios, diferentes roles y permisos, y exportación de datos en múltiples formatos.",
      tecnologias: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
      linkCodigo: "#",
      categoria: "Dashboard",
      fecha: "2023"
    },
    {
      id: 4,
      titulo: "API REST Escalable",
      descripcion: "API robusta para aplicaciones móviles",
      descripcionCompleta: "API REST desarrollada con Node.js y Express, diseñada para ser escalable y mantener alta disponibilidad. Incluye autenticación JWT, rate limiting, documentación con Swagger y tests automatizados.",
      tecnologias: ["Node.js", "Express", "MongoDB", "Redis", "JWT", "Swagger"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
      linkCodigo: "#",
      categoria: "API",
      fecha: "2022"
    },
    {
      id: 5,
      titulo: "App de Gestión de Tareas",
      descripcion: "Aplicación móvil para productividad",
      descripcionCompleta: "Aplicación móvil desarrollada con React Native para gestión de tareas y proyectos. Incluye sincronización offline, notificaciones push, colaboración en equipo y analytics de productividad.",
      tecnologias: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
      linkCodigo: "#",
      categoria: "Mobile",
      fecha: "2022"
    },
    {
      id: 6,
      titulo: "Sistema de Blog",
      descripcion: "CMS personalizado con editor WYSIWYG",
      descripcionCompleta: "Sistema de gestión de contenidos desarrollado desde cero con editor de texto enriquecido, sistema de comentarios, categorías, tags y SEO optimizado. Incluye panel de administración completo.",
      tecnologias: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TinyMCE"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
      linkCodigo: "#",
      categoria: "Web App",
      fecha: "2021"
    }
  ]

  const categorias = ['Todos', 'Web App', 'E-commerce', 'Dashboard', 'API', 'Mobile'] as const

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Mis Proyectos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Una colección de proyectos que demuestran mis habilidades técnicas 
              y mi pasión por crear soluciones innovadoras
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Proyectos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto) => (
              <div 
                key={proyecto.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(proyecto)}
              >
                {/* Imagen del proyecto */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {proyecto.imagen !== "/placeholder-project.jpg" ? (
                    <Image
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-semibold">Screenshot</span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {proyecto.categoria}
                    </span>
                    <span className="text-gray-500 text-sm">{proyecto.fecha}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {proyecto.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {proyecto.descripcion}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {proyecto.tecnologias.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{proyecto.tecnologias.length - 3} más
                      </span>
                    )}
                  </div>

                  {/* Enlaces */}
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProject(proyecto)
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                    >
                      Ver Descripción
                    </button>
                    {proyecto.linkDemo && (
                      <a
                        href={proyecto.linkDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        Ver Demo
                      </a>
                    )}
                    <a
                      href={proyecto.linkCodigo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      Ver Código
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Te Gusta lo que Ves?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Estos son solo algunos de mis proyectos. Si tienes una idea interesante 
            o necesitas un desarrollador para tu equipo, ¡hablemos!
          </p>
          <a
            href="/contacto"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Trabajemos Juntos
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header del modal */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.titulo}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {selectedProject.categoria}
                    </span>
                    <span className="text-gray-500 text-sm">{selectedProject.fecha}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Imagen del proyecto */}
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
                {selectedProject.imagen !== "/placeholder-project.jpg" ? (
                  <Image
                    src={selectedProject.imagen}
                    alt={selectedProject.titulo}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Screenshot</span>
                  </div>
                )}
              </div>

              {/* Descripción completa */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProject.descripcionCompleta}
                </p>
              </div>

              {/* Tecnologías */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tecnologias.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enlaces */}
              <div className="flex gap-4">
                {selectedProject.linkDemo && selectedProject.linkDemo !== "#" && (
                  <a
                    href={selectedProject.linkDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Ver Demo
                  </a>
                )}
                {selectedProject.linkCodigo && selectedProject.linkCodigo !== "#" && (
                  <a
                    href={selectedProject.linkCodigo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Ver Código
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
