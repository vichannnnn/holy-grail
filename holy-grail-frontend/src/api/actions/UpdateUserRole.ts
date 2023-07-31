import { apiClient } from '@apiClient';
import { UpdateUserDetails } from '@features';

export const updateUserRole = async (userId: number, data: UpdateUserDetails): Promise<void> => {
  const response = await apiClient.put(`/admin/user/${userId}`, data);
  return response.data;
};
