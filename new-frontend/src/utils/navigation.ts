'use client';

import { useRouter } from 'next/navigation';

export type AppRoutes =
  | '/'
  | '/login'
  | '/register'
  | '/forgot-password'
  | '/settings/account'
  | '/upload';

export const useNavigate = () => {
  const router = useRouter();

  const navigateTo = (route: AppRoutes) => {
    router.push(route);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return {
    navigateTo,
    refreshPage,
  };
};
