import { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link as RouterLink } from 'react-router-dom';
import { resendVerificationEmail } from '@api/auth';
import { AlertToast, AlertProps } from '@components';
import { UserButton } from '@features';
import { AuthContext, MediaQueryContext } from '@providers';
import { useNavigation } from '@utils';

import './header.css';
import Logo from '../../assets/grail-chan-happy.png';

export const Header = () => {
  const {
    goToHome,
    goToLibrary,
    goToFAQ,
    goToAccountPage,
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
        {
          label: 'Home',
          callback: () => {
            const homeElement = document.querySelector('#home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (homeElement) {
              homeElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToHome();
            }
          },
        },
        {
          label: 'Library',
          callback: () => {
            const libraryElement = document.querySelector('#library');
            if (libraryElement) {
              libraryElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToLibrary();
            }
          },
        },
        {
          label: 'FAQ',
          callback: () => {
            const faqElement = document.querySelector('#faq');
            if (faqElement) {
              faqElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToFAQ();
            }
          },
        },
        {
          label: 'Contribute',
          callback: () => {
            const contributeElement = document.querySelector('#contribute');
            if (contributeElement) {
              contributeElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToUploadPage();
            }
          },
        },
      );
    }

    if (user) {
      children.push({ label: 'My Account', callback: () => goToAccountPage() });
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
          <img className='nav__logo__image' src={Logo} alt='' />
        </RouterLink>
        {isDesktop ? (
          <div className='nav__menu'>
            <ul className='nav__list grid'>
              <li className='nav__item'>
                <HashLink
                  to='/'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => {
                    setActiveNav('#home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <a className={activeNav === '#home' ? 'nav__link active-link' : 'nav__link'}>
                    Home
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <HashLink
                  to='/library'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#library')}
                >
                  <a className={activeNav === '#library' ? 'nav__link active-link' : 'nav__link'}>
                    Library
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <HashLink
                  to='/#faq'
                  scroll={(el: HTMLElement) => el.scrollIntoView({ behavior: 'smooth' })}
                  onClick={() => setActiveNav('#faq')}
                >
                  <a className={activeNav === '#faq' ? 'nav__link active-link' : 'nav__link'}>
                    FAQ
                  </a>
                </HashLink>
              </li>
              <li className='nav__item'>
                <RouterLink
                  to='/upload'
                  onClick={() => setActiveNav(user?.verified ? '#upload' : '#home')}
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
