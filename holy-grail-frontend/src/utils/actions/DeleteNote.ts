import apiClient from "../../api/apiClient";

const deleteNote = async (noteId: number) => {
  const response = await apiClient.delete(`/note/${noteId}`);
  return response.data;
};

export default deleteNote;
