import Image from 'next/image'
import Link from 'next/link'

export default function EcommercePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/proyectos" 
              className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              E-commerce Full Stack
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Template de e-commerce desarrollado con React y Next.js, incluye carrito de compras 
              y formularios de pago. Perfecto como punto de partida para proyectos más complejos.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                Template
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                Frontend Only
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
                2023
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
              Vista Principal de la Tienda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Interfaz moderna y responsive optimizada para la experiencia del usuario
            </p>
          </div>
          <div className="relative h-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/imagenes/tiendaapp/tienda.png"
              alt="Vista principal del e-commerce"
              fill
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
                Descripción del Proyecto
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Un template de comercio electrónico desarrollado con tecnologías modernas del frontend. 
                  Es ideal como punto de partida para proyectos de e-commerce, incluyendo las funcionalidades 
                  básicas de una tienda online: catálogo de productos, carrito de compras y formularios de pago.
                </p>
                <p>
                  <strong>Enfoque Frontend:</strong> Diseñado completamente en el lado del cliente con un 
                  enfoque mobile-first. La interfaz es intuitiva y permite navegar fácilmente por los productos, 
                  agregar items al carrito y proceder hasta el formulario de pago.
                </p>
                <p>
                  <strong>Características del template:</strong> Incluye simulación de carrito de compras 
                  con persistencia en localStorage, formularios de checkout y una estructura de código 
                  limpia y escalable. No requiere backend para funcionar, lo que facilita el despliegue 
                  y las pruebas iniciales.
                </p>
                <p>
                  <strong>Tecnologías y arquitectura:</strong> Desarrollado con React y Next.js para 
                  un rendimiento óptimo, con Tailwind CSS para estilos responsive y TypeScript 
                  para mayor robustez del código. Preparado para integración futura con APIs backend.
                </p>
                <p>
                  <strong>Escalabilidad:</strong> La estructura modular permite agregar fácilmente 
                  funcionalidades como autenticación, gestión de inventario real y procesamiento 
                  de pagos mediante APIs externas según las necesidades del proyecto.
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
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Catálogo de Productos</h3>
                    <p className="text-gray-600">Navegación intuitiva con diseño de cards atractivo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Carrito de Compras</h3>
                    <p className="text-gray-600">Gestión local con persistencia en localStorage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Formularios de Pago</h3>
                    <p className="text-gray-600">Interfaz de checkout lista para integrar APIs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Template Escalable</h3>
                    <p className="text-gray-600">Código modular preparado para expansión</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sin Backend Requerido</h3>
                    <p className="text-gray-600">Funciona completamente en el frontend</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Responsive Design</h3>
                    <p className="text-gray-600">Optimizado para dispositivos móviles y desktop</p>
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
            {["React", "Next.js", "TypeScript", "Tailwind", "LocalStorage", "Vercel"].map((tech) => (
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
            {/* Screenshot 1 - Página Principal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Página Principal</h3>
                <p className="text-gray-600">Landing page con productos destacados y navegación principal</p>
              </div>
              <div className="relative h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/imagenes/tiendaapp/tienda.png"
                  alt="Página Principal"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Screenshot 2 - Catálogo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Catálogo de Productos</h3>
                <p className="text-gray-600">Vista de productos con filtros y opciones de búsqueda</p>
              </div>
              <div className="relative h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/imagenes/tiendaapp/carrito.png"
                  alt="Catálogo de Productos"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Screenshot 3 - Detalle de Producto */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Detalle de Producto</h3>
                <p className="text-gray-600">Vista individual con información completa y opciones de compra</p>
              </div>
              <div className="relative h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/imagenes/tiendaapp/pago.png"
                  alt="Detalle de Producto"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Grid de 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Screenshot 4 - Carrito */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrito de Compras</h3>
                  <p className="text-gray-600 text-sm">Gestión de productos y cálculo de totales</p>
                </div>
                <div className="relative h-80 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/imagenes/tiendaapp/devo.png"
                    alt="Carrito de Compras"
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>

              {/* Screenshot 5 - Checkout */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Proceso de Pago</h3>
                  <p className="text-gray-600 text-sm">Checkout seguro con múltiples opciones</p>
                </div>
                <div className="relative h-80 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/imagenes/tiendaapp/contacto.png"
                    alt="Proceso de Pago"
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo en Vivo */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Demo en Vivo
          </h2>
          <p className="text-gray-600 mb-8">
            Explora el template y ve cómo funciona la navegación y el carrito de compras
          </p>
          
          <div className="relative h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ver Template en Vivo</h3>
                <p className="text-purple-100 mb-4">Landing page funcional</p>
                <a
                  href="#"
                  className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  🚀 Ver Template
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enlaces y Contacto */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Te interesa este proyecto?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Si necesitas un template de e-commerce como punto de partida para tu proyecto 
            o quieres desarrollar algo similar, ¡hablemos sobre cómo puedo ayudarte!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Ver Código en GitHub
            </a>
            <a
              href="/contacto"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
