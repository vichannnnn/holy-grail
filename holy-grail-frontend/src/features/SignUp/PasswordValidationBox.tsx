import { Box, VStack, Icon, HStack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

interface PasswordValidationBoxProps {
  lengthValid: boolean;
  specialCharValid: boolean;
  capitalLetterValid: boolean;
  repeatPasswordValid: boolean;
  allCriteriaMet: boolean;
}

const PasswordValidationBox = ({
  lengthValid,
  specialCharValid,
  capitalLetterValid,
  repeatPasswordValid,
  allCriteriaMet,
}: PasswordValidationBoxProps) => {
  const renderValidationMessage = (valid: boolean, message: string) => (
    <HStack spacing={2} textAlign='left'>
      <Icon as={valid ? CheckIcon : CloseIcon} color={valid ? 'green.500' : 'red.500'} mr={2} />
      <div className='signup__validation'>{message}</div>
    </HStack>
  );

  return (
    <Box
      mt={4}
      borderWidth={1}
      borderRadius='md'
      p={4}
      borderColor={allCriteriaMet ? 'green.500' : 'red.500'}
      width='100%'
      maxWidth='400px'
      margin='0 auto'
    >
      <div className='password__validation'>Password check:</div>
      <VStack align='start' spacing={1}>
        {renderValidationMessage(lengthValid, 'Between 8 and 30 characters.')}
        {renderValidationMessage(specialCharValid, 'Contains at least one special character.')}
        {renderValidationMessage(capitalLetterValid, 'Contains at least one capital letter.')}
        {renderValidationMessage(repeatPasswordValid, 'Passwords match.')}
      </VStack>
    </Box>
  );
};

export default PasswordValidationBox;
