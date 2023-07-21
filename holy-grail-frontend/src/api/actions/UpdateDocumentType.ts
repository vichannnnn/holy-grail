import { apiClient } from '@apiClient';
export const updateDocumentType = async (id: number, name: string) => {
  return await apiClient.put(`/document_type?id=${id}`, { name });
};
