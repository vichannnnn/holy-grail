import { useState, useEffect, FormEvent } from 'react';
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
import PasswordValidationBox from './PasswordValidationBox';
import { AccountForm } from '../../components/AccountForm/AccountForm';
import '../SignIn/login.css';
import registerAccount from '../../api/utils/auth/RegisterAccount';
=======
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { AxiosError } from "axios";
import PasswordValidationBox from "./PasswordValidationBox";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import { AccountForm } from "../../components/AccountForm/AccountForm";
import "../SignIn/login.css"
>>>>>>> bbe493b (new FE (desktop))

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const [lengthValid, setLengthValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [capitalLetterValid, setCapitalLetterValid] = useState(false);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
  const allCriteriaMet =
    lengthValid && specialCharValid && capitalLetterValid && repeatPasswordValid;

  useEffect(() => {
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    setUsernameValid(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    setLengthValid(password.length <= 30 && password.length >= 8);
    setSpecialCharValid(/[!@#$%^&*]/.test(password));
    setCapitalLetterValid(/[A-Z]/.test(password));
    setRepeatPasswordValid(password === repeatPassword && password !== '');
  }, [password, repeatPassword]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameValid) {
      toast({
        title: 'Invalid username.',
        description:
          'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const result = await registerAccount({
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      email: email,
    });

    toast({
      title: result.success ? 'Account successfully created.' : 'Registration failed.',
      description: result.message,
      status: result.success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });

    if (result.success) navigate('/');
  };

  return (
<<<<<<< HEAD
    <section className='signup section container' id='signup'>
      <AccountForm>
        <div className='login__title'>Sign up</div>
        <div className='section__subtitle'>Create an account to access all features.</div>

        <form className='login__fields' onSubmit={handleRegister}>
          <VStack spacing='4'>
            <FormControl id='username'>
=======
    <section className="signup section container" id="signup">
      <AccountForm>
        <div className="login__title">Sign up</div>
        <div className="section__subtitle">Create an account to access all features.</div>

        <form className="login__fields" onSubmit={handleRegister}>
          <VStack spacing="4">
            <FormControl id="username">
>>>>>>> bbe493b (new FE (desktop))
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='repeat-password'>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                type='password'
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </FormControl>
            <PasswordValidationBox
              lengthValid={lengthValid}
              specialCharValid={specialCharValid}
              capitalLetterValid={capitalLetterValid}
              repeatPasswordValid={repeatPasswordValid}
              allCriteriaMet={allCriteriaMet}
            />

            <Button type='submit' colorScheme='blue' w='100%'>
              Sign Up
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

export default SignUpPage;
