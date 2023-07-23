import { useContext, useEffect, useState } from 'react';
import { PasswordValidationBox } from '@features';
import { useNavigate } from 'react-router-dom';
import { AlertProps } from '@components';
import { Typography, TextField, Grid, IconButton, Button, Collapse } from '@mui/material';
import { AuthContext } from '@providers';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEmailValidation, ChangePasswordValidation } from '@forms/validation';
import { updatePassword } from '@api/auth';
import * as Yup from 'yup';
import { set } from 'lodash';

export const AccountDetails = () => {
  const { user, isLoading } = useContext(AuthContext);

  const initialiseValidator = (schema: Yup.AnyObjectSchema, defaultValues: Object) => {
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { ...defaultValues },
    });
    return { register, watch, handleSubmit, errors };
  };

  const emailValidator = initialiseValidator(ChangeEmailValidation, { email: user?.email || '' });
  const passwordValidator = initialiseValidator(ChangePasswordValidation, {});

  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(emailValidator);
  });

  const handleUpdatePassword = async () => {
    null;
  };

  const handleUpdateEmail = async () => {
    setIsEditingEmail(false);
  };

  const gridStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '2vw',
    alignItems: 'center',
  };

  return (
    <div>
      <div>
        <Grid container direction='column' sx={{ marginTop: '3rem', gap: '2vw' }}>
          <Grid item sx={{ ...gridStyles }}>
            <Typography variant='h5'>{user?.username}</Typography>
            <Typography
              variant='subtitle1'
              sx={{
                color: user?.verified ? 'green' : 'red',
                border: user?.verified ? '1px solid green' : '1px solid red',
                borderRadius: '8px',
                backgroundColor: user?.verified ? 'lightgreen' : '#ff000050',
                padding: '1.5%',
              }}
            >
              {user?.verified ? 'Verified' : 'Not verified'}
            </Typography>
          </Grid>
          <hr />
          <Grid item sx={{ ...gridStyles }}>
            <Typography variant='h6'>Email:</Typography>
            {isEditingEmail ? (
              <form onSubmit={emailValidator.handleSubmit(handleUpdateEmail)}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2vw',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    label='New email'
                    variant='outlined'
                    size='medium'
                    required
                    {...emailValidator.register('email')}
                    error={Boolean(emailValidator.errors.email)}
                    helperText={emailValidator.errors.email?.message as String}
                  />
                  <Button type='submit' variant='contained' color='success'>
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '2vw', alignItems: 'center' }}
              >
                <Typography variant='h6'>{user?.email}</Typography>
                <IconButton onClick={() => setIsEditingEmail(true)}>
                  <EditIcon color='info' />
                </IconButton>
              </div>
            )}
          </Grid>
          <Grid item sx={{ ...gridStyles, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Grid sx={gridStyles}>
              <Typography variant='h6'>Password:</Typography>
              <Button variant='contained' color='info' onClick={() => setIsEditingPassword(true)}>
                Change password
              </Button>
            </Grid>

            <Collapse in={isEditingPassword} unmountOnExit timeout='auto'>
              <div style={{ ...(gridStyles as React.CSSProperties), flexDirection: 'column' }}>
                <TextField
                  label='Current Password'
                  sx={{ width: '100%' }}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  label='New Password'
                  sx={{ width: '100%' }}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  label='Repeat New Password'
                  sx={{ width: '100%' }}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <PasswordValidationBox password={newPassword} repeatPassword={repeatPassword} />
                <Button
                  variant='contained'
                  color='success'
                  onClick={() => setIsEditingPassword(false)}
                >
                  Save
                </Button>
              </div>
            </Collapse>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
