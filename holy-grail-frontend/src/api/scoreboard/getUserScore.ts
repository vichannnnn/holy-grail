import { apiClient } from '@apiClient';
import { AuthenticatedScoreboardUser } from './getScoreboardUsers';

export const getUserScore = async (): Promise<AuthenticatedScoreboardUser> => {
  const response = await apiClient.get('/scoreboard/user');
  return response.data;
};
