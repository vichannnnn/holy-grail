import apiClient from "../../api/apiClient";

export const verifyAccount = async (token: string) => {
  const response = await apiClient.post(`/auth/verify`, {
    token: token
  });
  return response.data;

};
