import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';

type ErrorResponseData = {
  detail: string;
};

export const updatePassword = async (
  beforePassword: string,
  password: string,
  repeatPassword: string,
) => {
  try {
    await apiClient.post('/auth/update_password', {
      before_password: beforePassword,
      password: password,
      repeat_password: repeatPassword,
    });

    return { success: true };
  } catch (error) {
    let errorDescription = 'Unable to update password. Please check your input and try again.';

    const axiosError = error as AxiosError<ErrorResponseData>;

    if (axiosError.response && axiosError.response.status === 401) {
      errorDescription = "The password you've entered is invalid.";
    } else if (axiosError.response && axiosError.response.status === 400) {
      errorDescription = 'Your password does not match. Please check your password and try again.';
    } else if (axiosError.response && axiosError.response.status === 422) {
      errorDescription = 'Please ensure your new password format is valid';
    }

    return { success: false, errorDescription: errorDescription };
  }
};
