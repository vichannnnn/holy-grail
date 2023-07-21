import { apiClient } from '@apiClient';

export const approveNote = async (noteId: number) => {
  const response = await apiClient.put(`/admin/approve/${noteId}`);
  return response.data;
};
