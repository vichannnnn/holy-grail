import { apiClient } from '@apiClient';

export const createCategory = async (name: string) => {
  try {
    const response = await apiClient.post('/category', { name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
