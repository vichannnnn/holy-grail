import { apiClient } from '@apiClient';

export const adClick = async () => {
  await apiClient.patch(`/ad_analytics/ad_click`);
};

export const adImpression = async () => {
  await apiClient.patch(`/ad_analytics/ad_view`);
};
