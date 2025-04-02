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
        ref={ref}
        variant='contained'
        sx={{
          backgroundColor: '#ffe1f0',
          borderColor: '#ffe1f0',
          color: 'black',
          textTransform: 'none',
          fontFamily: `'Poppins', 'sans-serif'`,
          fontSize: '16px',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: '#e6cdd8',
            borderColor: '#fcaac0',
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          },
          ...sx,
        }}
        disableRipple={true}
        {...props}
      >
        <div>{children}</div>
      </ButtonBase>
    );
  },
);
