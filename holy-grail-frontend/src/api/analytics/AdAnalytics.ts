import { apiClient } from '@apiClient';

export const adClick = async () => {
  await apiClient.post('/ad_analytics/ad_click');
};

export const adImpression = async () => {
  await apiClient.post('/ad_analytics/ad_view');
};
