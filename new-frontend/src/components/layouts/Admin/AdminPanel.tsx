'use client';

import { ApprovalTable } from '@layouts/Admin/ApprovalTable';
import { useContext, useEffect } from 'react';

import { AuthContext } from '@providers/AuthProvider';

import { useNavigate } from '@utils/navigation';

export const AdminPanel = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.navigateTo('/login');
      }
    }
  }, [isLoading, user]);

  return (
    <div className='w-4/5 flex flex-col justify-center mx-auto mt-12'>
      <h2 className='font-bold'>Administrator Panel</h2>
      <h3>
        This is a list of unapproved notes for your review, you can approve or delete them
        accordingly.
      </h3>
      <ApprovalTable />
    </div>
  );
};
