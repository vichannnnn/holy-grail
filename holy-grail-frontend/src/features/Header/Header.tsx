<<<<<<< HEAD
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
  useToast,
} from '@chakra-ui/react';
import { resendVerificationEmail } from '../../api/utils/auth/ResendVerificationEmail';
import { HamburgerIcon } from '@chakra-ui/icons';
import { HeaderRightButton } from './HeaderRightButton';
=======
import "./header.css"
import {useContext, useState} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/placeholder.svg";
import AuthContext from "../../providers/AuthProvider";
import {IconButton, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue, useToast} from "@chakra-ui/react";
import {resendVerificationEmail} from "../../utils/auth/ResendVerificationEmail";
import {HamburgerIcon} from "@chakra-ui/icons";
import {NavBarRightButton} from "../NavBar/NavBarRightButton";
>>>>>>> bbe493b (new FE (desktop))

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
<<<<<<< HEAD
  const [activeNav, setActiveNav] = useState('#home');

  const navigateTo = (path: string) => {
    return () => navigate(path);
  };

  const handleAdminButtonClick = navigateTo('/admin');
  const handleDevButtonClick = navigateTo('/developer');
  const handlePasswordChange = navigateTo('/update-password');
=======
  const [activeNav, setActiveNav] = useState("#home");

  const handleAdminButtonClick = () => {
    navigate("/admin");
  };

  const handleDevButtonClick = () => {
    navigate("/developer");
  };

  const handlePasswordChange = () => {
    navigate("/update-password");
  };
>>>>>>> bbe493b (new FE (desktop))

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      toast({
<<<<<<< HEAD
        title: 'Logout failed.',
        description: 'An error occurred while logging out.',
        status: 'error',
=======
        title: "Logout failed.",
        description: "An error occurred while logging out.",
        status: "error",
>>>>>>> bbe493b (new FE (desktop))
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail();
      toast({
<<<<<<< HEAD
        title: 'Verification email resent successfully.',
        description: 'Please check your email for the verification mail sent to you.',
        status: 'success',
=======
        title: "Verification email resent successfully.",
        description:
            "Please check your email for the verification mail sent to you.",
        status: "success",
>>>>>>> bbe493b (new FE (desktop))
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
<<<<<<< HEAD
      toast({
        title: 'Failed to resend verification email.',
        description: 'An error occurred while sending.',
        status: 'error',
=======
      console.error(error);
      toast({
        title: "Failed to resend verification email.",
        description: "An error occurred while sending.",
        status: "error",
>>>>>>> bbe493b (new FE (desktop))
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
<<<<<<< HEAD
    <header className='header'>
      <nav className='nav container grid'>
        <RouterLink className='nav__logo' to='/'>
          <img className='nav__logoImg' src={Logo} alt='' />
=======
    <header className="header">
      <nav className="nav container grid">
        <RouterLink className="nav__logo" to="/">
          <img className="nav__logoImg" src={Logo} alt=""/>
>>>>>>> bbe493b (new FE (desktop))
          {/*<span className="nav__divider"></span>*/}
          {/*<span className="nav__logoText">HG</span>*/}
        </RouterLink>
        {isDesktop ? (
<<<<<<< HEAD
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
=======
            <div className="nav__menu">
              <ul className="nav__list grid">
                <li className="nav__item">
                  <RouterLink to="/" onClick={() => setActiveNav("#home")}>
                    <a className={activeNav === "#home" ? "nav__link active-link" : "nav__link"}>Home</a>
                  </RouterLink>
                </li>
                <li className="nav__item">
                  <RouterLink to="/#library" onClick={() => setActiveNav("#library")}>
                    <a className={activeNav === "#library" ? "nav__link active-link" : "nav__link"}>Library</a>
                  </RouterLink>
                </li>
                <li className="nav__item">
                  <RouterLink to="/#faq" onClick={() => setActiveNav("#FAQ")}>
                    <a className={activeNav === "#FAQ" ? "nav__link active-link" : "nav__link"}>FAQ</a>
                  </RouterLink>
                </li>
              </ul>
            </div>
        ) : (
          <Menu>
            <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="outline"
          />
            <MenuList>
              <RouterLink to="/">
                <MenuItem>Home</MenuItem>
              </RouterLink>
              <RouterLink to="/#library">
                <MenuItem>Library</MenuItem>
              </RouterLink>
              <RouterLink to="/#faq">
>>>>>>> bbe493b (new FE (desktop))
                <MenuItem>FAQ</MenuItem>
              </RouterLink>
              {user ? (
                <>
                  {user.role > 1 && (
<<<<<<< HEAD
                    <MenuItem onClick={handleAdminButtonClick}>Admin Panel</MenuItem>
                  )}
                  {user.role > 2 && (
                    <MenuItem onClick={handleDevButtonClick}>Developer Panel</MenuItem>
                  )}
                  {<MenuItem onClick={handlePasswordChange}>Change Password</MenuItem>}
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
=======
                    <MenuItem onClick={handleAdminButtonClick}>
                      Admin Panel
                    </MenuItem>
                    )}
                  {user.role > 2 && (
                    <MenuItem onClick={handleDevButtonClick}>
                      Developer Panel
                    </MenuItem>
                    )}
                  {
                    <MenuItem onClick={handlePasswordChange}>
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
                    <RouterLink to="/login">
                      <MenuItem className="nav__login">Log In</MenuItem>
                    </RouterLink>
                )}
>>>>>>> bbe493b (new FE (desktop))
            </MenuList>
          </Menu>
        )}
        {isDesktop && (
<<<<<<< HEAD
          <>
            {user ? (
              <Menu>
                <MenuButton as={HeaderRightButton}>{user.username}</MenuButton>
                <MenuList>
                  {user.role > 1 && (
                    <MenuItem onClick={handleAdminButtonClick}>Admin Panel</MenuItem>
                  )}
                  {user.role > 2 && (
                    <MenuItem onClick={handleDevButtonClick}>Developer Panel</MenuItem>
                  )}
                  {<MenuItem onClick={handlePasswordChange}>Change Password</MenuItem>}
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
    </header>
  );
};

export default Header;
=======
            <>
              {user ? (
                  <Menu>
                    <MenuButton as={NavBarRightButton}>{user.username}</MenuButton>
                    <MenuList>
                      {user.role > 1 && (
                          <MenuItem onClick={handleAdminButtonClick}>
                            Admin Panel
                          </MenuItem>
                      )}
                      {user.role > 2 && (
                          <MenuItem onClick={handleDevButtonClick}>
                            Developer Panel
                          </MenuItem>
                      )}
                      {
                        <MenuItem onClick={handlePasswordChange}>
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
                  <RouterLink to="/login">
                    <NavBarRightButton children="Log In" />
                  </RouterLink>
              )}
            </>
          )}
      </nav>
    </header>
  )
}

export default Header
>>>>>>> bbe493b (new FE (desktop))
