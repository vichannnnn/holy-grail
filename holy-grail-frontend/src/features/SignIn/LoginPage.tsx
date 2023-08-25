import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { AuthContext, LogInDetails } from '@providers';
import { SignInValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import { Box, Button, FormControl, Stack, TextField, Link } from '@mui/material';
import './login.css';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { goToHome, goToRegister, goToForgotPassword } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user, isLoading, login } = useContext(AuthContext);
  const navigate = useNavigate();
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
        navigate('/');
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
    <section className='login section container' id='login'>
      <AccountForm>
        <div className='login__title'>Log in</div>
        <div className='section__subtitle'>Enter your credentials to access your account.</div>
        <form className='login__fields' onSubmit={handleSubmit(handleLogin)}>
          <Stack direction='column' spacing={6}>
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
            <Button type='submit' variant='contained' fullWidth>
              Log In
            </Button>
          </Stack>
        </form>
        <Box>
          <div className='login__footer'>
            Forgot your password?{' '}
            <Link onClick={goToForgotPassword} underline='always'>
              Click here.
            </Link>
          </div>
          <div className='login__footer'>
            Not a member?{' '}
            <Link onClick={goToRegister} underline='always'>
              Register now.
            </Link>
          </div>
        </Box>
      </AccountForm>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </section>
  );
};
