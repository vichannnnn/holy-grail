import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { AuthContext } from '@providers';
import {
  Box,
  Button,
  FormControl,
  TextField,
  Link,
  Stack,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { PasswordValidationBox } from './PasswordValidationBox';
import '../SignIn/login.css';

export const SignUpPage = () => {
  const muiTheme = createTheme();
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user, register } = useContext(AuthContext);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
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
      setAlertContent({
        title: 'Invalid username.',
        description:
          'Please ensure your username is valid. It should contain 4 to 20 alphanumeric characters.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }

    const status = await register({
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      email: email,
    });

    let alertContent: AlertProps;

    switch (status) {
      case 200:
        alertContent = {
          title: 'Account successfully created.',
          description: 'Please check your email for the verification link to verify your account.',
          severity: 'success',
        };

        navigate('/', { state: { alertContent: alertContent } });
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
    <ThemeProvider theme={muiTheme}>
      <section className='signup section container' id='signup'>
        <AccountForm>
          <div className='login__title'>Sign up</div>
          <div className='section__subtitle'>Create an account to access all features.</div>

          <form className='login__fields' onSubmit={handleRegister}>
            <Stack direction='column' spacing={4}>
              <FormControl id='username'>
                <TextField
                  type='text'
                  label='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id='email'>
                <TextField
                  type='email'
                  label='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id='password'>
                <TextField
                  type='password'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id='repeat-password'>
                <TextField
                  type='password'
                  label='Repeat Password'
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

              <Button type='submit' variant='contained' fullWidth>
                Sign Up
              </Button>
            </Stack>
          </form>
          <Box>
            <div className='login__footer'>
              Already a member?{' '}
              <Link component='button' onClick={() => navigate('/login')} underline='always'>
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
    </ThemeProvider>
  );
};
