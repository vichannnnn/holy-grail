import { AddTypeDetails } from '@layouts/Developer';

import { apiClient } from '@apiClient';

export const createDocumentType = async (data: AddTypeDetails) => {
  const response = await apiClient.post('/document_type', data);
  return response.data;
};
