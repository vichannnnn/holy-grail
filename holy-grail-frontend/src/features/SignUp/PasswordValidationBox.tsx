import { PasswordValidationBoxProps } from '@features';
import { Box, Icon, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

export const PasswordValidationBox = ({
  lengthValid,
  specialCharValid,
  capitalLetterValid,
  repeatPasswordValid,
  allCriteriaMet,
}: PasswordValidationBoxProps) => {
  const renderValidationMessage = (valid: boolean, message: string) => (
    <Stack direction='row' spacing={2} textAlign='left'>
      <Icon component={valid ? Check : Close} color={valid ? 'success' : 'error'} sx={{ mr: 2 }} />
      <div className='signup__validation'>{message}</div>
    </Stack>
  );

  return (
    <Box
      sx={{
        mt: 4,
        border: 1,
        borderRadius: 'md',
        p: 4,
        borderColor: allCriteriaMet ? 'success.main' : 'error.main',
        width: '100%',
        maxWidth: '400px',
        m: '0 auto',
      }}
    >
      <div className='password__validation'>Password check:</div>
      <Stack direction='column' alignItems='flex-start' spacing={1}>
        {renderValidationMessage(lengthValid, 'Between 8 and 30 characters.')}
        {renderValidationMessage(specialCharValid, 'Contains at least one special character.')}
        {renderValidationMessage(capitalLetterValid, 'Contains at least one capital letter.')}
        {renderValidationMessage(repeatPasswordValid, 'Passwords match.')}
      </Stack>
    </Box>
  );
};
