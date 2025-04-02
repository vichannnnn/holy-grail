import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';
import { ForgotPasswordDetails, ResponseData } from './types';

export const sendResetPasswordEmail = async (
  data: ForgotPasswordDetails,
): Promise<ResponseData> => {
  try {
    await apiClient.post('/auth/send_reset_password_mail', data);

    return { success: true, message: 'Password reset email successfully sent.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorDescription = 'Unable to reset password. Please check your input and try again.';
    if (axiosError.response && axiosError.response.status === 429) {
      errorDescription = "You're doing this too fast. Please try again later.";
    }

    return { success: false, message: errorDescription };
  }
};
