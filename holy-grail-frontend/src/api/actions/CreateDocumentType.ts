import { apiClient } from '@apiClient';
export const createDocumentType = async (name: string) => {
  try {
    const response = await apiClient.post('/document_type', { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
