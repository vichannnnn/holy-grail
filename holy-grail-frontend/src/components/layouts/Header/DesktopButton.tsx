'use client';

import { DarkModeToggleButton } from '@layouts/Header/Button/DarkModeToggleButton';
import { RegisterButton } from '@layouts/Header/Button/RegisterButton';
import { UserButton } from '@layouts/Header/Button/User/UserButton';
import { useContext } from 'react';

import { LogInButton } from './Button/LoginButton';

import { AuthContext } from '@providers/AuthProvider';

export const DesktopButton = () => {
  const { user } = useContext(AuthContext);

  // TODO: Need a better approach where one component handles the population of the dropdown based
  // TODO: on if user is logged in or not, and if they are on mobile mode or not.

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
          <UserButton user={user} />
        </div>
      )}
    </>
  );
};
