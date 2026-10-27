import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { getGoogleSheetsConfig, saveContactToSheets } from "../src/lib/contact/google-sheets.ts";
import { contactSubmissionSchema } from "../src/schemas/contact.schema.ts";

const submission = { nombre: "Prueba", email: "test@example.com", empresa: "", tipoProyecto: "erp-medida", mensaje: "Una consulta válida para probar el almacenamiento.", submissionId: "23e89021-2b1f-4b18-a7cb-c847fca6c781", website: "" };
const config = { url: "https://script.google.com/macros/s/local-test/exec", token: "local-test-secret-which-is-at-least-32-characters" };

test("configuration rejects missing secrets and endpoints outside Apps Script", () => {
  assert.equal(getGoogleSheetsConfig({}), null);
  assert.equal(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: "https://example.com/exec", GOOGLE_SHEETS_WEBHOOK_TOKEN: config.token }), null);
  assert.equal(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: config.url, GOOGLE_SHEETS_WEBHOOK_TOKEN: "short" }), null);
  assert.deepEqual(getGoogleSheetsConfig({ GOOGLE_SHEETS_WEBHOOK_URL: config.url, GOOGLE_SHEETS_WEBHOOK_TOKEN: config.token }), config);
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
  assert.equal(delivered.token, config.token);
  assert.equal(delivered.mensaje, submission.mensaje);
  assert.equal(delivered.website, undefined);
  for (const response of [Response.json({ success: false }), Response.json({ success: true, submissionId: "other-id" }), new Response("Login required"), new Response("unavailable", { status: 503 })]) {
    await assert.rejects(() => saveContactToSheets(submission, config, async () => response));
  }
  await assert.rejects(() => saveContactToSheets(submission, config, async () => { throw new DOMException("Timed out", "TimeoutError"); }));
});

const receiverSource = readFileSync(new URL("../scripts/google-sheets-contact.gs", import.meta.url), "utf8");
function receiverHarness() {
  const rows = [];
  let releases = 0;
  const sheet = {
    getLastRow: () => rows.length, appendRow: row => rows.push(row), setFrozenRows: () => {},
    getRange: () => ({ setValues: values => rows.push(...values), createTextFinder: id => ({ matchEntireCell: () => ({ findNext: () => rows.some(row => row[0] === id) ? {} : null }) }) }),
  };
  const context = vm.createContext({
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => key === "CONTACT_WEBHOOK_TOKEN" ? config.token : "private-sheet-id" }) },
    LockService: { getScriptLock: () => ({ tryLock: () => true, hasLock: () => true, releaseLock: () => releases++ }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush: () => {} },
  });
  vm.runInContext(receiverSource, context);
  return { rows, releases: () => releases, receive: overrides => {
    const body = JSON.stringify({ ...submission, token: config.token, receivedAt: new Date().toISOString(), ...overrides });
    return context.doPost({ postData: { contents: body, length: body.length } });
  } };
}

test("receiver authenticates, escapes formulas and deduplicates retries", () => {
  const harness = receiverHarness();
  assert.equal(harness.receive({ token: "wrong-secret" }).success, false);
  assert.equal(harness.rows.length, 0);
  assert.equal(harness.receive({ mensaje: "invalid" }).success, false);
  assert.equal(harness.rows.length, 0);
  assert.equal(harness.receive({ nombre: '=IMPORTXML("https://example.com")' }).success, true);
  assert.equal(harness.rows.length, 2);
  assert.equal(harness.rows[1][2][0], "'");
  assert.equal(harness.receive({}).success, true);
  assert.equal(harness.rows.length, 2);
  assert.equal(harness.releases(), 2);
});
