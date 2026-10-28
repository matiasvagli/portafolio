/** Paste into Extensions > Apps Script in the contact spreadsheet.
 * Uses the bound spreadsheet, just like the BitGoTe landing receiver.
 * See docs/google-sheets.md for deployment and server configuration.
 */
function doPost(event) {
  function json(value) {
    return ContentService.createTextOutput(JSON.stringify(value))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var lock = null;
  try {
    if (!event || !event.postData || event.postData.length > 16000) {
      return json({ success: false });
    }
    var payload = JSON.parse(event.postData.contents);

    var types = ["arquitectura-backend", "erp-medida", "ia-mcp-rag", "auditoria-optimizacion", "otro"];
    function validText(value, min, max) {
      return typeof value === "string" && value.trim().length >= min && value.length <= max;
    }
    if (!validText(payload.nombre, 2, 80) || !validText(payload.email, 3, 120) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
        !validText(payload.empresa, 0, 100) || !validText(payload.mensaje, 15, 2000) ||
        types.indexOf(payload.tipoProyecto) === -1 ||
        typeof payload.submissionId !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.submissionId) ||
        !validText(payload.receivedAt, 20, 30) || !isFinite(Date.parse(payload.receivedAt))) {
      return json({ success: false });
    }

    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return json({ success: false });

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Consultas") || spreadsheet.insertSheet("Consultas");
    var lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow(["ID", "Fecha UTC", "Nombre", "Email", "Empresa", "Tipo de proyecto", "Mensaje"]);
      sheet.setFrozenRows(1);
      lastRow = 1;
    }
    // A retry after a timeout must not create a duplicate lead.
    if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(payload.submissionId).matchEntireCell(true).findNext()) {
      return json({ success: true, submissionId: payload.submissionId });
    }
    function safeCell(value) {
      // Treat all user-controlled cells as text, including formula prefixes.
      return "'" + value;
    }
    sheet.getRange(lastRow + 1, 1, 1, 7).setValues([[
      payload.submissionId, payload.receivedAt, safeCell(payload.nombre),
      safeCell(payload.email), safeCell(payload.empresa),
      safeCell(payload.tipoProyecto), safeCell(payload.mensaje)
    ]]);
    SpreadsheetApp.flush();
    return json({ success: true, submissionId: payload.submissionId });
  } catch (_) {
    // Do not log message contents, email addresses or credentials.
    return json({ success: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
