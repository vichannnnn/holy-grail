import { apiClient } from '@apiClient';
import { UpdateTypeDetails } from '@features';

export const updateSubject = async (id: number, data: UpdateTypeDetails) => {
  return await apiClient.put(`/subject?id=${id}`, data);
};
