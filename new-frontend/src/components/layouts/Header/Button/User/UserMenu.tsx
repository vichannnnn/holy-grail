'use client';

import { Login, Payment, PersonAdd } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { Menu as BaseMenu, ListItemIcon, MenuItem, MenuProps } from '@mui/material';
import { useContext } from 'react';

import { AuthContext, User } from '@providers/AuthProvider';
import { DarkModeContext } from '@providers/DarkModeProvider';

import { useNavigate } from '@utils/navigation';

interface UserButtonProps extends MenuProps {
  user: User | null;
}

const LoggedOutMenuItems = () => {
  const router = useNavigate();

  const loggedOutMenuItems = [
    {
      name: 'Log In',
      icon: <Login fontSize='small' />,
      onClick: () => router.navigateTo('/account-login'),
    },
    {
      name: 'Register',
      icon: <PersonAdd fontSize='small' />,
      onClick: () => router.navigateTo('/create-account'),
    },
  ];

  return (
    <>
      {loggedOutMenuItems.map(({ name, icon, onClick }) => (
        <MenuItem key={name} onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          {name}
        </MenuItem>
      ))}
    </>
  );
};

const LoggedInMenuItems = () => {
  const { logout } = useContext(AuthContext);
  const { toggleDarkMode } = useContext(DarkModeContext);
  const router = useNavigate();

  const loggedInMenuItems = [
    {
      name: 'Toggle Dark Mode',
      icon: <DarkModeIcon fontSize='small' />,
      onClick: () => toggleDarkMode(),
    },
    {
      name: 'Account Settings',
      icon: <Payment fontSize='small' />,
      onClick: () => router.navigateTo('/settings/account'),
    },
    {
      name: 'Log Out',
      icon: <LogoutIcon fontSize='small' />,
    },
  ];

  return (
    <>
      {loggedInMenuItems.map(({ name, icon, onClick }) => (
        <MenuItem key={name} onClick={name === 'Log Out' ? logout : onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          {name}
        </MenuItem>
      ))}
    </>
  );
};

export const UserMenu = ({ user, ...props }: UserButtonProps) => {
  return <BaseMenu {...props}>{user ? <LoggedInMenuItems /> : <LoggedOutMenuItems />}</BaseMenu>;
};
