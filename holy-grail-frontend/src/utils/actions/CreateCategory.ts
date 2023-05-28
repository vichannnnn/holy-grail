import apiClient from "../../api/apiClient";

export const createCategory = async (name: string) => {
  try {
    const response = await apiClient.post("/category", { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSubject = async (name: string) => {
  try {
    const response = await apiClient.post("/subject", { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDocumentType = async (name: string) => {
  try {
    const response = await apiClient.post("/document_type", { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
