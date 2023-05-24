import apiClient from "../../api/apiClient";

const approveNote = async (noteId: number) => {
  try {
    const response = await apiClient.put(`/admin/approve/${noteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default approveNote;
