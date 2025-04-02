import { useEffect, useState } from 'react';
import { resendVerificationEmail } from '@api/auth';
import { AlertToast, AlertProps, DropdownMenuItem, DropdownMenuItemProps } from '@components';
import { useNavigation } from '@utils';

import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HelpIcon from '@mui/icons-material/Help';
import PublishIcon from '@mui/icons-material/Publish';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailOutline from '@mui/icons-material/MailOutline';
import Settings from '@mui/icons-material/Settings';
import DeveloperMode from '@mui/icons-material/DeveloperMode';
import ExitToApp from '@mui/icons-material/ExitToApp';
import VpnKey from '@mui/icons-material/VpnKey';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';

import { DropdownRenderProps } from './Button/types';
import './Dropdown.css';

export const Dropdown = ({ user, isDesktop, logout }: DropdownRenderProps) => {
  const {
    goToHome,
    goToLibrary,
    goToFAQ,
    goToAccountPage,
    goToUploadPage,
    goToAdminPanel,
    goToDeveloperPanel,
    goToLoginPage,
    goToScoreboard,
  } = useNavigation();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [menuItems, setMenuItems] = useState<DropdownMenuItemProps[]>([]);

  useEffect(() => {
    const children: DropdownMenuItemProps[] = [];

    if (!isDesktop) {
      children.push(
        {
          children: 'Home',
          icon: <HomeIcon />,
          onClick: () => {
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
          children: 'Library',
          icon: <LibraryBooksIcon />,
          onClick: () => {
            const libraryElement = document.querySelector('#library');
            if (libraryElement) {
              libraryElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToLibrary();
            }
          },
        },
        {
          children: 'FAQ',
          icon: <HelpIcon />,
          onClick: () => {
            const faqElement = document.querySelector('#faq');
            if (faqElement) {
              faqElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToFAQ();
            }
          },
        },
        {
          children: 'Contribute',
          icon: <PublishIcon />,
          onClick: () => {
            const contributeElement = document.querySelector('#contribute');
            if (contributeElement) {
              contributeElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToUploadPage();
            }
          },
        },
        {
          children: 'Leaderboard',
          icon: <ScoreboardIcon />,
          onClick: () => {
            const scoreboardElement = document.querySelector('#scoreboard');
            if (scoreboardElement) {
              scoreboardElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              goToScoreboard();
            }
          },
        },
      );
    }

    if (user) {
      children.push({
        children: 'My Account',
        icon: <AccountCircle />,
        onClick: () => goToAccountPage(),
      });
      if (!user.verified) {
        children.push({
          children: 'Resend Verification Email',
          icon: <MailOutline />,
          onClick: handleResendVerificationEmail,
        });
      }
      if (user.role > 1) {
        children.push({
          children: 'Admin Panel',
          icon: <Settings />,
          onClick: () => goToAdminPanel(),
        });
      }
      if (user.role > 2) {
        children.push({
          children: 'Developer Panel',
          icon: <DeveloperMode />,
          onClick: () => goToDeveloperPanel(),
        });
      }
      children.push({ children: 'Log Out', icon: <ExitToApp />, onClick: handleLogout });
    } else {
      children.push({ children: 'Log In', icon: <VpnKey />, onClick: () => goToLoginPage() });
    }

    setMenuItems(children);
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
    <div>
      <div className='dropdown-view'>
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} icon={item.icon} onClick={item.onClick}>
            {item.children}
          </DropdownMenuItem>
        ))}
      </div>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </div>
  );
};
