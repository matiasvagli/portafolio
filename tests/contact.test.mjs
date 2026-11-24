import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { ContactDeliveryError, getGoogleSheetsConfig, saveContactToSheets } from "../src/lib/contact/google-sheets.ts";
import { commercialMessageLimit, contactSubmissionSchema, contactTopics } from "../src/schemas/contact.schema.ts";

const submission = { nombre: "Prueba", email: "test@example.com", empresa: "", tipoProyecto: "erp-medida", mensaje: "Una consulta válida para probar el almacenamiento.", submissionId: "23e89021-2b1f-4b18-a7cb-c847fca6c781", website: "" };
const config = { url: "https://script.google.com/macros/s/local-test/exec" };

test("configuration only requires the published Apps Script URL", () => {
  assert.equal(getGoogleSheetsConfig({}), null);
  assert.equal(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: "https://example.com/exec" }), null);
  assert.equal(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: config.url.replace(/exec$/, "dev") }), null);
  assert.deepEqual(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: ` ${config.url}\n` }), config);
});

test("whitespace-only values and populated honeypots are rejected", () => {
  assert.equal(contactSubmissionSchema.safeParse({ ...submission, nombre: "   " }).success, false);
  assert.equal(contactSubmissionSchema.safeParse({ ...submission, mensaje: " ".repeat(25) }).success, false);
  assert.equal(contactSubmissionSchema.safeParse({ ...submission, website: "spam.example" }).success, false);
  assert.equal(contactSubmissionSchema.parse({ ...submission, email: " test@example.com " }).email, submission.email);
});

test("only a matching acknowledgment counts as a successful save", async () => {
  let delivered;
  await saveContactToSheets(submission, config, async (url, options) => {
    assert.equal(url, config.url);
    assert.equal(options.method, "POST");
    assert(options.signal instanceof AbortSignal);
    delivered = JSON.parse(options.body);
    return Response.json({ success: true, submissionId: submission.submissionId });
  });
  assert.equal(delivered.token, undefined);
  assert.equal(delivered.mensaje, submission.mensaje);
  assert.equal(delivered.website, undefined);
  for (const response of [Response.json({ success: false }), Response.json({ success: true, submissionId: "other-id" }), new Response("Login required"), new Response("unavailable", { status: 503 })]) {
    await assert.rejects(() => saveContactToSheets(submission, config, async () => response));
  }
  await assert.rejects(() => saveContactToSheets(submission, config, async () => { throw new DOMException("Timed out", "TimeoutError"); }));
});

test("Apps Script HTML errors with HTTP 200 are diagnosed without exposing response contents", async () => {
  const response = new Response('<html>No se encontró la función de la secuencia de comandos: doPost</html>', {
    headers: { "Content-Type": "text/html" },
  });
  await assert.rejects(() => saveContactToSheets(submission, config, async () => response), error => {
    assert(error instanceof ContactDeliveryError);
    assert.equal(error.code, "UPSTREAM_INVALID_RESPONSE");
    assert.equal(error.upstreamStatus, 200);
    assert.equal(error.message, "UPSTREAM_INVALID_RESPONSE");
    return true;
  });
  await assert.rejects(() => saveContactToSheets(submission, config, async () => Response.json({ success: false })), {
    code: "STORAGE_NOT_CONFIRMED",
  });
});

