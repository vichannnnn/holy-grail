import { IconButton, Menu, MenuItem, Button, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MediaQueryContext from '../../providers/MediaQueryProvider';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface HeaderRightButtonProps {
  children: { label: string; callback: () => void }[];
}

const DesktopButtonFace = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Button
      onClick={onClick}
      disableRipple={true}
      variant='outlined'
      sx={{ borderColor: 'black', height: '30px', width: '107.25px' }}
    >
      <Typography sx={{ textTransform: 'none', color: 'black' }}>{label}</Typography>
    </Button>
  );
};
const MobileButtonFace = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label='Menu'
      sx={{ borderRadius: '10%' }}
      disableRipple={true}
    >
      <DensityMediumIcon />
    </IconButton>
  );
};

export const HeaderRightButton = ({ children }: HeaderRightButtonProps) => {
  const muiTheme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI SemiBold"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isDesktop } = useContext(MediaQueryContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAnchorEl(null);
  }, [isDesktop, user]);

  return (
    <ThemeProvider theme={muiTheme}>
      {isDesktop ? (
        user ? (
          <DesktopButtonFace
            label={user.username}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          />
        ) : (
          <DesktopButtonFace label={'Log In'} onClick={(event) => navigate('/login')} />
        )
      ) : (
        <MobileButtonFace onClick={(event) => setAnchorEl(event.currentTarget)} />
      )}
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children.map((child) => (
          <MenuItem
            disableRipple={true}
            key={child.label}
            sx={{
              margin: '3px',
              backgroundColor: 'transparent',
              borderRadius: '8px',
              boxSizing: 'border-box',
              border: '1px solid transparent',
              '&:hover': {
                color: 'rgb(100,108,255)',
                borderBlockColor: 'rgb(100,108,255)',
                backgroundColor: 'white',
              },
            }}
            onClick={child.callback}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </ThemeProvider>
  );
};

HeaderRightButton.displayName = 'HeaderRightButton';
