# Consultas en Google Sheets

La conexión sigue el mismo esquema que la landing de BitGoTe: un Apps Script
vinculado a la planilla y una URL privada en Vercel. No necesita propiedades,
token ni ID de planilla.

## Conectar la planilla del portafolio

1. Abrí la planilla donde querés recibir las consultas del portafolio.
2. Entrá en **Extensiones → Apps Script** y pegá el contenido completo de
   [`scripts/google-sheets-contact.gs`](../scripts/google-sheets-contact.gs). Guardá.
3. Elegí **Implementar → Nueva implementación → Aplicación web**, con
   **Ejecutar como: yo** y **Quién tiene acceso: cualquier persona**. Autorizá y
   copiá la URL que termina en `/exec`.
4. Configurá esa URL en Vercel, en la variable privada `GOOGLE_SHEETS_WEBHOOK_URL`,
   y volvé a desplegar el sitio. No uses el prefijo `NEXT_PUBLIC_`.

Si ya tenés una implementación del portafolio, podés editarla desde
**Implementar → Administrar implementaciones → lápiz → Nueva versión → Implementar**.
Eso conserva la URL existente. No reemplaces el script de BitGoTe: usá el proyecto
vinculado a la planilla del portafolio.

El script crea una pestaña **Consultas** con ID, Fecha UTC, Nombre, Email,
Empresa, Tipo de proyecto y Mensaje. No modifica las otras pestañas ni envía correos.
La planilla puede seguir privada. El receptor acepta escrituras sin token, igual
que BitGoTe: quien conozca la URL puede enviar datos válidos. Mantenela solo en el
servidor. La variable anterior `GOOGLE_SHEETS_WEBHOOK_TOKEN` ya no se utiliza.

Para desarrollo local, agregá en `.env.local` y reiniciá el servidor:

```dotenv
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_IMPLEMENTACION/exec
```

## Verificar

Abrí `/contacto`, enviá una consulta y comprobá la confirmación y la fila nueva
en **Consultas**. Solo se muestra éxito si Google confirma el mismo ID.
Si falla, los campos se conservan; reintentar sin modificarlos no duplica la fila.

Si Google devuelve **«No se encontró la función de la secuencia de comandos:
doPost»**, falta publicar la versión que contiene el script. Guardar el código
no actualiza la implementación: editá la implementación y elegí **Nueva versión**.

Los logs del servidor distinguen respuesta inválida (`UPSTREAM_INVALID_RESPONSE`),
rechazo HTTP (`UPSTREAM_HTTP_ERROR`), falta de confirmación (`STORAGE_NOT_CONFIRMED`)
y red o timeout (`UPSTREAM_REQUEST_FAILED`). No incluyen datos personales ni la URL.

Los tests locales usan un receptor simulado. Verifican validación, confirmación,
escapado de fórmulas y reintentos; no verifican los permisos ni el despliegue real
de Google.
