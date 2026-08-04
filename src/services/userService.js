import { api } from './apiClient';

export function getUsers(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();

  return api.get(
    query ? `/users?${query}` : '/users'
  );
}

export function getUserById(userId) {
  return api.get(
    `/users/${encodeURIComponent(userId)}`
  );
}

export function getStaffUsers() {
  return getUsers({
    role: 'STAFF_IT',
    skip: 0,
    limit: 100,
  });
}