'use client';

import { Button as ButtonBase, ButtonProps, SxProps, Theme, useTheme } from '@mui/material';
import { MouseEvent, forwardRef } from 'react';

interface ButtonBaseProps extends ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps<Theme>;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ onClick, sx, href, children, className, ...props }, ref) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // TODO: We can make a parent component for both Button and IconButton since they're using the same logic.
    return (
      <ButtonBase
        className={className}
        onClick={onClick}
        ref={ref}
        href={href}
        variant='outlined'
        sx={{
          border: 'none',
          color: isDark ? '#e5e5e5' : '#484b6a',
          textTransform: 'capitalize',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '4px',
          padding: '8px 10px 8px 10px',
          '&:hover': {
            backgroundColor: isDark ? '#2d2d2d' : '#e4e5f1',
            border: 'none',
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </ButtonBase>
    );
  },
);

Button.displayName = 'Button';
