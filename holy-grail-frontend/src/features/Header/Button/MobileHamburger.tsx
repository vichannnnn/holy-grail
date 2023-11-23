import { useState, MouseEvent } from 'react';
import { IconButton, Menu } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Dropdown } from '../Dropdown';
import { DropdownRenderProps } from './types';

export const MobileHamburger = ({ user, isDesktop, logout }: DropdownRenderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id='mobile-hamburger-button'
        className='mobile-hamburger-button'
        aria-controls={open ? 'mobile-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <DensityMediumIcon />
      </IconButton>
      <Menu
        id='mobile-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'mobile-hamburger-button',
        }}
      >
        <Dropdown
          user={user}
          isDesktop={isDesktop}
          logout={logout}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        />
      </Menu>
    </>
  );
};
