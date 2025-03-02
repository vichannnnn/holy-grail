import { apiClient } from '@apiClient';
import { AddTypeDetails } from '@features';

export const createSubject = async (data: AddTypeDetails) => {
  const response = await apiClient.post('/subject', data);
  return response.data;
};
