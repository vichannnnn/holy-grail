import { apiClient } from '@apiClient';

export const deleteNote = async (noteId: number) => {
  const response = await apiClient.delete(`/note/${noteId}`);
  return response.data;
};
