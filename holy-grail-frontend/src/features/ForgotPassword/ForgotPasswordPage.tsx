import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@utils';
import { sendResetPasswordEmail, ForgotPasswordDetails } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { ResetPasswordValidation } from '@forms/validation';
import { Box, Button, FormControl, TextField, Link, Stack } from '@mui/material';
import '../UserAccount/Login/LoginPage.css';

export const ForgotPasswordPage = () => {
  const { goToLoginPage } = useNavigation();
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordValidation),
  });

  const handleResetPassword = async (formData: ForgotPasswordDetails) => {
    const result = await sendResetPasswordEmail(formData);

    setAlertContent({
      title: result.success ? 'Password reset email successfully sent.' : 'Reset Password failed.',
      description: result.message,
      severity: result.success ? 'success' : 'error',
    });
    setOpenAlert(true);
  };

  return (
    <section className='forgotPw section container'>
      <AccountForm>
        <div className='login-title'>Forgot Password</div>
        <div className='section__subtitle'>
          Please enter the email you registered with to reset your password.
        </div>

        <form className='login-text-field' onSubmit={handleSubmit(handleResetPassword)}>
          <Stack direction='column' spacing={6}>
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
            <Button type='submit' variant='contained' fullWidth>
              Reset Password
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
