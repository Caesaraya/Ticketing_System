// Frontend API configuration.
//
// In development the browser calls /api and Vite proxies
// the request to the FastAPI backend. This avoids requiring
// CORS changes in the backend.
//
// For production, VITE_API_BASE_URL can be configured to point
// to the deployed API.

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || '/api'
).replace(/\/$/, '');