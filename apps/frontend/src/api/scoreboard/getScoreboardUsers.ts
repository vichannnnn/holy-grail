import { apiClient } from '@apiClient';

interface User {
  user_id: number;
  username: string;
}

export interface ScoreboardUser {
  user: User;
  upload_count: number;
}

export interface AuthenticatedScoreboardUser extends ScoreboardUser {
  rank: number;
}

export const getScoreboardUsers = async (): Promise<ScoreboardUser[]> => {
  const response = await apiClient.get('/scoreboard');
  return response.data;
};