const receiverSource = readFileSync(new URL("../scripts/google-sheets-contact.gs", import.meta.url), "utf8");
function receiverHarness({ linked = true, initialRows = [] } = {}) {
  const rows = structuredClone(initialRows);
  const messages = [];
  const triggers = [];
  const properties = new Map(linked ? [["CONTACT_SPREADSHEET_ID", "spreadsheet-test"]] : []);
  let releases = 0;
  let quota = 1;
  let emailError;
  let inEditor = false;

  function setCell(row, column, value) {
    rows[row - 1] ??= [];
    rows[row - 1][column - 1] = value;
  }

  const sheet = {
    getLastRow: () => rows.length,
    getLastColumn: () => Math.max(0, ...rows.map(row => row.length)),
    appendRow: row => rows.push(row),
    setFrozenRows: () => {},
    getRange: (row, column, rowCount = 1, columnCount = 1) => ({
      setValues: values => values.forEach((valuesRow, i) => valuesRow.forEach((value, j) => setCell(row + i, column + j, value))),
      getValues: () => Array.from({ length: rowCount }, (_, i) => Array.from({ length: columnCount }, (_, j) => {
        const value = rows[row + i - 1]?.[column + j - 1] ?? "";
        return typeof value === "string" ? value.replace(/^'/, "") : value;
      })),
      setValue: value => setCell(row, column, value),
      getA1Notation: () => String.fromCharCode(64 + column) + row,
      createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows.some(row => row[0] === id) ? {} : null }) }),
    }),
    getRangeList: cells => ({ setValue: value => cells.forEach(cell => setCell(Number(cell.slice(1)), cell.charCodeAt(0) - 64, value)) }),
  };

  const spreadsheet = {
    getSheetByName: () => sheet,
    getId: () => "spreadsheet-test",
    getUrl: () => "https://docs.google.com/spreadsheets/d/spreadsheet-test/edit",
  };
  const propertyStore = {
    getProperty: key => properties.get(key) ?? null,
    setProperty: (key, value) => properties.set(key, value),
  };
  const context = vm.createContext({
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, waitLock: () => {}, hasLock: () => true, releaseLock: () => releases++ }) },
    PropertiesService: { getScriptProperties: () => propertyStore },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => inEditor ? spreadsheet : null,
      openById: id => { assert.equal(id, spreadsheet.getId()); return spreadsheet; },
      flush: () => {},
    },
    ScriptApp: {
      getProjectTriggers: () => triggers,
      newTrigger: name => ({ timeBased: () => ({ everyMinutes: minutes => ({
        create: () => triggers.push({ getHandlerFunction: () => name, minutes }),
      }) }) }),
    },
    MailApp: {
      getRemainingDailyQuota: () => quota,
      sendEmail: message => {
        if (emailError) throw emailError;
        messages.push(message);
      },
    },
  });
  vm.runInContext(receiverSource, context);
  return {
    rows, triggers, messages, properties, releases: () => releases,
    configure: () => {
      inEditor = true;
      try { context.configurarContacto(); } finally { inEditor = false; }
    },
    notify: () => context.enviarAvisosDeContacto(),
    setQuota: value => { quota = value; },
    setEmailError: value => { emailError = value; },
    receive: overrides => {
      const body = JSON.stringify({ ...submission, receivedAt: new Date().toISOString(), ...overrides });
      return context.doPost({ postData: { contents: body, length: body.length } });
    },
  };
}

test("bound spreadsheet receiver validates, escapes formulas and deduplicates retries", () => {
  const harness = receiverHarness();
  assert.equal(harness.receive({ mensaje: "invalid" }).success, false);
  assert.equal(harness.rows.length, 0);
  assert.equal(harness.receive({ nombre: '=IMPORTXML("https://example.com")' }).success, true);
  assert.equal(harness.rows.length, 2);
  assert.equal(harness.rows[1][2][0], "'");
  assert.equal(harness.receive({}).success, true);
  assert.equal(harness.rows.length, 2);
  assert.equal(harness.releases(), 2);
});

test("server and bound spreadsheet confirm storage using only a webhook URL", async () => {
  const harness = receiverHarness();
  const fetcher = async (_url, options) => Response.json(harness.receive(JSON.parse(options.body)));
  await saveContactToSheets(submission, config, fetcher);
  await saveContactToSheets(submission, config, fetcher);
  assert.equal(harness.rows.length, 2);
  assert.equal(harness.rows[1][0], submission.submissionId);
  assert.equal(harness.rows[1][6], "'" + submission.mensaje);
});

