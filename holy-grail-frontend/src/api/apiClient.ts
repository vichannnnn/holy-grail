import axios from 'axios';

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const apiClient = axios.create({
  baseURL: VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
