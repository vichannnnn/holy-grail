import { ReactNode } from 'react';
import { MenuItem, Stack } from '@mui/material';
import './DropdownMenuItem.css';

export interface DropdownMenuItemProps {
  label: string;
  icon: ReactNode;
  callback: () => void;
}

export const DropdownMenuItem = ({ label, icon, callback }: DropdownMenuItemProps) => {
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
        onClick={callback}
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
