import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStorageItem, setStorageItem } from '../utils/storage';

const ThemeContext = createContext(null);

function getInitialTheme() {
  const stored = getStorageItem(STORAGE_KEYS.THEME);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Applies/removes the `dark` class on <html> and persists the choice.
// Tailwind v4's dark: utilities are wired (via the @custom-variant rule
// in index.css) to react to that class, not just OS-level preference.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    setStorageItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
