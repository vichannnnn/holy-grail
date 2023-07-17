import { apiClient } from '@apiClient';
import { RoleEnum } from '@features';

export const updateUserRole = async (userId: number, role: RoleEnum): Promise<void> => {
  const response = await apiClient.put(`/admin/user/${userId}`, { role });
  return response.data;
};
