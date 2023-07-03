import { FormEvent, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  useToast,
  Box,
<<<<<<< HEAD
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AccountForm } from '../../components/AccountForm/AccountForm';
import '../SignIn/login.css';
import sendResetPasswordEmail from '../../api/utils/auth/ResetPasswordMail';
=======
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { AccountForm } from "../../components/AccountForm/AccountForm";
import "../SignIn/login.css"
>>>>>>> bbe493b (new FE (desktop))

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await sendResetPasswordEmail(email);

    toast({
      title: result.success ? 'Password reset email successfully sent.' : 'Reset Password failed.',
      description: result.message,
      status: result.success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
<<<<<<< HEAD
    <section className='forgotPw section container'>
      <AccountForm>
        <div className='login__title'>Forgot Password</div>
        <div className='section__subtitle'>
          Please enter the email you registered with to reset your password.
        </div>

        <form className='login__fields' onSubmit={handleResetPassword}>
          <VStack spacing='6'>
            <FormControl id='email'>
=======
    <section className="forgotPw section container">
      <AccountForm>
        <div className="login__title">Forgot Password</div>
        <div className="section__subtitle">
          Please enter the email you registered with to
          <br />
          reset your password.
        </div>

        <form className="login__fields" onSubmit={handleResetPassword}>
          <VStack spacing="6">
            <FormControl id="email">
>>>>>>> bbe493b (new FE (desktop))
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
<<<<<<< HEAD
          <div className='login__footer'>
            Already a member?{' '}
            <Link as='button' onClick={() => navigate('/login')} textDecoration='underline'>
=======
          <div className="login__footer">
            Already a member?{" "}
            <Link
              as="button"
              onClick={() => navigate("/login")}
              textDecoration="underline"
            >
>>>>>>> bbe493b (new FE (desktop))
              Log in here.
            </Link>
          </div>
        </Box>
      </AccountForm>
    </section>
  );
};

export default ForgotPasswordPage;
