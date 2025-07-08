import Image from 'next/image'
import Link from 'next/link'

export default function CryptoFuturesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/proyectos" 
              className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6"
            >
              ← Volver a Proyectos
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Crypto Futures Yield Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Calculadora especializada para analizar el rendimiento anualizado de contratos futuros 
              trimestrales de criptomonedas comparando precios spot vs futuros
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                Trading Tool
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium">
                Cryptocurrency
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
              Interfaz Principal de la Calculadora
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Herramienta intuitiva para análisis de rendimientos en el mercado de futuros de criptomonedas
            </p>
          </div>
          <div className="relative h-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/imagenes/crypto/okx.png"
              alt="Vista principal de la calculadora"
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
                  Una herramienta especializada desarrollada en Python para calcular y analizar el 
                  rendimiento anualizado de contratos futuros trimestrales de criptomonedas. 
                  La aplicación compara precios spot vs futuros para identificar oportunidades de arbitraje.
                </p>
                <p>
                  <strong>Análisis de mercado:</strong> Permite a los traders e inversores evaluar 
                  rápidamente la rentabilidad potencial de mantener posiciones en futuros trimestrales, 
                  considerando las diferencias de precio entre el mercado spot y el de futuros.
                </p>
                <p>
                  <strong>Funcionalidades técnicas:</strong> Calcula automáticamente tasas anualizadas, 
                  muestra diferencias porcentuales, y permite comparar múltiples criptomonedas 
                  simultáneamente. Incluye validación de datos y manejo de errores.
                </p>
                <p>
                  <strong>Exportación de datos:</strong> La herramienta permite descargar y ordenar 
                  las tasas calculadas en archivos CSV organizados por exchange (Binance, OKX, etc.), 
                  facilitando análisis históricos y comparativos entre diferentes plataformas de intercambio.
                </p>
                <p>
                  <strong>Casos de uso:</strong> Ideal para traders que buscan oportunidades de 
                  contango o backwardation en mercados de futuros, análisis de carry trade 
                  en criptomonedas, y evaluación de estrategias de arbitraje temporal.
                </p>
                <p>
                  <strong>Implementación:</strong> Desarrollado con Python puro, enfocado en 
                  cálculos precisos y performance. Fácil de usar desde línea de comandos 
                  o integrar en sistemas más complejos de análisis financiero.
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
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cálculo de Rendimiento Anualizado</h3>
                    <p className="text-gray-600">Conversión automática de diferencias de precio a tasas anuales</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Comparación Spot vs Futuros</h3>
                    <p className="text-gray-600">Análisis detallado de diferencias entre mercados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Múltiples Criptomonedas</h3>
                    <p className="text-gray-600">Soporte para Bitcoin, Ethereum y otras principales</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Validación de Datos</h3>
                    <p className="text-gray-600">Verificación automática de precios y fechas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Exportación a CSV</h3>
                    <p className="text-gray-600">Descarga datos organizados por exchange para análisis futuro</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fácil Integración</h3>
                    <p className="text-gray-600">Código modular para usar en sistemas de análisis financiero</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Precisión Financiera</h3>
                    <p className="text-gray-600">Cálculos exactos con manejo de decimales</p>
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
            {["Python", "Pandas", "NumPy", "CSV", "Decimal", "Math"].map((tech) => (
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
            {/* Screenshot 1 - Interfaz Principal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interfaz Principal</h3>
                <p className="text-gray-600">Pantalla principal con campos de entrada y cálculos</p>
              </div>
              <div className="relative h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/imagenes/crypto/okx.png"
                  alt="Interfaz Principal"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Screenshot 2 - Resultados */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Resultados de Cálculo</h3>
                <p className="text-gray-600">Muestra del análisis con rendimientos anualizados</p>
              </div>
              <div className="relative h-[500px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/imagenes/crypto/binance.png"
                  alt="Resultados de Cálculo"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Grid de 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Screenshot 3 - Código */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Estructura del Código</h3>
                  <p className="text-gray-600 text-sm">Vista del código Python bien documentado</p>
                </div>
                <div className="relative h-80 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/imagenes/crypto/c1.png"
                    alt="Estructura del Código"
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>

              {/* Screenshot 4 - Terminal */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ejecución en Terminal</h3>
                  <p className="text-gray-600 text-sm">Ejemplo de uso desde línea de comandos</p>
                </div>
                <div className="relative h-80 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/imagenes/crypto/c2.png"
                    alt="Ejecución en Terminal"
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
            Código Disponible
          </h2>
          <p className="text-gray-600 mb-8">
            Explora el código fuente y aprende cómo funciona la calculadora
          </p>
          
          <div className="relative h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ver Código Fuente</h3>
                <p className="text-yellow-100 mb-4">Script Python completo</p>
                <a
                  href="https://github.com/matiasvagli/Claculadora_Tasas_CriptActivos.git"
                  className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  📊 Ver en GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enlaces y Contacto */}
      <section className="py-16 bg-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Te interesa este proyecto?
          </h2>
          <p className="text-yellow-100 text-lg mb-8">
            Si necesitas herramientas de análisis financiero personalizadas o desarrollo de 
            algoritmos para análisis de mercados, ¡hablemos sobre cómo puedo ayudarte!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/matiasvagli/Claculadora_Tasas_CriptActivos.git"
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Ver Código en GitHub
            </a>
            <a
              href="/contacto"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-yellow-600 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
