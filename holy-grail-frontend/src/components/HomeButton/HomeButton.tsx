import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const HomeButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children }, ref) => {
    const muiTheme = createTheme();
    return (
      <ThemeProvider theme={muiTheme}>
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
      </ThemeProvider>
    );
  },
);

HomeButton.displayName = 'HomeButton';
