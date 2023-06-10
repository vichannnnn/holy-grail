import apiClient from "../../api/apiClient";

export const resetPassword = async (token: string) => {
  const response = await apiClient.get(`/auth/reset_password/${token}`);
  return response.data;
};
