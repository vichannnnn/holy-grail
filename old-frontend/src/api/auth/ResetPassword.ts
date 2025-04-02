import { apiClient } from '@apiClient';

export const resetPassword = async (token: string) => {
  const response = await apiClient.post(`/auth/reset_password`, {
    token: token,
  });
  return response.data;
};
