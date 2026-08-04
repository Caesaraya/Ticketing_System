import { api, tokenStorage } from './apiClient';

export async function login({ email, password }) {
  const tokenResponse = await api.post('/auth/login', {
    email,
    password,
  });

  if (!tokenResponse?.access_token) {
    throw new Error('Login berhasil tetapi access token tidak diterima.');
  }

  tokenStorage.set(tokenResponse.access_token);

  try {
    const user = await api.get('/auth/me');

    return {
      user,
      token: tokenResponse.access_token,
    };
  } catch (error) {
    tokenStorage.clear();
    throw error;
  }
}

export async function getCurrentUser() {
  return api.get('/auth/me');
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } finally {
    tokenStorage.clear();
  }
}