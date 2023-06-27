import './header.css';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/placeholder.svg';
import AuthContext from '../../providers/AuthProvider';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';
import { resendVerificationEmail } from '../../api/utils/auth/ResendVerificationEmail';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HeaderRightButton } from './HeaderRightButton';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [activeNav, setActiveNav] = useState('#home');

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

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
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Menu'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <RouterLink to='/'>
                <MenuItem>Home</MenuItem>
              </RouterLink>
              <RouterLink to='/#library'>
                <MenuItem>Library</MenuItem>
              </RouterLink>
              <RouterLink to='/#faq'>
                <MenuItem>FAQ</MenuItem>
              </RouterLink>
              {user ? (
                <>
                  {user.role > 1 && (
                    <MenuItem onClick={() => navigate('/admin')}>Admin Panel</MenuItem>
                  )}
                  {user.role > 2 && (
                    <MenuItem onClick={() => navigate('/developer')}>Developer Panel</MenuItem>
                  )}
                  {
                    <MenuItem onClick={() => navigate('/update-password')}>
                      Change Password
                    </MenuItem>
                  }
                  {!user.verified && (
                    <MenuItem onClick={handleResendVerificationEmail}>
                      Resent Verification Email
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}> Log Out</MenuItem>
                </>
              ) : (
                <RouterLink to='/login'>
                  <MenuItem className='nav__login'>Log In</MenuItem>
                </RouterLink>
              )}
            </MenuList>
          </Menu>
        )}
        {isDesktop && (
          <>
            {user ? (
              <Menu>
                <MenuButton as={HeaderRightButton}>{user.username}</MenuButton>
                <MenuList>
                  {user.role > 1 && (
                    <MenuItem onClick={() => navigate('/admin')}>Admin Panel</MenuItem>
                  )}
                  {user.role > 2 && (
                    <MenuItem onClick={() => navigate('/developer')}>Developer Panel</MenuItem>
                  )}
                  {
                    <MenuItem onClick={() => navigate('/update-password')}>
                      Change Password
                    </MenuItem>
                  }
                  {!user.verified && (
                    <MenuItem onClick={handleResendVerificationEmail}>
                      Resend Verification Email
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <RouterLink to='/login'>
                <HeaderRightButton children='Log In' />
              </RouterLink>
            )}
          </>
        )}
      </nav>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </header>
  );
};

export default Header;
