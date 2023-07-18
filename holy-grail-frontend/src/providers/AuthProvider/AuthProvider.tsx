import { createContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from '@apiClient';
import { isTokenExpired, AccountDetails, registerAccount } from '@api/auth';
import { AxiosResponse } from 'axios';

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

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  register: (accountDetails: AccountDetails) => Promise<number>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
  register: async () => 0,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user && isTokenExpired()) {
        logout();
      }
    }, 60);

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  const login = async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
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

  const register = async (accountDetails: AccountDetails): Promise<number> => {
    const response: AxiosResponse = await registerAccount(accountDetails);
    if (response.status === 200) {
      const user: CurrentUserWithJWT = response.data;
      setUser(user.data);
      localStorage.setItem('user', JSON.stringify(user.data));
      localStorage.setItem('access_token', user.access_token);
    }
    return response.status;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
