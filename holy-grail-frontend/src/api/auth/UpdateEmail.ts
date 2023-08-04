import { apiClient } from '@apiClient';
import axios, { AxiosError } from 'axios';
import { ResponseData, UpdateEmailDetails } from './types';

export const updateEmail = async (formData: UpdateEmailDetails): Promise<ResponseData> => {
  try {
    await apiClient.post('/auth/update_email', formData);

    return { success: true, message: 'Email successfully updated.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let axiosErrorDescription: string =
      'Unable to update email. Please check your input and try again.';
    if (!axiosError.response) {
      return { success: false, message: axiosErrorDescription };
    }
    switch (axiosError.response.status) {
      case 401:
        axiosErrorDescription = 'You must login to reset your email';
        break;
      case 403:
        axiosErrorDescription = 'You are not authorised to perform this action';
        break;
      case 409:
        axiosErrorDescription = 'This email is already in use';
        break;
      case 422:
        axiosErrorDescription = 'Please ensure your new email format is valid';
        break;
    }

    return { success: false, message: axiosErrorDescription };
  }
};
