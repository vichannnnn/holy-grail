import { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { AuthContext, MediaQueryContext } from '@providers';

export const AccountDetails = ({ changeEmailClick }: { changeEmailClick?: () => void }) => {
  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <div className='update-outer-div'>
      <div className={isDesktop ? 'update-grid' : 'update-grid-mobile'}>
        <Typography sx={{ fontWeight: 'bold' }}>Username</Typography>
        <Typography>{user?.username}</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{user?.email}</Typography>
          {isDesktop ? (
            <Button
              variant='contained'
              color='primary'
              sx={{ textTransform: 'capitalize' }}
              onClick={changeEmailClick}
            >
              Change Email
            </Button>
          ) : null}
        </div>
        <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
        <Typography sx={{ color: user?.verified ? 'green' : 'red' }}>
          {user?.verified ? 'Verified' : 'Unverified'}
        </Typography>
      </div>
    </div>
  );
};
