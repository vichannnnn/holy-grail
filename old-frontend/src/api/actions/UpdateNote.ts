import { apiClient } from '@apiClient';

export const updateNote = async (
  noteId: number,
  uploaded_by: number | undefined,
  newCategory: number | '',
  newSubject: number | '',
  newType: number | '',
  newDocName: string | '',
  newYear: number | '' | null,
) => {
  if (newYear === '') {
    newYear = null;
  }

  const response = await apiClient.put(`/note/${noteId}`, {
    category: newCategory,
    subject: newSubject,
    type: newType,
    year: newYear,
    document_name: newDocName,
    uploaded_by: uploaded_by,
  });
  return response.data;
};
