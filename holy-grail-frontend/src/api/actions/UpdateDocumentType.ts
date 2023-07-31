import { apiClient } from '@apiClient';
import { UpdateTypeDetails } from '@features';

export const updateDocumentType = async (id: number, data: UpdateTypeDetails) => {
  return await apiClient.put(`/document_type?id=${id}`, data);
};
