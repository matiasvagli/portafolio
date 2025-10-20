'use client'

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
  linkCodigo?: string
 
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
      tecnologias: ["Django", "Python", "PostgreSQL", "NeonDB", "Render", "HTML", "CSS", "JavaScript"],
      imagen: "/imagenes/webapp/panelprivado.png",
      linkDemo: "/proyectos/sistema-ventas",
     
      categoria: "Web App",
      fecha: "2025"
    },
    {
      id: 2,
      titulo: "Coruja Casas Serranas",
      descripcion: "Sitio web profesional para alquiler de cabañas en San Luis y Córdoba, Argentina.",
      descripcionCompleta: "Coruja Casas Serranas es un sitio web oficial para un complejo turístico real. Desarrollo web profesional para cabañas en las sierras de Córdoba, Argentina. Incluye catálogo de propiedades con descripciones detalladas, galería optimizada de imágenes, formularios de contacto con envío de emails automático, mapas interactivos para ubicar las propiedades, hosting en producción con Vercel, dominio personalizado .com.ar, certificado SSL/HTTPS, configuración DNS profesional, email corporativo con Zoho Mail, integración con WhatsApp Business, formulario de reservas, optimización SEO y performance optimizada para dispositivos móviles.",
      tecnologias: ["Next.js 15", "TypeScript", "Tailwind CSS 4", "Framer Motion", "React Hook Form", "Zod", "Nodemailer", "Zoho SMTP", "react-leaflet"],
      imagen: "/imagenes/coruja/coruja-home.png",
      linkDemo: "/proyectos/coruja",
      categoria: "Web App",
      fecha: "2025"
    },
    {
      id: 7,
      titulo: "E-commerce Full Stack",
      descripcion: "Tienda online completa con carrito y pagos",
      descripcionCompleta: "Una aplicación de comercio electrónico completa con autenticación de usuarios, carrito de compras, sistema de pagos con Stripe, panel de administración y gestión de inventario. Incluye funciones de búsqueda, filtros y recomendaciones.",
      tecnologias: ["React", "Next.js", "TypeScript", "Tailwind", "Stripe", "Vercel"],
      imagen: "/imagenes/tiendaapp/tienda.png",
      linkDemo: "/proyectos/ecommerce",
      categoria: "E-commerce",
      fecha: "2024"
    },
    {
      id: 3,
      titulo: "Crypto Futures Yield Calculator",
      descripcion: "Calculadora de rendimientos de futuros cripto",
      descripcionCompleta: "Herramienta especializada desarrollada en Python para calcular el rendimiento anualizado de contratos futuros trimestrales de criptomonedas. Compara precios spot vs futuros para identificar oportunidades de arbitraje y evaluar estrategias de carry trade.",
      tecnologias: ["Python", "Pandas", "NumPy", "Datetime", "Decimal", "Math"],
      imagen: "/imagenes/crypto/okx.png",
      linkDemo: "/proyectos/crypto-futures",
     
      categoria: "Dashboard",
      fecha: "2023"
    },
    {
      id: 4,
      titulo: "API Usuarios & CSV con FastAPI",
      descripcion: "API profesional para gestión de usuarios, roles y análisis avanzado de archivos CSV",
      descripcionCompleta:
        "Desarrollada con FastAPI y MongoDB, esta API permite registrar y autenticar usuarios con roles, proteger rutas mediante JWT y procesar archivos CSV para obtener estadísticas y datos limpios. Su arquitectura modular y validaciones robustas la hacen ideal para proyectos escalables y aplicaciones reales. Incluye endpoints para administración de usuarios, login seguro, subida y análisis de CSV, y está lista para integrarse con bases de datos o expandirse según tus necesidades.",
      tecnologias: ["Python", "FastAPI", "MongoDB", "Pandas", "JWT", "Passlib"],
      imagen: "/imagenes/Fast-api/codigo.png",
      linkDemo: "/proyectos/fast-api",
      categoria: "API",
      fecha: "2025"
    },
    {
      id: 5,
      titulo: "Crypto DCA Bot",
      descripcion: "En construcción: app para compras DCA de BTC con métricas personalizadas",
      descripcionCompleta: `Bot de Dollar-Cost Averaging (DCA) para criptomonedas:
Permite definir frecuencia y métricas de compra de BTC
Ejecuta compras automáticas según estrategia
Ofrece reportes y estadísticas avanzadas de inversión`,
      tecnologias: ["Python", "Node.js", "React"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
    
      categoria: "Dashboard",
      fecha: "2025"
    },
    {
      id: 6,
      titulo: "Crypto Wallet Manager",
      descripcion: "En construcción: wallet para gestionar múltiples carteras cripto",
      descripcionCompleta: `Herramienta de gestión de wallets:
Visualiza saldos de varias carteras
Administra tenencias y genera reportes de portafolio
Soporte para múltiples blockchains`,
      tecnologias: ["React", "TypeScript", "Web3.js", "Ethers.js"],
      imagen: "/placeholder-project.jpg",
      linkDemo: "#",
     
      categoria: "Dashboard",
      fecha: "2025"
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
