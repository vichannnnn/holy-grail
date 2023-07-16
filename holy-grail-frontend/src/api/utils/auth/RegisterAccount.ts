import { apiClient } from '@apiClient';
import { AxiosError } from 'axios';
import { ResponseData, AccountDetails } from './types';

export async function registerAccount(accountDetails: AccountDetails): Promise<ResponseData> {
  try {
    await apiClient.post('/auth/create', {
      username: accountDetails.username,
      password: accountDetails.password,
      repeat_password: accountDetails.repeatPassword,
      email: accountDetails.email,
    });

    return { success: true, message: 'Account successfully created.' };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorDescription = 'Unable to create account. Please check your input and try again.';
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 409:
          errorDescription = 'The username or email has already been taken.';
          break;
        case 400:
          errorDescription =
            'Your password does not match. Please check your password and try again.';
          break;
        case 422:
          errorDescription =
            'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.';
          break;
        case 429:
          errorDescription = "You're trying too fast! Please try again in 10 minutes.";
          break;
      }
    }

    return { success: false, message: errorDescription };
  }
}
