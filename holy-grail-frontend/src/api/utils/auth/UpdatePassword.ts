import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';
import { ResponseData } from './types';

export const updatePassword = async (
  beforePassword: string,
  password: string,
  repeatPassword: string,
): Promise<ResponseData> => {
  try {
    await apiClient.post('/auth/update_password', {
      before_password: beforePassword,
      password: password,
      repeat_password: repeatPassword,
    });

    return { success: true, message: 'Password successfully updated.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorDescription = 'Unable to update password. Please check your input and try again.';
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          errorDescription = "The password you've entered is invalid.";
          break;
        case 400:
          errorDescription =
            'Your password does not match. Please check your password and try again.';
          break;
        case 422:
          errorDescription = 'Please ensure your new password format is valid';
          break;
      }
    }

    return { success: false, message: errorDescription };
  }
};
