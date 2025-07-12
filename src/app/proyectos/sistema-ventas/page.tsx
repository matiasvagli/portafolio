'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VideoPlayer from '@/components/VideoPlayer'

export default function SistemaVentasPage() {
  const [modalImg, setModalImg] = useState<string | null>(null)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/proyectos" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Sistema de Gestión de Ventas, Stock y Finanzas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sistema web completo desarrollado en Django para gestionar ventas, 
              inventario, gastos y control financiero en tiempo real
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                Web App
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
                2024
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Diagrama de Flujo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Arquitectura del Sistema
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diagrama de flujo que muestra la estructura y el flujo de datos del sistema de gestión
            </p>
          </div>
          <button
            className="relative h-[500px] w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
            onClick={() => setModalImg("/imagenes/webapp/diagram.png")}
          >
            <Image
              src="/imagenes/webapp/diagram.png"
              alt="Diagrama de flujo del sistema de ventas"
              fill
              className="object-contain p-4 transition-transform duration-200 hover:scale-105"
            />
          </button>
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
      </section>

      {/* Descripción y Características */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Descripción */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Descripción del Proyecto
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Sistema web integral desarrollado con Django que permite gestionar 
                  todos los aspectos financieros y operativos de un negocio. 
                  Incluye módulos para ventas, inventario, gastos, gestión de empleados y reportes.
                </p>
                <p>
                  <strong>Sistema desarrollado a medida</strong> a pedido de un cliente específico, 
                  cumpliendo con el primer requisito fundamental: <strong>no cortar nunca el flujo 
                  de ventas</strong> por ningún error administrativo como olvidarse de cargar el stock 
                  o cualquier otro descuido operativo.
                </p>
                <p>
                  El sistema es completamente automático y realiza todos los cálculos de ganancia 
                  tomando los precios de venta al público y compra de cada producto. Los cálculos 
                  se realizan detalladamente según la categoría y color del producto, optimizando 
                  la precisión en la gestión financiera.
                </p>
                <p>
                  Además, calcula automáticamente los desperdicios y mantiene el stock siempre 
                  actualizado utilizando las compras y ventas para el manejo dinámico del inventario. 
                  El sistema genera reportes automáticos de ganancias diarias y permite llevar un 
                  seguimiento detallado de todas las operaciones financieras.
                </p>
                <p>
                  Diseñado para ser intuitivo y eficiente, con una interfaz 
                  clara que permite a los usuarios acceder rápidamente a la 
                  información que necesitan sin intervención manual en los cálculos y 
                   <strong> garantizando continuidad operativa</strong> en todo momento.
                </p>
                <p>
                  <strong>Desarrollo técnico:</strong> Implementado con SQLite para prototipado 
                  rápido y desarrollo ágil, con arquitectura preparada para migración sencilla 
                  a PostgreSQL cuando se requiera escalabilidad en producción.
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
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gestión de Ventas</h3>
                    <p className="text-gray-600">Registro y seguimiento de todas las transacciones</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Control de Stock</h3>
                    <p className="text-gray-600">Inventario en tiempo real con alertas de stock bajo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reportes Financieros</h3>
                    <p className="text-gray-600">Ganancias diarias, mensuales y anuales</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Control de Gastos</h3>
                    <p className="text-gray-600">Seguimiento detallado de todos los gastos operativos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gestión de Empleados</h3>
                    <p className="text-gray-600">Control de sueldos, aguinaldos e información personal de empleados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Panel Administrativo</h3>
                    <p className="text-gray-600">Interfaz completa para gestión de productos y usuarios</p>
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
            {["Django", "Python", "SQLite", "HTML", "CSS", "JavaScript"].map((tech) => (
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

      {/* Screenshots Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Capturas de Pantalla
          </h2>
          <div className="space-y-8">
            {/* Screenshot 1 - Dashboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Principal</h3>
                <p className="text-gray-600">Vista general del sistema con métricas principales</p>
              </div>
              <button
                className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/webapp/panel.png")}
              >
                <Image
                  src="/imagenes/webapp/panel.png"
                  alt="Dashboard Principal"
                  fill
                  className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                />
              </button>
            </div>
            {/* Screenshot 2 - Productos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Productos</h3>
                <p className="text-gray-600">Interfaz de inventario y control de stock editable con impresión</p>
              </div>
              <button
                className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/webapp/precios.png")}
              >
                <Image
                  src="/imagenes/webapp/precios.png"
                  alt="Gestión de Productos"
                  fill
                  className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                />
              </button>
            </div>
            {/* Grid de 2 columnas para las siguientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Screenshot 3 - Reportes */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Gastos</h3>
                  <p className="text-gray-600 text-sm">Ingreso de gastos y desperdicios</p>
                </div>
                <button
                  className="relative h-80 w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/gastos.png")}
                >
                  <Image
                    src="/imagenes/webapp/gastos.png"
                    alt="Reportes y Estadísticas"
                    fill
                    className="object-contain p-3 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
              {/* Screenshot 4 - Ventas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Control de Ventas</h3>
                  <p className="text-gray-600 text-sm">Ingreso de ticket de venta</p>
                </div>
                <button
                  className="relative h-80 w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/ventas.png")}
                >
                  <Image
                    src="/imagenes/webapp/ventas.png"
                    alt="Control de Ventas"
                    fill
                    className="object-contain p-3 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
            </div>
            {/* Panel Administrativo - Acceso Privado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {/* Screenshot 5 - Login */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sistema de Login</h3>
                  <p className="text-gray-600">Autenticación para métricas privadas</p>
                </div>
                <button
                  className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/login.png")}
                >
                  <Image
                    src="/imagenes/webapp/login.png"
                    alt="Sistema de Login"
                    fill
                    className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
              {/* Screenshot 6 - Gestión de Empleados */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Empleados</h3>
                  <p className="text-gray-600">Control de empleados , métricas de negocio</p>
                </div>
                <button
                  className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/panelprivado.png")}
                >
                  <Image
                    src="/imagenes/webapp/panelprivado.png"
                    alt="Gestión de Empleados"
                    fill
                    className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
              {/* Screenshot 7 - Reporte de empleados */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Reporte de empleados</h3>
                  <p className="text-gray-600">Ingreso de empleados, datos personales</p>
                </div>
                <button
                  className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/empleados3.png")}
                >
                  <Image
                    src="/imagenes/webapp/empleados3.png"
                    alt="Reporte de empleados"
                    fill
                    className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
              {/* Screenshot 8 - Reportes Avanzados */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pago de sueldos y aguinaldos</h3>
                  <p className="text-gray-600">Pagos de haberes con exportación a CSV</p>
                </div>
                <button
                  className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                  onClick={() => setModalImg("/imagenes/webapp/sueldos.png")}
                >
                  <Image
                    src="/imagenes/webapp/sueldos.png"
                    alt="Pago de sueldos y aguinaldos"
                    fill
                    className="object-contain p-4 transition-transform duration-200 hover:scale-105"
                  />
                </button>
              </div>
            </div>
            {/* Screenshot 9 - Resumen  (grande) */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Resumen Ganancias</h3>
                <p className="text-gray-600">Vista de ganancias totales , búsqueda dia semana, año , exportables a CSV</p>
              </div>
              <button
                className="relative h-[500px] w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center focus:outline-none"
                onClick={() => setModalImg("/imagenes/webapp/resumen2.png")}
              >
                <Image
                  src="/imagenes/webapp/resumen2.png"
                  alt="Resumen Ganancias"
                  fill
                  className="object-contain p-4 transition-transform duration-200 hover:scale-105"
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

      {/* Video Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Demostración en Video
          </h2>
          <p className="text-gray-600 mb-8">
            Ve el sistema en acción: navegación, funcionalidades principales y flujo de trabajo completo
          </p>
          
          <VideoPlayer
            src="/videos/sistema-ventas-demo.mp4"
            poster="/imagenes/webapp/centralhuevos.png"
            title="Video Demostración"
            description="Sistema de Gestión Completo"
            duration="1:18 min"
          />
        </div>
      </section>

      {/* Enlaces y Contacto */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Interesado en este proyecto?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Si tienes preguntas sobre este sistema o necesitas algo similar para tu negocio, 
            no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/matiasvagli/GestionNegocio.git"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Ver Código en GitHub
            </a>
            <a
              href="/contacto"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
