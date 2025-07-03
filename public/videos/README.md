# Optimización de Videos para Web

## Tu video actual:
- **Duración**: 1:18 min
- **Tamaño**: 28MB
- **Problema**: Demasiado pesado para web

## Tamaño objetivo:
- **Ideal**: 5-8MB para 1:18 min
- **Máximo aceptable**: 10MB

## Instrucciones para optimizar:

### Opción 1: HandBrake (Recomendado - Gratis)
1. Descarga HandBrake: https://handbrake.fr/
2. Abre tu video en HandBrake
3. Configuración:
   - **Preset**: "Web" o "Fast 720p30"
   - **Video Codec**: H.264
   - **Quality**: RF 26-28 (empieza con 26)
   - **Framerate**: 30fps
   - **Resolution**: 1280x720 o 1920x1080

### Opción 2: Online (Más fácil)
- CloudConvert: https://cloudconvert.com/mp4-converter
- Configuración: H.264, 720p, bitrate 1000-1500 kbps

### Opción 3: FFmpeg (Comando)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k output.mp4
```

## Después de optimizar:
1. Renombra el archivo a: `sistema-ventas-demo.mp4`
2. Guárdalo en: `public/videos/sistema-ventas-demo.mp4`
3. El sistema de carga diferida evitará que se cargue hasta que el usuario haga clic

## Beneficios del sistema implementado:
- ✅ Carga diferida (no afecta velocidad inicial)
- ✅ Mejor experiencia de usuario
- ✅ Placeholder atractivo
- ✅ Responsive design
- ✅ Controles nativos del navegador
