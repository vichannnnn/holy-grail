import { apiClient } from '@apiClient';
import { AddTypeDetails } from '@features';

export const createSubject = async (data: AddTypeDetails) => {
  try {
    const response = await apiClient.post('/subject', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
