'use client';

import { useState } from 'react';

import { Button } from '@components/Button';
import { ErrorText, SectionTitle } from '@components/Typography';

import { useToast } from '@providers/ToastProvider';

import { useNavigate } from '@utils/navigation';

import { AccountRegisterForm } from '@forms/AccountRegister';
import { FormEnum } from '@forms/types';

export const AccountRegister = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useNavigate();

  const { showToast } = useToast();

  const handleRegisterFailure = (errorMessage: string | null) => {
    setRegisterError(errorMessage);
  };

  const handleRegisterSuccess = () => {
    setRegisterError(null);
    showToast({
      severity: 'success',
      description:
        'Account created successfully! Please verify your account from the email sent to you.',
    });
  };

  const handleRedirectToAccountLoginPage = () => {
    router.navigateTo('/account-login');
  };

  return (
    <div className='flex flex-col justify-center h-screen w-1/2 m-auto'>
      <SectionTitle title='Register an account' />
      <AccountRegisterForm
        onSubmitSuccess={handleRegisterSuccess}
        onSubmitFailure={handleRegisterFailure}
        formId={FormEnum.ACCOUNT_REGISTER_FORM_ID}
      />
      <div className='flex flex-col justify-center mt-6 gap-3 w-full'>
        {registerError && <ErrorText>{registerError}</ErrorText>}
        <Button
          className='w-full'
          // TODO: We should probably set this in the MUI custom palette (sure but ideally not) for this Tori Pink
          //  TODO: color or in our Tailwind custom class (best option).
          // TODO: We need to solve the issue of MUI default color overriding Tailwind custom class as well.
          sx={{
            color: 'black',
            backgroundColor: '#FFA5A5',
            '&:hover': {
              backgroundColor: '#cc8484',
              border: 'none',
            },
          }}
          form={FormEnum.ACCOUNT_REGISTER_FORM_ID}
          type='submit'
        >
          Sign Up
        </Button>
      </div>
      <p className='mt-2'>
        Already have an account? Login{' '}
        <span className='cursor-pointer font-bold' onClick={handleRedirectToAccountLoginPage}>
          here
        </span>
        .
      </p>
    </div>
  );
};
