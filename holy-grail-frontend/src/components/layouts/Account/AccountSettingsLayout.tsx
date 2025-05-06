'use client';

import Loading from '@loading';
import { useContext, useEffect } from 'react';

import { AccountDetails } from '@components/Account/AccountDetails';
import { Divider } from '@components/Divider';

import { AuthContext } from '@providers/AuthProvider';
import { MediaQueryContext } from '@providers/MediaQueryProvider';

import { useNavigate } from '@utils/navigation';

const AccountSettingsHeader = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-2'>Account Settings</h1>
      <Showcase />
      <p className='mb-6'>View and manage your account details here.</p>
      <div className='mt-8'>
        <Divider />
      </div>
    </div>
  );
};

export const AccountSettingsLayout = () => {
  const { isSmall, isMedium, isLarge, isXLarge, is2XLarge } = useContext(MediaQueryContext);

  const { user, isLoading } = useContext(AuthContext);
  const router = useNavigate();

  let width: string;

  if (is2XLarge) {
    width = 'w-4/6';
  } else if (isXLarge) {
    width = 'w-4/6';
  } else if (isLarge) {
    width = 'w-4/6';
  } else if (isMedium) {
    width = 'w-4/6';
  } else if (isSmall) {
    width = 'w-5/6';
  } else {
    width = 'w-5/6';
  }

  useEffect(() => {
    if (user === null && !isLoading) {
      router.navigateTo('/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`flex flex-col ${width}`}>
      <AccountSettingsHeader />
      {user && <AccountDetails user={user} />}
    </div>
  );
};
