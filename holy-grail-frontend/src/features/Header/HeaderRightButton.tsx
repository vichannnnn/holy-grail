import { IconButton, Menu, MenuItem, Button, Typography } from '@mui/material';
import { useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface HeaderRightButtonProps {
  children: { label: string; callback: () => void }[];
}

export const HeaderRightButton = ({ children }: HeaderRightButtonProps) => {
  const muiTheme = createTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <ThemeProvider theme={muiTheme}>
      {children.length === 1 ? (
        <Button onClick={children[0].callback} disableRipple={true}>
          <Typography sx={{ textTransform: 'capitalize', color: 'black' }}>
            {children[0].label}
          </Typography>
        </Button>
      ) : (
        <>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setAnchorEl(event.currentTarget)
            }
            aria-label='Menu'
            sx={{ borderRadius: '10%' }}
            disableRipple={true}
          >
            <DensityMediumIcon />
          </IconButton>
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
              <MenuItem onClick={child.callback}>{child.label}</MenuItem>
            ))}
          </Menu>
        </>
      )}
    </ThemeProvider>
  );
};

HeaderRightButton.displayName = 'HeaderRightButton';
