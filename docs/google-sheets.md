# Consultas en Google Sheets y avisos por email

El formulario guarda cada consulta en la pestaña **Consultas**. Los avisos por
Gmail se envían desde Apps Script cada cinco minutos y el guardado se confirma
por separado. Si llegan varias consultas, el aviso incluye todas las que
procesó en ese intervalo.

## Activar en la planilla del portfolio

1. Abrí la planilla del portfolio y entrá en **Extensiones → Apps Script**.
   Pegá y guardá el contenido de [google-sheets-contact.gs](../scripts/google-sheets-contact.gs).
2. Elegí **configurarContacto** en el selector de funciones, hacé clic en
   **Ejecutar** y autorizá Sheets y el envío de correo con tu cuenta de Google.
   Esto registra la planilla y crea el activador de avisos. Podés repetirlo sin
   crear otro activador desde la misma cuenta.
3. Si ya hay una aplicación web, entrá en **Implementar → Administrar
   implementaciones**, editá la existente, elegí **Nueva versión** e
   implementala. La URL que ya usa Vercel sigue siendo la misma.
4. Si es una planilla nueva, elegí **Implementar → Nueva implementación →
   Aplicación web**, con **Ejecutar como: yo** y **Quién tiene acceso:
   cualquier persona**. Copiá la URL que termina en `/exec`, configurala en la
   variable privada `GOOGLE_SHEETS_WEBHOOK_URL` de Vercel y volvé a desplegar.

Usá el proyecto de Apps Script asociado a la planilla del portfolio. La
planilla puede seguir privada. Mantené la URL del webhook en el servidor y
usá la variable sin el prefijo `NEXT_PUBLIC_`.

Los avisos van a **vaglimatias@gmail.com**. Si querés usar otra dirección, agregá
`CONTACT_NOTIFICATION_EMAIL` en **Configuración del proyecto → Propiedades de la
secuencia de comandos**. Al responder a un aviso de una sola consulta, el
destinatario de la respuesta es el email que dejó el visitante. Los avisos
agrupados incluyen cada dirección en el cuerpo.

La columna **Aviso enviado UTC** registra qué consultas ya se notificaron.
El activador toma las consultas recibidas desde la primera configuración. Si el
correo falla o se agota el cupo de Gmail, la consulta sigue en la planilla y el
activador vuelve a intentar el aviso en una ejecución posterior.

## Verificar

Enviá una consulta de prueba desde `/contacto` y buscá la fila nueva en
**Consultas**. Dentro del ciclo del activador, revisá que llegue un aviso a
Gmail y se complete **Aviso enviado UTC**. El formulario confirma el guardado
cuando Google responde con el ID de la consulta. Si falla, conserva los campos
para reintentar con el mismo ID.

Si Google devuelve **«No se encontró la función de la secuencia de comandos:
doPost»**, publicá una nueva versión de la implementación existente. Si el
guardado funciona y falta el correo, revisá **Activadores** y **Ejecuciones**
en Apps Script para confirmar que `enviarAvisosDeContacto` esté autorizado.

Para habilitar el formulario en desarrollo, agregá la URL de tu receptor de
prueba a `.env.local` y reiniciá el servidor.

```dotenv
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/TU_IMPLEMENTACION/exec
```

Los tests locales simulan Apps Script, la planilla y el envío de correo.
