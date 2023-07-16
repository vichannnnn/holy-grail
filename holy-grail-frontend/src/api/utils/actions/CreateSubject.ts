import { apiClient } from '@apiClient';

export const createSubject = async (name: string) => {
  try {
    const response = await apiClient.post('/subject', { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
