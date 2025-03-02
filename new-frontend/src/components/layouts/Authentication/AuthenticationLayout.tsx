'use client';

import { Illustration } from '@layouts/Authentication/Illustration';
import { ReactNode, useContext, useEffect } from 'react';

import { AuthContext } from '@providers/AuthProvider';

import { useNavigate } from '@utils/navigation';

export const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      router.navigateTo('/dashboard');
    }
  }, [user, isLoading]);

  if (isLoading) return null;

  return (
    <div className='flex flex-col md:flex-row w-full h-screen'>
      <div className='w-full md:w-1/2'>
        <Illustration />
      </div>
      <div className='w-full md:w-1/2 flex justify-center items-center'>{children}</div>
    </div>
  );
};
