import { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { AuthContext, MediaQueryContext } from '@providers';

export const AccountDetails = ({ changeEmailClick }: { changeEmailClick?: () => void }) => {
  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.2fr auto',
        gridColumnGap: '10%',
        gridRowGap: '2vh',
        alignItems: 'center',
        marginTop: '2vh',
        width: '100%',
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>Username</Typography>
      <Typography>{user?.username}</Typography>

      <hr style={{ borderTop: '1px solid grey', gridColumn: '1/ span 2' }} />

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

      <hr style={{ borderTop: '1px solid grey', gridColumn: '1/ span 2' }} />

      <Typography sx={{ fontWeight: 'bold' }}>Account Status</Typography>
      <Typography sx={{ color: user?.verified ? 'green' : 'red' }}>
        {user?.verified ? 'Verified' : 'Unverified'}
      </Typography>
    </div>
  );
};
