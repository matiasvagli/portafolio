'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FastApiPage() {
  const [modalImg, setModalImg] = useState<string | null>(null)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/proyectos" 
              className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              API RESTful con FastAPI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Proyecto backend desarrollado con FastAPI, ideal para microservicios y aplicaciones modernas en Python.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full font-medium">
                Backend
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                FastAPI
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
                2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen Principal */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vista Principal de la API
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Codigo fuente de la API y documentación .
            </p>
          </div>
          <div className="relative h-[400px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
            <Image
              src="/imagenes/Fast-api/codigo.png"
              alt="FastAPI Swagger UI"
              width={600}
              height={400}
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* Descripción y Características */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Descripción */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                API Usuarios FastAPI + MongoDB
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Esta API profesional está diseñada para gestionar usuarios y procesar archivos CSV de manera eficiente y segura. Pensada para proyectos modernos, combina autenticación robusta, roles de acceso y manejo avanzado de datos, permitiendo construir sistemas escalables y flexibles sobre una base sólida.
                </p>
                <p>
                  Gracias a FastAPI y MongoDB, ofrece endpoints rápidos y seguros para registro, login y administración de usuarios, junto con la capacidad de analizar y limpiar datos provenientes de archivos CSV. Su arquitectura modular facilita la extensión y personalización, ideal tanto para aprendizaje como para aplicaciones reales.
                </p>
                <p>
                  La integración de tecnologías como JWT, Passlib y pandas garantiza seguridad, validación y análisis de datos, mientras que la estructura profesional del código permite mantener y escalar el sistema fácilmente.
                </p>
              </div>
            </div>

            {/* Características */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Características Principales
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gestión de Usuarios</h3>
                    <p className="text-gray-600">Registro, login, consulta, listado y eliminación con roles y permisos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Autenticación JWT</h3>
                    <p className="text-gray-600">Seguridad robusta y centralizada para usuarios y endpoints</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Procesamiento de CSV</h3>
                    <p className="text-gray-600">Subida y depuración de archivos CSV con pandas, estadísticas y validaciones</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Roles y Permisos</h3>
                    <p className="text-gray-600">Protección de rutas y acciones según rol (user/admin)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Estructura Profesional</h3>
                    <p className="text-gray-600">Routers, servicios y esquemas separados para escalabilidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tecnologías Utilizadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {["FastAPI", "MongoDB", "Motor", "Pandas", "Passlib", "python-jose", "Pydantic", "Uvicorn"].map((tech) => (
              <div key={tech} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-gray-600">{tech[0]}</span>
                </div>
                <p className="font-medium text-gray-900">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capturas de Pantalla */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Capturas de Pantalla
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Swagger UI */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              <div className="mb-4 w-full text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Swagger UI</h3>
                <p className="text-gray-600">Documentación interactiva de la API</p>
              </div>
              <button
                className="relative h-[320px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/Fast-api/docs.png")}
              >
                <Image
                  src="/imagenes/Fast-api/docs.png"
                  alt="Swagger UI"
                  width={368}
                  height={253}
                  className="object-contain p-2 transition-transform duration-200 hover:scale-105"
                />
              </button>
            </div>
            {/* Mongo API */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              <div className="mb-4 w-full text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Endpoint MongoDB</h3>
                <p className="text-gray-600">Conexión y consulta a MongoDB</p>
              </div>
              <button
                className="relative h-[320px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/Fast-api/mongoapi.png")}
              >
                <Image
                  src="/imagenes/Fast-api/mongoapi.png"
                  alt="Endpoint MongoDB"
                  width={368}
                  height={253}
                  className="object-contain p-2 transition-transform duration-200 hover:scale-105"
                />
              </button>
            </div>
            {/* Sin Token */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              <div className="mb-4 w-full text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Endpoint sin Token</h3>
                <p className="text-gray-600">Acceso denegado sin autenticación JWT</p>
              </div>
              <button
                className="relative h-[320px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/Fast-api/binvalido.png")}
              >
                <Image
                  src="/imagenes/Fast-api/sintoken.png"
                  alt="Sin Token"
                  width={368}
                  height={253}
                  className="object-contain p-2 transition-transform duration-200 hover:scale-105"
                />
              </button>
            </div>
          </div>
          {/* Modal */}
          {modalImg && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setModalImg(null)}
            >
              <div className="relative">
                <Image
                  src={modalImg}
                  alt="Captura ampliada"
                  width={900}
                  height={600}
                  className="rounded-xl shadow-2xl"
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-gray-800 font-bold shadow hover:bg-gray-200"
                  onClick={() => setModalImg(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enlaces y Contacto */}
      <section className="py-16 bg-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Te interesa este proyecto?
          </h2>
          <p className="text-cyan-100 text-lg mb-8">
            Si buscas una API robusta y moderna para tu aplicación, ¡hablemos sobre cómo puedo ayudarte!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/matiasvagli/apiv1.git"
              className="bg-white text-cyan-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Ver Código en GitHub
            </a>
            <a
              href="/contacto"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-cyan-600 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
