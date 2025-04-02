import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendResetPasswordEmail, ForgotPasswordDetails } from '@api/auth';
import { AlertToast, AlertProps, Button } from '@components';
import { ResetPasswordValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import { Box, FormControl, TextField, Link, Stack } from '@mui/material';
import '../UserAccountForm.css';

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
    <>
      <div className='account-form-container'>
        <div className='account-form-title'>Forgot Password</div>
        <div className='account-form-subtitle'>
          Please enter the email you registered with to reset your password.
        </div>

        <form className='account-form-text-field' onSubmit={handleSubmit(handleResetPassword)}>
          <Stack direction='column' spacing={3}>
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
            <div className='account-form-button-container'>
              <Button type='submit'>Reset Password</Button>
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
