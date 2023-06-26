import { FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AccountForm } from '../../components/AccountForm/AccountForm';
import '../SignIn/login.css';
import sendResetPasswordEmail from '../../api/utils/auth/ResetPasswordMail';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<AlertProps>({} as AlertProps);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendResetPasswordEmail(email);

    setAlert({
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
      <AlertToast openAlert={openAlert} onClose={() => setOpenAlert(false)} alert={alert} />
    </section>
  );
};

export default ForgotPasswordPage;
