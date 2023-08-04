import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';
import { ResponseData, UpdateEmailDetails } from './types';

export const updateEmail = async (formData: UpdateEmailDetails): Promise<ResponseData> => {
  try {
    await apiClient.put('/auth/update_email', formData);

    return { success: true, message: 'Email successfully updated.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorDescription = 'Unable to update email. Please check your input and try again.';
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          errorDescription = 'Your email does not match. Please check your email and try again.';
          break;
        case 401:
          errorDescription = 'You are not authorized to perform this action.';
          break;
        case 403:
          errorDescription = "The current email you've entered is invalid.";
          break;
        case 422:
          errorDescription = 'Please ensure your new email format is valid.';
          break;
      }
    }

    return { success: false, message: errorDescription };
  }
};
