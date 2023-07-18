import { useContext, useEffect, useState, MouseEvent } from 'react';
import { HeaderRightButton } from '@components';
import { AuthContext, MediaQueryContext } from '@providers';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

interface UserButtonProps {
  children: { label: string; callback: () => void }[];
}

const MobileButtonFace = ({
  onClick,
}: {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <IconButton onClick={onClick} aria-label='Menu' sx={{ borderRadius: '10%' }}>
      <DensityMediumIcon />
    </IconButton>
  );
};

export const UserButton = ({ children }: UserButtonProps) => {
  const muiTheme = createTheme();
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
        <HeaderRightButton
          onClick={(event) => (user ? setAnchorEl(event.currentTarget) : navigate('/login'))}
          sx={{ width: 'fit-content' }}
        >
          {user ? user.username : 'Log In'}
        </HeaderRightButton>
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
            key={child.label}
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
            onClick={child.callback}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </ThemeProvider>
  );
};

UserButton.displayName = 'UserButton';
