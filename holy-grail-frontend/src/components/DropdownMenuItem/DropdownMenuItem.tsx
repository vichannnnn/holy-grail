import { ReactNode } from 'react';
import { MenuItem, MenuItemProps, Stack } from '@mui/material';
import './DropdownMenuItem.css';

export interface DropdownMenuItemProps extends MenuItemProps {
  label: string;
  icon?: ReactNode;
}

export const DropdownMenuItem = ({ label, icon, ...props }: DropdownMenuItemProps) => {
  return (
    <>
      <MenuItem
        key={label}
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
            {label}
          </Stack>
        </div>
      </MenuItem>
    </>
  );
};
