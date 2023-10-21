import { apiClient } from '@apiClient';

export interface AnalyticsResponse {
  file_download_count: number;
  unique_active_users: number;
  user_count: number;
}

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await apiClient.get('/analytics');
  return response.data;
};
