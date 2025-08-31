import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';
import { ResponseData, UpdateEmailDetails } from './types';

export const updateEmail = async (formData: UpdateEmailDetails): Promise<ResponseData> => {
  try {
    await apiClient.post('/auth/update_email', formData);

    return { success: true, message: 'Email successfully updated.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorDescription = 'Unable to update email. Please check your input and try again.';
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          errorDescription = "You cannot update a new email with the email you're currently using.";
          break;
        case 401:
          errorDescription = 'You are not authorized to perform this action.';
          break;
        case 422:
          errorDescription = 'Please ensure your new email format is valid.';
          break;
      }
    }

    return { success: false, message: errorDescription };
  }
};
