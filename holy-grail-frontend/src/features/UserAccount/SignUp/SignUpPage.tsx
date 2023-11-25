import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountDetails } from '@api/auth';
import { AlertToast, AlertProps, PasswordValidation, Button } from '@components';
import { SignUpValidation } from '@forms/validation';
import { AuthContext } from '@providers';
import { useNavigation } from '@utils';
import { Box, FormControl, TextField, Link, Stack } from '@mui/material';
import '../UserAccountForm.css';

export const SignUpPage = () => {
  const { goToLoginPage, goToHome } = useNavigation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation),
  });

  const { registerUserAccount } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        goToHome();
      }
    }
  }, [isLoading, user]);

  const handleRegister = async (formData: AccountDetails) => {
    const status = await registerUserAccount(formData);
    let alertContent: AlertProps;

    switch (status) {
      case 200:
        alertContent = {
          title: 'Account successfully created.',
          description: 'Please check your email for the verification link to verify your account.',
          severity: 'success',
        };

        goToLoginPage({ state: { alertContent: alertContent } });
        break;
      case 409:
        alertContent = {
          title: 'Registration failed.',
          description: 'The username or email has already been taken.',
          severity: 'error',
        };
        break;
      case 400:
        alertContent = {
          title: 'Registration failed.',
          description: 'Your password does not match. Please check your password and try again.',
          severity: 'error',
        };
        break;
      case 422:
        alertContent = {
          title: 'Registration failed.',
          description:
            'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.',
          severity: 'error',
        };
        break;
      case 429:
        alertContent = {
          title: 'Registration failed.',
          description: "You're trying too fast! Please try again in 10 minutes.",
          severity: 'error',
        };
        break;
      default:
        alertContent = {
          title: 'Registration failed.',
          description: 'Unable to create account. Please check your input and try again.',
          severity: 'error',
        };
        break;
    }

    setAlertContent(alertContent);
    setOpenAlert(true);
  };

  return (
    <>
      <div className='account-form-container'>
        <div className='account-form-title'>Sign up</div>
        <div className='account-form-subtitle'>Create an account to access all features.</div>
        <form className='account-form-text-field' onSubmit={handleSubmit(handleRegister)}>
          <Stack direction='column' spacing={3}>
            <FormControl id='username'>
              <TextField
                type='text'
                label='Username'
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                {...register('username')}
                required
              />
            </FormControl>
            <FormControl id='email'>
              <TextField
                type='email'
                label='Email Address'
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email')}
                required
              />
            </FormControl>
            <FormControl id='password'>
              <TextField
                type='password'
                label='Password'
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password')}
                required
              />
            </FormControl>
            <FormControl id='repeat-password'>
              <TextField
                type='password'
                label='Repeat Password'
                error={Boolean(errors.repeat_password)}
                helperText={errors.repeat_password?.message}
                {...register('repeat_password')}
                required
              />
            </FormControl>
            <div className='password-validation-container'>
              <PasswordValidation
                password={watch('password')}
                repeatPassword={watch('repeat_password')}
              />
            </div>
            <div className='account-form-button-container'>
              <Button type='submit'>Sign Up</Button>
            </div>
          </Stack>
        </form>
        <Box>
          <div className='account-form-footer'>
            <div>
              Already a member?{' '}
              <Link onClick={goToLoginPage} underline='always'>
                Log in here.
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
