import { apiClient } from '@apiClient';
import { AddTypeDetails } from '@features';

export const createCategory = async (data: AddTypeDetails) => {
  try {
    const response = await apiClient.post('/category', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
