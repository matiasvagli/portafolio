import { Metadata } from 'next'

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
                  Mi historia con la tecnología comenzó en 1998, cuando tenía 14 años. 
                  Mi padre trabajaba con sistemas Unix haciendo data entry, y me fascinó 
                  ver cómo funcionaban esas computadoras tan diferentes a todo lo que conocía.
                </p>
                <p className="mb-4">
                  Al año siguiente recibí mi primera PC, y con ella, mi destino cambió. 
                  No contento con Windows 3.11, me lancé a instalar Linux - en una época 
                  sin internet casero, solo con "La Biblia" como guía. Ahí aprendí mis 
                  primeros pasos en C y escribí mi primer "Hola Mundo".
                </p>
                <p className="mb-4">
                  Los primeros años de internet me llevaron a trabajar en un ciber, 
                  administrando redes y explorando Python. Aunque la vida me llevó por 
                  otros caminos, nunca abandoné mi pasión por la tecnología.
                </p>
                <p>
                  Hace 2 años decidí que era el momento de hacer lo que realmente me apasiona. 
                  A los 41 años, regresé al desarrollo con la madurez y experiencia que solo 
                  dan los años, especializándome en backend, análisis de datos y blockchain.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                {/* Placeholder para tu foto profesional */}
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">Foto</span>
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
            {/* Experiencia 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Desarrollador Full Stack
                  </h3>
                  <p className="text-blue-600 font-medium">Empresa ABC</p>
                </div>
                <p className="text-gray-600 mt-2 md:mt-0">2023 - Presente</p>
              </div>
              <p className="text-gray-700">
                Desarrollo y mantenimiento de aplicaciones web usando React, Next.js y Node.js. 
                Colaboración en equipo para implementar nuevas funcionalidades y optimizar 
                el rendimiento de las aplicaciones existentes.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Node.js</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">MongoDB</span>
              </div>
            </div>

            {/* Experiencia 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Desarrollador Frontend
                  </h3>
                  <p className="text-blue-600 font-medium">Startup XYZ</p>
                </div>
                <p className="text-gray-600 mt-2 md:mt-0">2022 - 2023</p>
              </div>
              <p className="text-gray-700">
                Creación de interfaces de usuario responsive y accesibles. 
                Implementación de designs complejos y optimización de la experiencia del usuario 
                en aplicaciones web de alto tráfico.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Vue.js</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">TypeScript</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Sass</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Jest</span>
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
