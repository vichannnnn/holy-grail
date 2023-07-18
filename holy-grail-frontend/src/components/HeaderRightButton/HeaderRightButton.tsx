import { Button, ButtonProps, createTheme, SxProps, Theme, ThemeProvider } from '@mui/material';
import { forwardRef, MouseEvent } from 'react';

interface HeaderRightButtonProps extends ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps<Theme>;
}
export const HeaderRightButton = forwardRef<HTMLButtonElement, HeaderRightButtonProps>(
  ({ onClick, children, sx, ...props }, ref) => {
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
            textTransform: 'none',
            ...sx,
          }}
          {...props}
        >
          <div className='button-text'>{children}</div>
        </Button>
      </ThemeProvider>
    );
  },
);
