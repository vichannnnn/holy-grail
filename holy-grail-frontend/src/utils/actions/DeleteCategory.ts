import apiClient from "../../api/apiClient";

export const deleteSubject = async (id: number) => {
  
  return await apiClient.delete(`/subject?id=${id}`);
};

export const deleteCategory = async (id: number) => {
  
  return await apiClient.delete(`/category?id=${id}`);
};

export const deleteDocumentType = async (id: number) => {
  return await apiClient.delete(`/document_type?id=${id}`);
};
