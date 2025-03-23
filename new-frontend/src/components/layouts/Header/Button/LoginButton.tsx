'use client';

import { Button } from '@components/Button';

import { User } from '@providers/AuthProvider';

import { useNavigate } from '@utils/navigation';

interface LogInButtonProps {
  user: User | null;
}

export const LogInButton = ({ user }: LogInButtonProps) => {
  const router = useNavigate();

  const handleRedirectAccountLoginPage = () => {
    if (!user) {
      router.navigateTo('/account-login');
    } else {
      window.location.reload();
    }
  };

  return (
    <Button className='w-24 h-10' onClick={handleRedirectAccountLoginPage}>
      Log in
    </Button>
  );
};
