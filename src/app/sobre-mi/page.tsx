import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sobre mí - Matías ',
  description: 'Conoce más sobre mi experiencia, habilidades y pasión por el desarrollo web',
}

export default function SobreMi() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Sobre mí
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una historia de más de 20 años explorando la tecnología, 
              desde los sistemas Unix hasta el desarrollo backend moderno.
            </p>
          </div>
        </div>
      </section>

      {/* Mi Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mi Historia
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Mi historia con la tecnología comenzó en 1998, cuando tenía 14 años. Mi padre trabajaba con sistemas Unix haciendo data entry, y me fascinaba ver cómo funcionaban esas computadoras tan distintas a todo lo que conocía.
                </p>
                <p className="mb-4">
                  Al año siguiente recibí mi primera PC, y con ella mi destino cambió. No contento con Windows 3.11, me lancé a instalar Linux —en una época sin internet en casa, solo con “La Biblia”, un libro de más de 500 páginas que servía como guía para los usuarios de Linux—. Ahí di mis primeros pasos en C, compilé mis primeros kernels y escribí mi primer &quot;Hola Mundo&quot;.
                </p>
                <p className="mb-4">
                  Por entonces, los domingos solía recorrer la feria del Parque Rivadavia, el principal punto de encuentro donde se compartía información, se compraban libros y revistas de computación, y se intercambiaban experiencias que hoy encontramos fácilmente online.
                </p>
                <p className="mb-4">
                  Los primeros años de internet me llevaron a trabajar en un ciber, administrando redes y explorando Python. Aunque la vida me llevó por otros caminos, nunca abandoné mi pasión por la tecnología.
                </p>
                <p>
                  Hoy, con 41 años, decidí enfocarme plenamente en lo que realmente me apasiona: el desarrollo, especializándome en backend, análisis de datos y blockchain, con la madurez y experiencia que solo dan los años.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                {/* Foto profesional */}
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/imagenes/personal/p3.jpg"
                    alt="Matías - Desarrollador Full Stack"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Decoración */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Experiencia Profesional
          </h2>
          
          <div className="space-y-8">
            {/* Experiencia negocio propio */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dueño & Administrador General</h3>
                  <p className="text-blue-600 font-medium">Lotería y tienda multiproducto – Buenos Aires, Argentina</p>
                </div>
                <p className="text-gray-600 mt-2 md:mt-0">2008 – 2022</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Administración integral del negocio: gestión contable, control de stock y atención al cliente.</li>
                <li>Operación de agencia de lotería con terminales de apuestas y organización de carreras hípicas en tiempo real.</li>
                <li>Venta de productos generales: gestión de proveedores y logística.</li>
                <li>Implementación de herramientas digitales para seguimiento de ventas y optimización de inventario.</li>
                <li>Estrategias de marketing local y digital adaptadas a nuevas demandas.</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Logros destacados:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Más de 14 años sosteniendo un negocio rentable en un mercado competitivo.</li>
                  <li>Incorporación progresiva de soluciones tecnológicas para automatizar tareas administrativas.</li>
                </ul>
              </div>
            </div>

            {/* Experiencia freelance */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Desarrollador Freelance (Frontend & Backend)</h3>
                  <p className="text-blue-600 font-medium">Sistema de gestión para distribuidora avícola – Córdoba, Argentina</p>
                </div>
                <p className="text-gray-600 mt-2 md:mt-0">2024</p>
              </div>
              <p className="text-gray-700 mb-4">
                Desarrollo de página web y sistema interno para gestión de pedidos, clientes y facturación. Automatización de reportes de ventas y generación de listas de distribución. Integración con herramientas de control de stock adaptadas al rubro. Capacitación a los usuarios para el uso del sistema.
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tecnologías utilizadas:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Python</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Django</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">JavaScript</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">HTML/CSS</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">SQLite</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores y Filosofía */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Mis Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eficiencia</h3>
              <p className="text-gray-600">
                Busco siempre la solución más elegante y eficiente para cada problema.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aprendizaje</h3>
              <p className="text-gray-600">
                El aprendizaje continuo es clave para mantenerse actualizado en tecnología.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Colaboración</h3>
              <p className="text-gray-600">
                Los mejores resultados se logran trabajando en equipo y comunicándose bien.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
