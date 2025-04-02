import { apiClient } from '@apiClient';
import { DocumentType } from './types';

export const fetchAllDocumentTypes = async (): Promise<DocumentType[]> => {
  const response = await apiClient.get('/all_document_type');
  const documents = response.data;

  return documents.map((document: DocumentType) => ({
    id: document.id,
    name: document.name,
  }));
};
