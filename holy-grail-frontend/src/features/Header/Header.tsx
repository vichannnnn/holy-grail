import './header.css';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { resendVerificationEmail } from '@api/auth';
import { AlertToast, AlertProps, HeaderRightButton } from '@components';
import { AuthContext, MediaQueryContext } from '@providers';
import { UserButton } from './UserButton';
import Logo from '../../assets/placeholder.svg';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
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
        { label: 'Home', callback: () => navigate('/') },
        { label: 'Library', callback: () => navigate('/#library') },
        { label: 'FAQ', callback: () => navigate('/#faq') },
      );
    }

    if (user) {
      children.push({ label: 'Change Password', callback: () => navigate('/update-password') });
      if (!user.verified) {
        children.push({
          label: 'Resend Verification Email',
          callback: handleResendVerificationEmail,
        });
      }
      if (user.role > 1) {
        children.push({ label: 'Admin Panel', callback: () => navigate('/admin') });
      }
      if (user.role > 2) {
        children.push({ label: 'Developer Panel', callback: () => navigate('/developer') });
      }
      children.push({ label: 'Log Out', callback: handleLogout });
    } else {
      children.push({ label: 'Log In', callback: () => navigate('/login') });
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
          {/*<span className="nav__divider"></span>*/}
          {/*<span className="nav__logoText">HG</span>*/}
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
                <RouterLink to='/#faq' onClick={() => setActiveNav('#FAQ')}>
                  <a className={activeNav === '#FAQ' ? 'nav__link active-link' : 'nav__link'}>
                    FAQ
                  </a>
                </RouterLink>
              </li>
            </ul>
          </div>
        ) : null}
        {isDesktop ? (
          <HeaderRightButton onClick={() => {}}>Contribute Notes</HeaderRightButton>
        ) : null}
        <UserButton children={UserButtonChildren} />
      </nav>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </header>
  );
};
