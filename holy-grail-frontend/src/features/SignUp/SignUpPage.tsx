import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountDetails } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { PasswordValidationBox } from '@features';
import { SignUpValidation } from '@forms/validation';
import { AuthContext } from '@providers';
import { useNavigation } from '@utils';
import { Box, Button, FormControl, TextField, Link, Stack } from '@mui/material';
import '../SignIn/login.css';

export const SignUpPage = () => {
  const { goToLoginPage } = useNavigation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation),
  });

  const { user, registerUserAccount } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  console.log(SignUpValidation);
  const handleRegister = async (formData: AccountDetails) => {
    console.log('called handleRegister');
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
    <section className='signup section container' id='signup'>
      <AccountForm>
        <div className='login__title'>Sign up</div>
        <div className='section__subtitle'>Create an account to access all features.</div>

        <form className='login__fields' onSubmit={handleSubmit(handleRegister)}>
          <Stack direction='column' spacing={4}>
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
                error={Boolean(errors.repeatPassword)}
                helperText={errors.repeatPassword?.message}
                {...register('repeatPassword')}
                required
              />
            </FormControl>
            <PasswordValidationBox
              password={watch('password')}
              repeatPassword={watch('repeatPassword')}
            />

            <Button type='submit' variant='contained' fullWidth>
              Sign Up
            </Button>
          </Stack>
        </form>
        <Box>
          <div className='login__footer'>
            Already a member?{' '}
            <Link onClick={goToLoginPage} underline='always'>
              Log in here.
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
