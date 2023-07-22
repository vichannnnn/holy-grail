import { apiClient } from '@apiClient';
import { AccountDetails } from './types';
import { AxiosResponse } from 'axios';

export async function registerAccount(accountDetails: AccountDetails): Promise<AxiosResponse> {
  const response: AxiosResponse = await apiClient.post<AxiosResponse>('/auth/create', {
    username: accountDetails.username,
    password: accountDetails.password,
    repeat_password: accountDetails.repeatPassword,
    email: accountDetails.email,
  });
  console.log('registerAccount response', response);
  return response;
}