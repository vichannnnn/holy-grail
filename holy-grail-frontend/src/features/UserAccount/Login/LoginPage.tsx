import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertToast, AlertProps, Button } from '@components';
import { AuthContext, LogInDetails } from '@providers';
import { SignInValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import { Box, FormControl, Stack, TextField, Link } from '@mui/material';
import '../UserAccountForm.css';

export const LoginPage = () => {
  const { goToHome, goToRegister, goToForgotPassword } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user, isLoading, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInValidation),
  });

  if (user) {
    goToHome();
  }

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        goToHome();
      }
    }
  }, [isLoading, user]);

  const handleLogin = async (formData: LogInDetails) => {
    try {
      await login(formData);
      const alertContentRedirect: AlertProps = {
        title: 'Logged in successfully.',
        description: 'Welcome back!',
        severity: 'success',
      };

      goToHome({ state: { alertContent: alertContentRedirect } });
    } catch (error) {
      setAlertContent({
        title: 'Login failed.',
        description: 'Invalid username or password.',
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <>
      <div className='account-form-container'>
        <div className='account-form-title'>Log in</div>
        <div className='account-form-subtitle'>Enter your credentials to access your account.</div>
        <form className='account-form-text-field' onSubmit={handleSubmit(handleLogin)}>
          <Stack direction='column' spacing={3}>
            <FormControl id='username'>
              <TextField
                label='Username'
                type='text'
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('username')}
                required
              />
            </FormControl>
            <FormControl id='password'>
              <TextField
                label='Password'
                type='password'
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password')}
                required
              />
            </FormControl>
            <div className='account-form-button-container'>
              <Button type='submit'>Log In</Button>
            </div>
          </Stack>
        </form>
        <Box>
          <div className='account-form-footer'>
            <div>
              Forgot your password?{' '}
              <Link onClick={goToForgotPassword} underline='always'>
                Click here.
              </Link>
            </div>
            <div>
              Not a member?{' '}
              <Link onClick={goToRegister} underline='always'>
                Register now.
              </Link>
            </div>
          </div>
        </Box>
      </div>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
