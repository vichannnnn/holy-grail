import apiClient from '../../../api/apiClient';
import { AxiosError } from 'axios';

export type ErrorResponseData = {
  detail: string;
};

export type AccountDetails = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
};

async function registerAccount(accountDetails: AccountDetails) {
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

    if (axiosError.response && axiosError.response.status === 409) {
      if (axiosError.response.data.detail === 'Username already exists') {
        errorDescription = 'An account with this username already exists.';
      }
    } else if (axiosError.response && axiosError.response.status === 400) {
      errorDescription = 'Your password does not match. Please check your password and try again.';
    } else if (axiosError.response && axiosError.response.status === 422) {
      errorDescription =
        'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.';
    }

    return { success: false, message: errorDescription };
  }
}

export default registerAccount;