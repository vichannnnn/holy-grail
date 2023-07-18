import { Button, createTheme, ThemeProvider } from '@mui/material';
import { ButtonHTMLAttributes, forwardRef, MouseEvent } from 'react';

interface HeaderRightButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
export const HeaderRightButton = forwardRef<HTMLButtonElement, HeaderRightButtonProps>(
  ({ label, onClick }, ref) => {
    const muiTheme = createTheme();
    return (
      <ThemeProvider theme={muiTheme}>
        <Button
          ref={ref}
          variant='outlined'
          onClick={onClick}
          sx={{
            borderColor: 'black',
            backgroundColor: 'white',
            paddingX: '30px',
            height: '40px',
            textTransform: 'capitalize',
          }}
        >
          <div className='button-text'>{label}</div>
        </Button>
      </ThemeProvider>
    );
  },
);
