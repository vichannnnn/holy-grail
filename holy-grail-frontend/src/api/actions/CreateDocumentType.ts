import { apiClient } from '@apiClient';
import { AddTypeDetails } from '@features';

export const createDocumentType = async (data: AddTypeDetails) => {
  const response = await apiClient.post('/document_type', data);
  return response.data;
};
