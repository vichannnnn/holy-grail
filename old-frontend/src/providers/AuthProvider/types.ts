import { AccountDetails } from '@api/auth';
import { ReactNode } from 'react';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginDetails: LogInDetails) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  registerUserAccount: (accountDetails: AccountDetails) => Promise<number>;
}

export interface LogInDetails {
  username: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: number;
  verified: boolean;
}

export interface CurrentUserWithJWT {
  data: User;
  access_token: string;
  token_type: string;
  exp: number;
}
