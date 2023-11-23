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

import { DropdownRenderProps } from './Button/types';
import './Dropdown.css';

interface DropdownProps extends DropdownRenderProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const Dropdown = ({ user, isDesktop, logout }: DropdownProps) => {
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

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [menuItems, setMenuItems] = useState<DropdownMenuItemProps[]>([]);

  useEffect(() => {
    const children: DropdownMenuItemProps[] = [];

    if (!isDesktop) {
      children.push(
        {
          label: 'Home',
          icon: <HomeIcon />,
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
          icon: <LibraryBooksIcon />,
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
          icon: <HelpIcon />,
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
          icon: <PublishIcon />,
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
      children.push({
        label: 'My Account',
        icon: <AccountCircle />,
        callback: () => goToAccountPage(),
      });
      if (!user.verified) {
        children.push({
          label: 'Resend Verification Email',
          icon: <MailOutline />,
          callback: handleResendVerificationEmail,
        });
      }
      if (user.role > 1) {
        children.push({
          label: 'Admin Panel',
          icon: <Settings />,
          callback: () => goToAdminPanel(),
        });
      }
      if (user.role > 2) {
        children.push({
          label: 'Developer Panel',
          icon: <DeveloperMode />,
          callback: () => goToDeveloperPanel(),
        });
      }
      children.push({ label: 'Log Out', icon: <ExitToApp />, callback: handleLogout });
    } else {
      children.push({ label: 'Log In', icon: <VpnKey />, callback: () => goToLoginPage() });
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
          <DropdownMenuItem
            key={index}
            label={item.label}
            icon={item.icon}
            callback={item.callback}
          />
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
