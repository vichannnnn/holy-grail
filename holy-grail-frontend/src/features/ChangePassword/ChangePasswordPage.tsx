import { useEffect, useState, FormEvent } from 'react';
import { updatePassword } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { PasswordValidationBox } from '@features';
import { useNavigation } from '@utils';
import { Button, FormControl, TextField, Stack } from '@mui/material';
import '../SignIn/login.css';

export const ChangePasswordPage = () => {
  const { goToHome } = useNavigation();

  const [beforePassword, setBeforePassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const [lengthValid, setLengthValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [capitalLetterValid, setCapitalLetterValid] = useState(false);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
  const allCriteriaMet =
    lengthValid && specialCharValid && capitalLetterValid && repeatPasswordValid;

  useEffect(() => {
    setLengthValid(password.length <= 30 && password.length >= 8);
    setSpecialCharValid(/[!@#$%^&*]/.test(password));
    setCapitalLetterValid(/[A-Z]/.test(password));
    setRepeatPasswordValid(password === repeatPassword && password !== '');
  }, [password, repeatPassword]);

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, message } = await updatePassword(beforePassword, password, repeatPassword);
    if (success) {
      const alertContentRedirect: AlertProps = {
        title: 'Password successfully updated.',
        description: `You can now log in with your new password.`,
        severity: 'success',
      };

      goToHome({ state: { alertContent: alertContentRedirect } });
    } else {
      setAlertContent({
        title: 'Password update failed.',
        description: message,
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <section className='updatePw section container'>
      <AccountForm>
        <div className='login__title'>Update Password</div>
        <div className='section__subtitle'>You can change your password here.</div>

        <form className='login__fields' onSubmit={handleUpdatePassword}>
          <Stack direction='column' spacing={4}>
            <FormControl id='before-password'>
              <TextField
                type='password'
                label='Current Password'
                value={beforePassword}
                onChange={(e) => setBeforePassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='password'>
              <TextField
                type='password'
                label='New Password'
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
              Update Password
            </Button>
          </Stack>
        </form>
      </AccountForm>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </section>
  );
};
