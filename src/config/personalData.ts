// Configuración de datos personales
// Cambia estos datos y se actualizarán automáticamente en todo el sitio

export const personalData = {
  // Información básica
  name: "Matias Vagliviello",
  firstName: "Matias", // Para usos más casuales
  title: "Backend Developer",
  
  // Información de contacto
  email: "vaglimatias@gmail.com",
  phone: "+54 9 11 7846 5477",
  location: "Buenos Aires, Argentina",

  // Enlaces sociales
  social: {
    github: "https://github.com/matiasvagli",
    linkedin: "https://www.linkedin.com/in/matias-vagliviello-07403736b/", // opcional
    twitter: "https://twitter.com/vaglimatias", // opcional
    website: "https://matiasvagli.com" // opcional
  },
  
  // SEO y metadatos
  description: "Backend Developer apasionado por la tecnología. Especializado en Python, análisis de datos y blockchain, con experiencia autodidacta desde los sistemas Unix hasta las tecnologías modernas.",
  keywords: ["Backend Developer", "Python", "Data Analysis", "Linux", "Blockchain", "APIs", "Automatización", "Django"],
  
  // Información profesional
  experience: "2 años enfocado en desarrollo profesional",
  availability: "Disponible para nuevos proyectos",
  
  // Bio corta
  bio: "Apasionado por la tecnología desde los sistemas Unix a los 14 años y Linux en los '90s. Tras explorar diferentes caminos, regresé con fuerza al desarrollo backend, especializándome en Python, análisis de datos y blockchain."
}

// Función helper para obtener el nombre completo del sitio
export const getSiteTitle = (pageTitle?: string) => {
  const base = `${personalData.name} - ${personalData.title}`
  return pageTitle ? `${pageTitle} - ${base}` : base
}
