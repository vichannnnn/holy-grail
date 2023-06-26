import apiClient from '../../apiClient';

const deleteNote = async (noteId: number) => {
  const response = await apiClient.delete(`/note/${noteId}`);
  return response.data;
};

export default deleteNote;
