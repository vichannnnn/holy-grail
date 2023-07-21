import { apiClient } from '@apiClient';
export const updateCategory = async (id: number, name: string) => {
  return await apiClient.put(`/category?id=${id}`, { name });
};
