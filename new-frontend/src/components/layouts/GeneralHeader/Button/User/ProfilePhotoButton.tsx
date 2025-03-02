'use client';

import { UserMenu } from '@layouts/GeneralHeader';
import { MouseEvent, useState } from 'react';

import { IconButton } from '@components/Button';

import { User } from '@providers/AuthProvider';

interface ProfilePhotoProps {
  profilePhotoPreview?: string | undefined;
  user: User | null;
}

export const ProfilePhotoButton = ({
  profilePhotoPreview = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png',
  user,
}: ProfilePhotoProps) => {
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
        id='user-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={profilePhotoPreview} alt='Profile Preview' className=' rounded-full' />
      </IconButton>
      <UserMenu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        user={user}
      />
    </>
  );
};
