import { apiClient } from '@apiClient';
import { UpdateTypeDetails } from '@features';

export const updateCategory = async (id: number, data: UpdateTypeDetails) => {
  return await apiClient.put(`/category?id=${id}`, data);
};
