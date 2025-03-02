'use client';

import { DarkModeToggleButton } from '@layouts/GeneralHeader/Button/DarkModeToggleButton';
import { RegisterButton } from '@layouts/GeneralHeader/Button/RegisterButton';
import { ProfilePhotoButton } from '@layouts/GeneralHeader/Button/User/ProfilePhotoButton';
import { useContext } from 'react';

import { LogInButton } from './Button/LoginButton';

import { AuthContext } from '@providers/AuthProvider';

export const DesktopButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user && (
        <div className='flex flex-row gap-4 items-center'>
          <DarkModeToggleButton />
          <LogInButton user={user} />
          <RegisterButton user={user} />
        </div>
      )}
      {user && (
        <div className='flex flex-row gap-4 items-center'>
          <DarkModeToggleButton />
          <ProfilePhotoButton user={user} />
        </div>
      )}
    </>
  );
};
