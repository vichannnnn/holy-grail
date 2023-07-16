import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';

type ErrorResponseData = {
  detail: string;
};

export const sendResetPasswordEmail = async (email: string) => {
  try {
    await apiClient.post('/auth/send_reset_password_mail', {
      email: email,
    });

    return { success: true, message: 'Password reset email successfully sent.' };
  } catch (error) {
    let errorDescription = 'Unable to reset password. Please check your input and try again.';

    const axiosError = error as AxiosError<ErrorResponseData>;

    if (axiosError.response && axiosError.response.status === 429) {
      errorDescription = "You're doing this too fast. Please try again later.";
    }

    return { success: false, message: errorDescription };
  }
};
