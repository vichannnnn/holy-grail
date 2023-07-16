import { apiClient } from '@apiClient';

export const updateSubject = async (id: number, name: string) => {
  return await apiClient.put(`/subject?id=${id}`, { name });
};
