import { createContext, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '@apiClient';
import { AccountDetails, registerAccount } from '@api/auth';
import {
  AuthContextType,
  AuthProviderProps,
  User,
  CurrentUserWithJWT,
  LogInDetails,
} from '@providers';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
  registerUserAccount: async () => 0,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (formData: LogInDetails) => {
    const response = await apiClient.post('/auth/login', formData);
    const { data, access_token } = response.data;
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('access_token', access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const registerUserAccount = async (accountDetails: AccountDetails): Promise<number> => {
    try {
      const response: AxiosResponse = await registerAccount(accountDetails);
      const user: CurrentUserWithJWT = response.data;
      setUser(user.data);
      localStorage.setItem('user', JSON.stringify(user.data));
      localStorage.setItem('access_token', user.access_token);
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return axiosError.response.status;
      }
      return 0;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        updateUser,
        registerUserAccount,
      }}
    >
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};
