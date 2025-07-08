import Image from 'next/image'
import { personalData } from '@/config/personalData'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hola, soy{' '}
              <span className="text-blue-600">{personalData.firstName}</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-4">
              {personalData.title}
            </p>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              {personalData.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/proyectos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver mis proyectos
              </a>
              <a
                href="/contacto"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Imagen/Avatar */}
          <div className="flex justify-center lg:justify-end">
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
