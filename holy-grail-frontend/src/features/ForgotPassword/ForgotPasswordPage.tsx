import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordEmail } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { Box, Button, FormControl, TextField, Link, Stack } from '@mui/material';
import '../SignIn/login.css';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendResetPasswordEmail(email);

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
        <div className='login__title'>Forgot Password</div>
        <div className='section__subtitle'>
          Please enter the email you registered with to reset your password.
        </div>

        <form className='login__fields' onSubmit={handleResetPassword}>
          <Stack direction='column' spacing={6}>
            <FormControl id='email'>
              <TextField
                type='email'
                label='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Link onClick={() => navigate('/login')} underline='always'>
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
