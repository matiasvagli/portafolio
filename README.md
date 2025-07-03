# 🚀 Portafolio Personal

Un portafolio web moderno y responsive desarrollado con Next.js, TypeScript y Tailwind CSS para mostrar proyectos, habilidades y experiencia profesional.

## ✨ Características

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones sutiles
- **Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Performance**: Optimizado para carga rápida y SEO
- **TypeScript**: Desarrollo con tipado estático para mayor confiabilidad
- **Tailwind CSS**: Estilos utilitarios para desarrollo rápido

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Linting**: ESLint
- **Font**: Inter (Google Fonts)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas principales (App Router)
│   ├── sobre-mi/          # Página "Sobre mí"
│   ├── proyectos/         # Página de proyectos
│   ├── contacto/          # Página de contacto
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── Navigation.tsx     # Barra de navegación
│   ├── Hero.tsx          # Sección hero/presentación
│   ├── ProyectosDestacados.tsx  # Proyectos destacados
│   ├── Habilidades.tsx   # Habilidades técnicas
│   └── Footer.tsx        # Pie de página
└── public/               # Archivos estáticos
```

## 🚀 Getting Started

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Personalización

### 1. Información Personal
Actualiza los siguientes archivos con tu información:
- `src/components/Navigation.tsx` - Nombre en la barra de navegación
- `src/components/Hero.tsx` - Información personal y presentación
- `src/components/Footer.tsx` - Enlaces de redes sociales y contacto
- `src/app/layout.tsx` - Metadata y título del sitio

### 2. Proyectos
Edita `src/components/ProyectosDestacados.tsx` y `src/app/proyectos/page.tsx` para agregar tus proyectos reales.

### 3. Habilidades
Modifica `src/components/Habilidades.tsx` para reflejar tus habilidades técnicas.

### 4. Experiencia
Actualiza `src/app/sobre-mi/page.tsx` con tu experiencia profesional.

### 5. Contacto
Configura `src/app/contacto/page.tsx` con tus datos de contacto reales.

## 🎨 Personalización de Estilos

El proyecto usa Tailwind CSS. Puedes personalizar:
- Colores en `tailwind.config.js`
- Fuentes en `src/app/layout.tsx`
- Estilos globales en `src/app/globals.css`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Linting
npm run lint
```

## 🚀 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Configura las variables de entorno si es necesario
3. ¡Deploy automático!

### Otras Opciones
- **Netlify**: Conecta tu repo y deploy automático
- **GitHub Pages**: Usa `next export` para sitio estático
- **VPS**: Usa `npm run build` y un servidor web

## 🤝 Contribuciones

Si encuentras algún bug o tienes sugerencias:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: tu-email@ejemplo.com
- **LinkedIn**: [tu-perfil](https://linkedin.com/in/tu-perfil)
- **GitHub**: [tu-usuario](https://github.com/tu-usuario)

---

Desarrollado con ❤️ usando Next.js y Tailwind CSS

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
