'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
  description: string
  duration: string
}

export default function VideoPlayer({ 
  src, 
  poster, 
  title, 
  description, 
  duration 
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleLoadVideo = () => {
    setIsLoaded(true)
    // Pequeño delay para mostrar el video después de que se cargue
    setTimeout(() => {
      setIsPlaying(true)
    }, 100)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {!isLoaded ? (
          /* Placeholder mientras carga el video */
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-center text-white">
              <div 
                className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-opacity-30 transition-colors cursor-pointer"
                onClick={handleLoadVideo}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-blue-100 mb-4">{description} ({duration})</p>
              <button 
                onClick={handleLoadVideo}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                ▶ Reproducir Video
              </button>
            </div>
          </div>
        ) : (
          /* Video real */
          <video 
            className="w-full h-full object-cover"
            controls
            autoPlay={isPlaying}
            poster={poster}
            onLoadStart={() => console.log('Video cargando...')}
            onCanPlay={() => console.log('Video listo para reproducir')}
          >
            <source src={src} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        )}
      </div>
      
      {/* Descripción del video */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>
          📹 Demostración completa del sistema • 🕐 {duration} • 📱 Responsive Design
        </p>
      </div>
    </div>
  )
}
