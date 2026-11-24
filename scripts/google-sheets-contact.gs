/** Paste into Extensions > Apps Script in the contact spreadsheet.
 * Run configurarContacto once from the editor before deploying the receiver.
 * See docs/google-sheets.md for deployment and server configuration.
 */
var CONTACT_SHEET_PROPERTY = "CONTACT_SPREADSHEET_ID";
var CONTACT_START_PROPERTY = "CONTACT_NOTIFICATIONS_STARTED_AT";
var CONTACT_EMAIL_PROPERTY = "CONTACT_NOTIFICATION_EMAIL";
var CONTACT_EMAIL_HANDLER = "enviarAvisosDeContacto";
var CONTACT_BATCH_SIZE = 15;
var CONTACT_NOTIFICATION_HEADER = "Aviso enviado UTC";

function configurarContacto() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error("Abrí Apps Script desde la planilla de consultas.");

  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var properties = PropertiesService.getScriptProperties();
    properties.setProperty(CONTACT_SHEET_PROPERTY, spreadsheet.getId());
    var sheet = contactSheet_(spreadsheet);
    contactNotificationColumn_(sheet, true);
    if (!properties.getProperty(CONTACT_START_PROPERTY)) {
      properties.setProperty(CONTACT_START_PROPERTY, new Date().toISOString());
    }
    var notifierExists = ScriptApp.getProjectTriggers().some(function (trigger) {
      return trigger.getHandlerFunction() === CONTACT_EMAIL_HANDLER;
    });
    if (!notifierExists) ScriptApp.newTrigger(CONTACT_EMAIL_HANDLER).timeBased().everyMinutes(5).create();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function contactSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty(CONTACT_SHEET_PROPERTY);
  return id ? SpreadsheetApp.openById(id) : null;
}

function contactSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName("Consultas") || spreadsheet.insertSheet("Consultas");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["ID", "Fecha UTC", "Nombre", "Email", "Empresa", "Tipo de proyecto", "Mensaje", CONTACT_NOTIFICATION_HEADER]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function contactEmailIsValid_(value) {
  return typeof value === "string" && /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(value);
}

function contactNotificationColumn_(sheet, create) {
  var lastColumn = Math.max(7, sheet.getLastColumn());
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var column = headers.indexOf(CONTACT_NOTIFICATION_HEADER) + 1;
  if (column || !create) return column;
  column = lastColumn + 1;
  sheet.getRange(1, column).setValue(CONTACT_NOTIFICATION_HEADER);
  return column;
}

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
        !contactEmailIsValid_(payload.email) ||
        !validText(payload.empresa, 0, 100) || !validText(payload.mensaje, 15, 2000) ||
        types.indexOf(payload.tipoProyecto) === -1 ||
        typeof payload.submissionId !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.submissionId) ||
        !validText(payload.receivedAt, 20, 30) || !isFinite(Date.parse(payload.receivedAt))) {
      return json({ success: false });
    }

    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return json({ success: false });

    var spreadsheet = contactSpreadsheet_();
    if (!spreadsheet) return json({ success: false });
    var sheet = contactSheet_(spreadsheet);
    var lastRow = sheet.getLastRow();
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

function enviarAvisosDeContacto() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  try {
    var properties = PropertiesService.getScriptProperties();
    var startedAt = Date.parse(properties.getProperty(CONTACT_START_PROPERTY));
    var spreadsheet = contactSpreadsheet_();
    if (!spreadsheet || !isFinite(startedAt)) return;
    var sheet = spreadsheet.getSheetByName("Consultas");
    if (!sheet || sheet.getLastRow() <= 1) return;

    var notificationColumn = contactNotificationColumn_(sheet, false);
    if (!notificationColumn) return;
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, notificationColumn).getValues();
    var pending = [];
    for (var i = 0; i < data.length && pending.length < CONTACT_BATCH_SIZE; i++) {
      var row = data[i];
      var receivedAt = row[1] instanceof Date ? row[1].getTime() : Date.parse(row[1]);
      if (row[0] && !row[notificationColumn - 1] && receivedAt >= startedAt) pending.push({ number: i + 2, data: row });
    }
    if (pending.length === 0 || MailApp.getRemainingDailyQuota() < 1) return;

    var recipient = (properties.getProperty(CONTACT_EMAIL_PROPERTY) || "vaglimatias@gmail.com").trim();
    if (!contactEmailIsValid_(recipient)) {
      throw new Error("Configurá una dirección válida en CONTACT_NOTIFICATION_EMAIL.");
    }
    var details = pending.map(function (item) {
      var entry = item.data;
      return "Nombre: " + entry[2] + "\nEmail: " + entry[3] +
        (entry[4] ? "\nNegocio: " + entry[4] : "") + "\n\n" + entry[6];
    });
    var message = {
      to: recipient,
      subject: pending.length === 1 ? "Nueva consulta del portfolio" : pending.length + " nuevas consultas del portfolio",
      body: details.join("\n\n────────────────\n\n") + "\n\nVer en la planilla: " + spreadsheet.getUrl(),
    };
    if (pending.length === 1 && contactEmailIsValid_(pending[0].data[3])) {
      message.replyTo = pending[0].data[3];
    }
    MailApp.sendEmail(message);
    var cells = pending.map(function (item) { return sheet.getRange(item.number, notificationColumn).getA1Notation(); });
    sheet.getRangeList(cells).setValue(new Date().toISOString());
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}
