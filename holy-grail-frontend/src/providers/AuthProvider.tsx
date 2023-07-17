import React, { createContext, useEffect, useState } from 'react';
import { apiClient } from '@apiClient';
import { isTokenExpired } from '@api/auth';

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: number;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
