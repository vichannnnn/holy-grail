import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '@apiClient';
import { NoteInfoProps } from '@features';

export const createNote = async (formData: NoteInfoProps[]): Promise<AxiosResponse> => {
  try {
    return await apiClient.post('/note', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};
