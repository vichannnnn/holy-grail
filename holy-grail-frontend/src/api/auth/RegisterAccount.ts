import { apiClient } from '@apiClient';
import { AccountDetails } from './types';
import { AxiosResponse } from 'axios';

export async function registerAccount(accountDetails: AccountDetails): Promise<AxiosResponse> {
  return await apiClient.post<AxiosResponse>('/auth/create', {
    username: accountDetails.username,
    password: accountDetails.password,
    repeat_password: accountDetails.repeat_password,
    email: accountDetails.email,
  });
}
