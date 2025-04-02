import { UpdateTypeDetails } from '@layouts/Developer';

import { apiClient } from '@apiClient';

export const updateCategory = async (id: number, data: UpdateTypeDetails) => {
  return await apiClient.put(`/category?id=${id}`, data);
};
