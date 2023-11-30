import { ReactNode } from 'react';
import { MenuItem, MenuItemProps, Stack } from '@mui/material';
import './DropdownMenuItem.css';

export interface DropdownMenuItemProps extends MenuItemProps {
  icon?: ReactNode;
}

export const DropdownMenuItem = ({ icon, ...props }: DropdownMenuItemProps) => {
  return (
    <>
      <MenuItem
        sx={{
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#e9e9e9',
          },
        }}
        {...props}
      >
        <div className='dropdown-menu-item'>
          <Stack direction='row' alignItems='center' gap={1}>
            {icon && <div className='icon'>{icon}</div>}
            {props.children}
          </Stack>
        </div>
      </MenuItem>
    </>
  );
};
