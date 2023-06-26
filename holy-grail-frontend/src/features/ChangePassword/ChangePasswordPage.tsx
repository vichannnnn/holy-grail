import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PasswordValidationBox from '../SignUp/PasswordValidationBox';
import { AccountForm } from '../../components/AccountForm/AccountForm';
import '../SignIn/login.css';
import { updatePassword } from '../../api/utils/auth/UpdatePassword';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';
import { set } from 'lodash';

const ChangePasswordPage = () => {
  const [beforePassword, setBeforePassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({} as AlertProps);

  const navigate = useNavigate();

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

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, errorDescription } = await updatePassword(
      beforePassword,
      password,
      repeatPassword,
    );
    console.log(success, errorDescription);
    if (success) {
      setAlert({
        title: 'Password successfully updated.',
        description: `You can now log in with your new password.`,
        severity: 'success',
      });
      setOpenAlert(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      setAlert({
        title: 'Password update failed.',
        description: errorDescription
          ? errorDescription
          : 'An error occurred while updating your password.',
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

        <form onSubmit={handleUpdatePassword}>
          <VStack spacing='4'>
            <FormControl id='before-password'>
              <FormLabel>Current Password</FormLabel>
              <Input
                type='password'
                value={beforePassword}
                onChange={(e) => setBeforePassword(e.target.value)}
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
              Update Password
            </Button>
          </VStack>
        </form>
      </AccountForm>
      <AlertToast openAlert={openAlert} onClose={() => setOpenAlert(false)} alert={alert} />
    </section>
  );
};

export default ChangePasswordPage;
