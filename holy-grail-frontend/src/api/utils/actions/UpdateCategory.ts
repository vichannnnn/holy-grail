import apiClient from '../../apiClient';

export const updateSubject = async (id: number, name: string) => {
  return await apiClient.put(`/subject?id=${id}`, { name });
};

export const updateCategory = async (id: number, name: string) => {
  return await apiClient.put(`/category?id=${id}`, { name });
};

export const updateDocumentType = async (id: number, name: string) => {
  return await apiClient.put(`/document_type?id=${id}`, { name });
};
