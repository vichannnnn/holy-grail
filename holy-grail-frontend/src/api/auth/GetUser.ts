import { apiClient } from '@apiClient';
import { User } from '@features';
import { AccountDetails } from './types';

export async function getUser(accountDetails: AccountDetails): Promise<User> {
  const response = await apiClient.get('/auth/get');
  return response.data;
}
