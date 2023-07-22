import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { resendVerificationEmail } from '@api/auth';
import { AlertToast, AlertProps } from '@components';
import { UserButton } from '@features';
import { AuthContext, MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';

import './header.css';
import Logo from '../../assets/placeholder.svg';

export const Header = () => {
  const {
    goToHome,
    goToLibrary,
    goToFAQ,
    goToUpdatePassword,
    goToUploadPage,
    goToAdminPanel,
    goToDeveloperPanel,
    goToLoginPage,
  } = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const [activeNav, setActiveNav] = useState('#home');

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const [UserButtonChildren, setUserButtonChildren] = useState<
    { label: string; callback: () => void }[]
  >([]);

  useEffect(() => {
    const children = [];

    if (!isDesktop) {
      children.push(
        { label: 'Home', callback: () => goToHome() },
        { label: 'Library', callback: () => goToLibrary() },
        { label: 'FAQ', callback: () => goToFAQ() },
        { label: 'Contribute', callback: () => goToUploadPage() },
      );
    }

    if (user) {
      children.push({ label: 'Change Password', callback: () => goToUpdatePassword() });
      if (!user.verified) {
        children.push({
          label: 'Resend Verification Email',
          callback: handleResendVerificationEmail,
        });
      }
      if (user.role > 1) {
        children.push({ label: 'Admin Panel', callback: () => goToAdminPanel() });
      }
      if (user.role > 2) {
        children.push({ label: 'Developer Panel', callback: () => goToDeveloperPanel() });
      }
      children.push({ label: 'Log Out', callback: handleLogout });
    } else {
      children.push({ label: 'Log In', callback: () => goToLoginPage() });
    }

    setUserButtonChildren(children);
  }, [isDesktop, user]);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      setAlertContent({
        title: 'Logout failed.',
        description: 'An error occurred while logging out.',
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail();
      setAlertContent({
        title: 'Verification email resent successfully.',
        description: 'Please check your email for the verification mail sent to you.',
        severity: 'success',
      });
    } catch (error) {
      setAlertContent({
        title: 'Failed to resend verification email.',
        description: 'An error occurred while sending.',
        severity: 'error',
      });
    } finally {
      setOpenAlert(true);
    }
  };

  return (
    <header className='header'>
      <nav className='nav container grid'>
        <RouterLink className='nav__logo' to='/'>
          <img className='nav__logoImg' src={Logo} alt='' />
        </RouterLink>
        {isDesktop ? (
          <div className='nav__menu'>
            <ul className='nav__list grid'>
              <li className='nav__item'>
                <RouterLink to='/' onClick={() => setActiveNav('#home')}>
                  <a className={activeNav === '#home' ? 'nav__link active-link' : 'nav__link'}>
                    Home
                  </a>
                </RouterLink>
              </li>
              <li className='nav__item'>
                <RouterLink to='/#library' onClick={() => setActiveNav('#library')}>
                  <a className={activeNav === '#library' ? 'nav__link active-link' : 'nav__link'}>
                    Library
                  </a>
                </RouterLink>
              </li>
              <li className='nav__item'>
                <RouterLink to='/#faq' onClick={() => setActiveNav('#faq')}>
                  <a className={activeNav === '#faq' ? 'nav__link active-link' : 'nav__link'}>
                    FAQ
                  </a>
                </RouterLink>
              </li>
              <li className='nav__item'>
                <RouterLink
                  to='/upload'
                  onClick={() =>
                    user && user.verified ? setActiveNav('#upload') : setActiveNav('#home')
                  }
                >
                  <a className={activeNav === '#upload' ? 'nav__link active-link' : 'nav__link'}>
                    Contribute
                  </a>
                </RouterLink>
              </li>
            </ul>
          </div>
        ) : null}
        <div className='right-section' style={{ display: 'flex', gap: '30px' }}>
          <UserButton children={UserButtonChildren} />
        </div>
      </nav>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </header>
  );
};
