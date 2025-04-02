import { useState, MouseEvent } from 'react';
import { Button } from '@components';
import { Menu } from '@mui/material';
import { Dropdown } from '../Dropdown';
import { DropdownRenderProps } from './types';

export const DesktopUserButton = ({ user, isDesktop, logout }: DropdownRenderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='user-button-container'>
      <Button
        id='desktop-user-button'
        className='desktop-user-button'
        aria-controls={open ? 'desktop-user-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user ? user.username : 'Account'}
      </Button>
      <Menu
        id='desktop-user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'desktop-user-button',
        }}
        keepMounted={true}
      >
        <Dropdown user={user} isDesktop={isDesktop} logout={logout} />
      </Menu>
    </div>
  );
};
