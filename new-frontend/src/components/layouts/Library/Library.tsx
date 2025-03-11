'use client';

import Link from 'next/link';
import { useContext } from 'react';

import { Divider } from '@components/Divider';

import { AuthContext } from '@providers/AuthProvider';

export const Library = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='w-4/5'>
      <h2 className='font-bold'>
        Hello,{' '}
        {user ? `${user.username}, welcome back to the Holy Grail` : 'welcome to the Holy Grail'}
      </h2>
      <h4>A central repository for your revision materials, consolidated into a library.</h4>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <h2 className='font-bold'>Library</h2>
      <p>
        View materials or contribute{' '}
        <Link href='/upload' passHref>
          here
        </Link>{' '}
        after you have logged in (subjected to approval of administrators).
      </p>
    </div>
  );
};
