import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';

type ErrorResponseData = {
  detail: string;
};

type AccountDetails = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
};

export async function registerAccount(accountDetails: AccountDetails) {
  try {
    await apiClient.post('/auth/create', {
      username: accountDetails.username,
      password: accountDetails.password,
      repeat_password: accountDetails.repeatPassword,
      email: accountDetails.email,
    });

    return { success: true, message: 'Account successfully created.' };
  } catch (error) {
    let errorDescription = 'Unable to create account. Please check your input and try again.';

    const axiosError = error as AxiosError<ErrorResponseData>;

    if (axiosError.response) {
      if (axiosError.response.status === 409) {
        errorDescription = 'The username or email has already been taken.';
      } else if (axiosError.response.status === 400) {
        errorDescription =
          'Your password does not match. Please check your password and try again.';
      } else if (axiosError.response.status === 422) {
        errorDescription =
          'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.';
      } else if (axiosError.response.status === 429) {
        errorDescription = "You're trying too fast! Please try again in 10 minutes.";
      }
    }

    return { success: false, message: errorDescription };
  }
}

export default registerAccount;
