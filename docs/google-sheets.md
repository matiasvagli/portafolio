# Consultas en Google Sheets

El servidor envía la consulta a un Apps Script, que agrega una fila a una planilla
privada. Solo confirma el envío si el receptor devuelve el mismo ID.
Sin configuración, el formulario ofrece WhatsApp y email y deshabilita el envío.

## Preparar una planilla nueva

1. Creá una planilla **Consultas del portafolio** y mantenela privada.
2. Abrí **Extensiones → Apps Script** y pegá el contenido de
   [`scripts/google-sheets-contact.gs`](../scripts/google-sheets-contact.gs).
3. En **Configuración del proyecto → Propiedades de la secuencia de comandos**, agregá:

   | Propiedad | Valor |
   | --- | --- |
   | `SPREADSHEET_ID` | El ID entre `/d/` y `/edit` de la URL de la planilla. |
   | `CONTACT_WEBHOOK_TOKEN` | Un secreto aleatorio de al menos 32 caracteres. |

   Para generar el secreto localmente: `openssl rand -hex 32`. Guardalo en las
   propiedades de Google y las variables privadas del servidor; nunca en Git.
4. Elegí **Implementar → Nueva implementación → Aplicación web**.
   Configurá **Ejecutar como: yo** y **Quién tiene acceso: cualquier persona**.
   Autorizá el acceso a la planilla y copiá la URL publicada que termina en `/exec`.

El script crea **Consultas** con ID, Fecha UTC, Nombre, Email, Empresa,
Tipo de proyecto y Mensaje. La URL del receptor acepta solicitudes sin inicio
de sesión, pero exige el secreto para cada escritura; no publica la planilla.
No envía correos ni notificaciones.

## Configurar el servidor

Copiá `.env.example` a `.env.local` y completá:

```dotenv
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_IMPLEMENTACION/exec
GOOGLE_SHEETS_WEBHOOK_TOKEN=EL_MISMO_SECRETO_DE_LAS_PROPIEDADES_DEL_SCRIPT
```

Reiniciá el servidor. En el hosting, configurá estas mismas variables privadas y
volvé a desplegar. Nunca uses `NEXT_PUBLIC_` para estos valores.

## Verificar

1. Abrí `/contacto` y enviá una consulta de prueba.
2. Comprobá la confirmación y la fila nueva en **Consultas**.
3. Si hay un error, los campos se conservan. Reintentar sin modificar los datos
   conserva el ID para evitar duplicados cuando el primer envío llegó pero se
   perdió su respuesta.

Los tests locales usan un receptor simulado. No verifican una implementación
real de Google, sus permisos ni sus cuotas. El receptor escapa las celdas de
los visitantes, serializa escrituras y no registra datos personales o secretos.

Después de modificar Apps Script, actualizá la implementación a la nueva versión;
guardar el archivo no actualiza por sí solo la URL publicada.

Referencia: [documentación oficial de aplicaciones web de Apps Script](https://developers.google.com/apps-script/guides/web).
