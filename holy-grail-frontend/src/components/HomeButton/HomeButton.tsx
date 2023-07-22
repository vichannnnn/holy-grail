import { Button, createTheme } from '@mui/material';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const HomeButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children }, ref) => {
    return (
      <Button
        ref={ref}
        variant='outlined'
        sx={{
          borderColor: 'black',
          backgroundColor: 'white',
          paddingX: '30px',
          height: '40px',
          textTransform: 'capitalize',
        }}
      >
        <div className='button-text'>{children}</div>
      </Button>
    );
  },
);

HomeButton.displayName = 'HomeButton';