test("commercial subjects reach the deployed receiver contract and fit the message limit", async () => {
  const harness = receiverHarness();
  const asunto = contactTopics[1];
  const mensaje = "a".repeat(commercialMessageLimit);
  const commercial = { ...submission, tipoProyecto: "otro", asunto, mensaje };
  assert.equal(contactSubmissionSchema.safeParse({ ...commercial, asunto: "Tema desconocido" }).success, false);
  assert.equal(contactSubmissionSchema.safeParse({ ...commercial, mensaje: mensaje + "a" }).success, false);
  assert.equal(contactSubmissionSchema.safeParse({ ...submission, mensaje: "a".repeat(2000) }).success, true);
  await saveContactToSheets(contactSubmissionSchema.parse(commercial), config, async (_url, options) => {
    return Response.json(harness.receive(JSON.parse(options.body)));
  });
  assert.equal(harness.rows[1][6], `'Asunto: ${asunto}\n\n${mensaje}`);
});

test("the receiver uses the bound sheet ID outside the editor and installs the email trigger once", () => {
  const harness = receiverHarness({ linked: false, initialRows: [
    ["ID", "Fecha UTC", "Nombre", "Email", "Empresa", "Tipo de proyecto", "Mensaje", "Seguimiento manual"],
  ] });

  assert.equal(harness.receive({}).success, false);
  harness.configure();
  const activation = harness.properties.get("CONTACT_NOTIFICATIONS_STARTED_AT");
  harness.configure();
  assert.equal(harness.properties.get("CONTACT_NOTIFICATIONS_STARTED_AT"), activation);
  assert.equal(harness.triggers.length, 1);
  assert.equal(harness.triggers[0].minutes, 5);
  assert.equal(harness.rows[0][7], "Seguimiento manual");
  assert.equal(harness.rows[0][8], "Aviso enviado UTC");
  assert.equal(harness.receive({}).success, true);
});

test("email notifications preserve saved leads, retry after a failure and mark only emailed rows", () => {
  const harness = receiverHarness();
  harness.configure();
  const activation = Date.parse(harness.properties.get("CONTACT_NOTIFICATIONS_STARTED_AT"));
  const olderId = "6986ca45-070d-4447-b0bb-84b2454d6b7f";
  assert.equal(harness.receive({ receivedAt: new Date(activation - 1000).toISOString(), submissionId: olderId }).success, true);
  assert.equal(harness.receive({ receivedAt: new Date(activation).toISOString() }).success, true);

  harness.setQuota(0);
  harness.notify();
  assert.equal(harness.messages.length, 0);
  harness.setQuota(1);
  harness.setEmailError(new Error("transient error"));
  assert.throws(harness.notify, /transient error/);
  assert.equal(harness.rows[2][7], undefined);
  assert.equal(harness.rows[2][0], submission.submissionId);

  harness.setEmailError(undefined);
  harness.notify();
  harness.notify();
  assert.equal(harness.messages.length, 1);
  assert.equal(harness.messages[0].to, "vaglimatias@gmail.com");
  assert.equal(harness.messages[0].replyTo, submission.email);
  assert.match(harness.messages[0].body, /Nombre: Prueba/);
  assert(harness.messages[0].body.includes(submission.mensaje));
  assert.equal(harness.rows[1][7], undefined);
  assert(Number.isFinite(Date.parse(harness.rows[2][7])));
});

test("several new leads go in one email to the configured owner", () => {
  const harness = receiverHarness();
  harness.configure();
  harness.properties.set("CONTACT_NOTIFICATION_EMAIL", "owner@example.com");
  assert.equal(harness.receive({}).success, true);
  assert.equal(harness.receive({ nombre: "Otra consulta", email: "lead@example.com", submissionId: "fd414cc1-f615-472b-b4ee-af66f066570e" }).success, true);
  harness.notify();
  assert.equal(harness.messages.length, 1);
  assert.equal(harness.messages[0].to, "owner@example.com");
  assert.match(harness.messages[0].subject, /^2 nuevas consultas/);
  assert.match(harness.messages[0].body, /lead@example\.com/);
  assert.equal(harness.messages[0].replyTo, undefined);
  assert(harness.rows.slice(1).every(row => Number.isFinite(Date.parse(row[7]))));
});
