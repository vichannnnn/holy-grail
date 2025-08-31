import { AxiosError, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { apiClient } from '@apiClient';

import { AccountDetails, getUser, registerAccount } from '@api/auth';

import { CurrentUserWithJWT, LogInDetails, User } from '@providers/AuthProvider';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginDetails: LogInDetails) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  registerUserAccount: (accountDetails: AccountDetails) => Promise<number>;
  fetchUser: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
  registerUserAccount: async () => 0,
  fetchUser: async () => {},
});

interface DecodedToken {
  exp: number;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = jwt_decode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        const remainingTime = decodedToken.exp - currentTime;
        if (remainingTime < 0) {
          logout();
        }
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (formData: LogInDetails) => {
    const response = await apiClient.post('/auth/login', formData);
    const { data, access_token } = response.data;
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('access_token', access_token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  const registerUserAccount = useCallback(
    async (accountDetails: AccountDetails): Promise<number> => {
      try {
        const response: AxiosResponse = await registerAccount(accountDetails);
        const user: CurrentUserWithJWT = response.data;
        setUser(user.data);
        localStorage.setItem('user', JSON.stringify(user.data));
        localStorage.setItem('access_token', user.access_token);
        return response.status;
      } catch (error) {
        throw error as AxiosError;
      }
    },
    [],
  );

  const providerValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      updateUser,
      registerUserAccount,
      fetchUser,
    }),
    [user, isLoading, login, logout, updateUser, registerUserAccount, fetchUser],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};
