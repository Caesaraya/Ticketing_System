import { createContext, useContext, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { loginDummy } from '../services/authService';

const AuthContext = createContext(null);

// Holds the current session. Backed by localStorage today so the
// dummy login survives a page refresh; the shape (user, login, logout)
// is deliberately the same shape a real JWT-based context would expose,
// so pages never need to change when the backend arrives.
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getStorageItem(STORAGE_KEYS.AUTH));

  const login = useCallback(async ({ email, password }) => {
    const result = await loginDummy({ email, password });
    setAuth(result);
    setStorageItem(STORAGE_KEYS.AUTH, result);
    return result;
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
    removeStorageItem(STORAGE_KEYS.AUTH);
  }, []);

  const value = {
    user: auth?.user ?? null,
    role: auth?.user?.role ?? null,
    isAuthenticated: Boolean(auth),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}