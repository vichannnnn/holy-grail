import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ButtonHTMLAttributes, forwardRef } from 'react';

<<<<<<< HEAD
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
=======
export const HomeButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <>
      <Button
        ref={ref}
        variant="outline"
        borderColor="black"
        bg="white"
        px="30"
        h="40px"
        {...props}
      >
        <div className="button-text">{children}</div>
      </Button>
    </>
  );
});
>>>>>>> bbe493b (new FE (desktop))

HomeButton.displayName = 'HomeButton';
