import apiClient from "../../api/apiClient";

const approveNote = async (noteId: number) => {
  const response = await apiClient.put(`/admin/approve/${noteId}`);
  return response.data;
};

export default approveNote;
