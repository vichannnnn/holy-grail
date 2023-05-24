import { AxiosError } from "axios";
import apiClient from "../../api/apiClient";

export const createNote = async (
  file: File,
  category: number | "",
  subject: number | "",
  type: number | ""
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", String(category));
  formData.append("subject", String(subject));
  formData.append("type", String(type));

  try {
    const response = await apiClient.post("/note/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        category: String(category),
        subject: String(subject),
        type: String(type),
      },
    });
    return response.status;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response ? axiosError.response.status : 500;
  }
};
