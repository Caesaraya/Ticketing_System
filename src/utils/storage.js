// Thin wrapper around localStorage that never throws (private-browsing
// mode, storage quota, or corrupted JSON should degrade quietly instead
// of crashing the app) and always speaks JSON.
export function getStorageItem(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write errors
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
