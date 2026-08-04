import { API_BASE_URL } from '../config/api';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const tokenStorage = {
  get() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  set(token) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};

function notifyUnauthorized() {
  window.dispatchEvent(new CustomEvent('auth:unauthorized'));
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (response.status === 204) {
    return null;
  }

  if (contentType.includes('application/json')) {
    const data = await response.json();

    if (!response.ok) {
      const detail = data?.detail;

      let message;

      if (Array.isArray(detail)) {
        message = detail
          .map((item) => item?.msg || String(item))
          .join(', ');
      } else {
        message =
          detail || `Request failed with status ${response.status}`;
      }

      const error = new Error(message);
      error.status = response.status;
      error.data = data;

      throw error;
    }

    return data;
  }

  const text = await response.text();

  if (!response.ok) {
    const error = new Error(
      text || `Request failed with status ${response.status}`
    );

    error.status = response.status;

    throw error;
  }

  return text;
}

export async function apiRequest(path, options = {}) {
  const {
    body,
    headers: customHeaders,
    ...rest
  } = options;

  const isFormData = body instanceof FormData;

  const headers = new Headers(customHeaders || {});

  if (!isFormData && body !== undefined && body !== null) {
    headers.set('Content-Type', 'application/json');
  }

  const token = tokenStorage.get();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers,
      body: isFormData
        ? body
        : body === undefined || body === null
          ? undefined
          : JSON.stringify(body),
    });
  } catch (error) {
    const networkError = new Error(
      'Unable to reach the Ticketing System API. Make sure the backend is running.'
    );

    networkError.cause = error;

    throw networkError;
  }

  if (response.status === 401) {
    tokenStorage.clear();

    notifyUnauthorized();
  }

  return parseResponse(response);
}

export const api = {
  get(path, options = {}) {
    return apiRequest(path, {
      ...options,
      method: 'GET',
    });
  },

  post(path, body, options = {}) {
    return apiRequest(path, {
      ...options,
      method: 'POST',
      body,
    });
  },

  patch(path, body, options = {}) {
    return apiRequest(path, {
      ...options,
      method: 'PATCH',
      body,
    });
  },

  delete(path, options = {}) {
    return apiRequest(path, {
      ...options,
      method: 'DELETE',
    });
  },
};