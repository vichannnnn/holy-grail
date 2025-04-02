import { apiClient } from '@apiClient';
import { User } from '@providers';

export async function getUser(): Promise<User> {
  const response = await apiClient.get('/auth/get');
  return response.data;
}
