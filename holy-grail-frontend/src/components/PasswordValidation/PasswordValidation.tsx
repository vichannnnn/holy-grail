import { useState, useEffect } from 'react';
import { Box, Icon, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

interface PasswordValidationBoxProps {
  password: string;
  repeatPassword: string;
}

export const PasswordValidation = ({ password, repeatPassword }: PasswordValidationBoxProps) => {
  const [lengthValid, setLengthValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [capitalLetterValid, setCapitalLetterValid] = useState(false);
  const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
  const allCriteriaMet =
    lengthValid && specialCharValid && capitalLetterValid && repeatPasswordValid;

  useEffect(() => {
    setLengthValid(password?.length <= 30 && password?.length >= 8);
    setSpecialCharValid(/[!@#$%^&*]/.test(password || ''));
    setCapitalLetterValid(/[A-Z]/.test(password || ''));
    setRepeatPasswordValid(!!(password && repeatPassword && password === repeatPassword));
  }, [password, repeatPassword]);

  const renderValidationMessage = (valid: boolean, message: string) => (
    <Stack direction='row' spacing={2} textAlign='left'>
      <Icon component={valid ? Check : Close} color={valid ? 'success' : 'error'} sx={{ mr: 2 }} />
      <div className='signup-validation'>{message}</div>
    </Stack>
  );

  return (
    <Box
      sx={{
        mt: 4,
        border: 1,
        borderRadius: '4px',
        p: 4,
        borderColor: allCriteriaMet ? 'success.main' : 'error.main',
        width: '100%',
        maxWidth: '400px',
        m: '0 auto',
      }}
    >
      <div className='password-validation'>Password check:</div>
      <Stack direction='column' alignItems='flex-start' spacing={1}>
        {renderValidationMessage(lengthValid, 'Between 8 and 30 characters.')}
        {renderValidationMessage(specialCharValid, 'Contains at least one special character.')}
        {renderValidationMessage(capitalLetterValid, 'Contains at least one capital letter.')}
        {renderValidationMessage(repeatPasswordValid, 'Passwords match.')}
      </Stack>
    </Box>
  );
};
