import Image from 'next/image'
import Link from 'next/link'

export default function CorujaPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/proyectos"
              className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Coruja Casas Serranas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sitio web profesional para alquiler de cabañas en San Luis y Córdoba, Argentina.
              Un proyecto real en producción con infraestructura web completa.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                Web App
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                Tourism
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
              Sitio Web en Producción
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diseño responsivo y moderno para una experiencia óptima en todos los dispositivos
            </p>
          </div>
          <div className="relative h-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/imagenes/coruja/coruja-home.png"
              alt="Vista principal de Coruja Casas Serranas"
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
                Sobre el Proyecto
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Coruja Casas Serranas es un sitio web oficial para un complejo turístico real 
                  ubicado en las sierras de Córdoba, Argentina. El proyecto incluye desarrollo 
                  frontend profesional, hosting en producción, dominio personalizado y toda la 
                  infraestructura necesaria para un negocio de alquiler de cabañas.
                </p>
                <p>
                  El sitio fue desarrollado desde cero con un enfoque en performance, SEO y 
                  experiencia de usuario óptima en dispositivos móviles. Incluye integración de 
                  emails, formularios de reservas y mapas interactivos para la ubicación de propiedades.
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
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Catálogo de Propiedades</h3>
                    <p className="text-gray-600">Presentación detallada de cabañas y servicios</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Galería Optimizada</h3>
                    <p className="text-gray-600">Imágenes con lazy loading y blur placeholder</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Formularios de Contacto</h3>
                    <p className="text-gray-600">Validación robusta y envío de emails</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mapas Interactivos</h3>
                    <p className="text-gray-600">Ubicación exacta de las propiedades</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dominio Personalizado</h3>
                    <p className="text-gray-600">corujacasasserranas.com.ar con SSL/HTTPS</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Corporativo</h3>
                    <p className="text-gray-600">Zoho Mail para info@corujacasasserranas.com.ar</p>
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
            Stack Tecnológico
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {["Next.js 15", "TypeScript", "Tailwind CSS 4", "Framer Motion", "React Hook Form", "Zod", "Nodemailer", "Zoho SMTP", "react-leaflet", "Vercel"].map((tech) => (
              <div key={tech} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-gray-600">{tech[0]}</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infraestructura */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Infraestructura & Configuración
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Hosting & Deploy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Hosting en Vercel (producción)</li>
                <li>✓ Deploy automático desde Git</li>
                <li>✓ CDN global para contenido estático</li>
                <li>✓ Serverless functions para backend</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔒 Dominio & Seguridad</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Dominio: corujacasasserranas.com.ar</li>
                <li>✓ Certificado SSL/HTTPS</li>
                <li>✓ Configuración DNS profesional</li>
                <li>✓ SPF, DKIM para email</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Email & Comunicación</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Zoho Mail corporativo</li>
                <li>✓ Formularios con Nodemailer</li>
                <li>✓ Integración WhatsApp Business</li>
                <li>✓ Notificaciones automáticas</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Performance & SEO</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Optimizado para móviles (Mobile-First)</li>
                <li>✓ SEO básico (metadatos, OpenGraph)</li>
                <li>✓ Sitemap.xml para indexación</li>
                <li>✓ Imagen optimizada con next/image</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres un proyecto similar?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Puedo ayudarte a crear un sitio web profesional para tu negocio de turismo, 
            alojamiento o cualquier otro rubro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://corujacasasserranas.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Visitar Sitio en Vivo
            </a>
            <a
              href="/contacto"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium"
            >
              Contáctame
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
