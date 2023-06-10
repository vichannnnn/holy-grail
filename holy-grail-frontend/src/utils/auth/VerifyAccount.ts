import apiClient from "../../api/apiClient";

export const verifyAccount = async (token: string) => {
  const response = await apiClient.get(`/auth/verify/${token}`);
  return response.data;
};
