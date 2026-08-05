import { api } from './apiClient';

export async function getNotifications({
  skip = 0,
  limit = 20,
} = {}) {
  return api.get(
    `/notifications?skip=${skip}&limit=${limit}`
  );
}

export async function markNotificationAsRead(
  notificationId
) {
  return api.patch(
    `/notifications/${notificationId}/read`
  );
}