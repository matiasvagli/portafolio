const draftKey = "portafolio.contact-draft";
let currentDraft: string | undefined;

export function saveContactDraft(message: string) {
  currentDraft = message;
  try {
    sessionStorage.setItem(draftKey, message);
  } catch {
    // Keep the draft in memory when browser storage is unavailable.
  }
}

export function readContactDraft() {
  if (currentDraft !== undefined) return currentDraft;
  try {
    return sessionStorage.getItem(draftKey) ?? "";
  } catch {
    return "";
  }
}

export function clearContactDraft() {
  currentDraft = "";
  try {
    sessionStorage.removeItem(draftKey);
  } catch {
    // The in-memory draft has already been cleared.
  }
}
