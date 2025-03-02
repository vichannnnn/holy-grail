import { apiClient } from '@apiClient';
import { User } from '@features';

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('admin/users');
  const users = response.data;

  return users.map((user: User) => ({
    user_id: user.user_id,
    username: user.username,
    role: user.role,
  }));
};
