import apiClient from "../../api/apiClient";

const deleteNote = async (noteId: number | null) => {
  try {
    const response = await apiClient.delete(`/note/${noteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default deleteNote;
