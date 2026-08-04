import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from '../services/authService';

import { tokenStorage } from '../services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      const token = tokenStorage.get();

      if (!token) {
        if (mounted) {
          setUser(null);
          setIsInitializing(false);
        }

        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (mounted) {
          setUser(currentUser);
        }
      } catch {
        tokenStorage.clear();

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    }

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      tokenStorage.clear();
      setUser(null);
    }

    window.addEventListener(
      'auth:unauthorized',
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        'auth:unauthorized',
        handleUnauthorized
      );
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await loginApi(credentials);

    setUser(result.user);

    return result;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
      tokenStorage.clear();
    }
  }, []);

  const value = {
    user,

    role: user?.role ?? null,

    isAuthenticated: Boolean(user),

    isInitializing,

    login,

    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}