import apiClient from '../../apiClient';
import { User, RoleEnum } from '../../../features/Developer/TabContentUsers';

export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('admin/users');
  return response.data;
};

export const updateUserRole = async (userId: number, role: RoleEnum): Promise<void> => {
  const response = await apiClient.put(`/admin/user/${userId}`, { role });
  return response.data;
};
