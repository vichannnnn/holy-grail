import { forwardRef, MouseEvent } from 'react';
import { Button as ButtonBase, ButtonProps, SxProps, Theme } from '@mui/material';

interface ButtonBaseProps extends ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps<Theme>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ onClick, sx, children, ...props }, ref) => {
    return (
      <ButtonBase
        onClick={onClick}
        className=''
        ref={ref}
        variant='outlined'
        sx={{
          backgroundColor: '#ffe1f0',
          borderColor: '#ffe1f0',
          color: 'black',
          textTransform: 'capitalize',
          fontFamily: `'Poppins', 'sans-serif'`,
          padding: '4px 16px',
          fontSize: '16px',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: '#ffe1f0',
            borderColor: '#fcaac0',
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
        <div>{children}</div>
      </ButtonBase>
    );
  },
);
