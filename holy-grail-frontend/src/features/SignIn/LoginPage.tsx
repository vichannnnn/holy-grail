import { FormEvent, useContext, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  createTheme,
  TextField,
  Link,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { AuthContext } from '@providers';
import './login.css';

export const LoginPage = () => {
  const muiTheme = createTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      const alertContentRedirect: AlertProps = {
        title: 'Logged in successfully.',
        description: 'Welcome back!',
        severity: 'success',
      };

      navigate('/', { state: { alertContent: alertContentRedirect } });
    } catch (error) {
      setAlertContent({
        title: 'Login failed.',
        description: 'Invalid username or password.',
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <section className='login section container' id='login'>
        <AccountForm>
          <div className='login__title'>Log in</div>
          <div className='section__subtitle'>Enter your credentials to access your account.</div>
          <form className='login__fields' onSubmit={handleLogin}>
            <Stack direction='column' spacing={6}>
              <FormControl id='username'>
                <TextField
                  id='username'
                  label='Username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id='password'>
                <TextField
                  id='password'
                  label='Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type='submit' variant='contained' fullWidth>
                Log In
              </Button>
            </Stack>
          </form>
          <Box>
            <div className='login__footer'>
              Forgot your password?{' '}
              <Link component='button' onClick={handleForgotPassword} underline='always'>
                Click here.
              </Link>
            </div>
            <div className='login__footer'>
              Not a member?{' '}
              <Link component='button' onClick={handleRegister} underline='always'>
                Register now.
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
