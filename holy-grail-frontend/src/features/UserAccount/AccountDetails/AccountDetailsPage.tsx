import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertProps } from '@components';
import { AuthContext, MediaQueryContext } from '@providers';
import { DesktopAccountPage } from './DesktopAccountPage';
import { MobileAccountPage } from './MobileAccountPage';

export const AccountDetailsPage = () => {
  const { isDesktop } = useContext(MediaQueryContext);
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'Please login.',
          description: 'You need to be logged in to edit your account details.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  return isDesktop ? <DesktopAccountPage /> : <MobileAccountPage />;
};
