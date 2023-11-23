import { ReactNode } from 'react';
import { MenuItem, Stack } from '@mui/material';

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
          margin: '3px',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          boxSizing: 'border-box',
          outline: '1px solid transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#e9e9e9',
            outlineColor: 'transparent',
          },
        }}
        onClick={callback}
      >
        <Stack direction='row' alignItems='center' gap={1}>
          {icon && (
            <div style={{ marginRight: '8px', position: 'relative', top: '3px' }}>{icon}</div>
          )}
          {label}
        </Stack>
      </MenuItem>
    </>
  );
};
