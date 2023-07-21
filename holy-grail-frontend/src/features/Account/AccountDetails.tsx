import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertProps } from '@components';
import { Typography, TextField, Grid } from '@mui/material';
import { AuthContext } from '@providers';

export const AccountDetails = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'Please login.',
          description: 'You need to be logged in to edit your account details.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  const gridStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '2vw',
    alignItems: 'center',
  };

  return (
    <div>
      <div style={{ width: '90vw' }}>
        <Grid container direction='column' sx={{ marginTop: '3rem', gap: '2vw' }}></Grid>
      </div>
    </div>
  );
};
