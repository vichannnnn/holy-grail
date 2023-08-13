import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
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
      const response: AxiosResponse = await registerAccount(accountDetails);
      console.log(response.status);
      const user: CurrentUserWithJWT = response.data;
      setUser(user.data);
      localStorage.setItem('user', JSON.stringify(user.data));
      localStorage.setItem('access_token', user.access_token);
      return response.status;
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
    }),
    [user, isLoading, login, logout, updateUser, registerUserAccount],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};
