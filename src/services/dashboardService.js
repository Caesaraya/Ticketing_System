import { api } from './apiClient';

export function getDashboardSummary() {
  return api.get('/dashboard/summary');
}