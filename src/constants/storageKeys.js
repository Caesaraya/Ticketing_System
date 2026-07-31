// Names of the localStorage keys the app writes to. Centralized so a
// future rename (or migration to cookies/JWT storage) touches one file.
export const STORAGE_KEYS = Object.freeze({
  AUTH: 'wssi_auth',
  THEME: 'wssi_theme',
});
