import { apiClient } from '@apiClient';
import { User } from '../../../features/Developer/TabContentUsers';

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('admin/users');
  return response.data;
};
