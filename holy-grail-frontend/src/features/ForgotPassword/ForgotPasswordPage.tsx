import { FormEvent, useState } from 'react';
import { sendResetPasswordEmail } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { Box, Button, FormControl, FormLabel, Input, Link, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
          <VStack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <Button type='submit' colorScheme='blue' w='100%'>
              Reset Password
            </Button>
          </VStack>
        </form>
        <Box>
          <div className='login__footer'>
            Already a member?{' '}
            <Link as='button' onClick={() => navigate('/login')} textDecoration='underline'>
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
