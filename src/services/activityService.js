import { api } from './apiClient';

export async function getActivityLogs({
  skip = 0,
  limit = 50,
} = {}) {
  return api.get(
    `/activity-logs?skip=${skip}&limit=${limit}`
  );
}