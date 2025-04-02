'use client';

import { TaskAlt, Unpublished } from '@mui/icons-material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { resendVerificationEmail, resetPassword, verifyAccount } from '@api/auth';

import { Button } from '@components/Button';

import { useToast } from '@providers/ToastProvider';

import { useNavigate } from '@utils/navigation';

const ReturnToHomeButton = () => {
  return (
    <Link href='/' passHref>
      <Button
        className='flex justify-center mx-auto'
        sx={{
          color: 'black',
          backgroundColor: '#FFA5A5',
          '&:hover': {
            backgroundColor: '#cc8484',
            border: 'none',
          },
        }}
      >
        Return to Home
      </Button>
    </Link>
  );
};

export enum TokenActionEnum {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

const actionMessages = {
  [TokenActionEnum.VERIFY_EMAIL]: {
    successTitle: 'Account Verified Successfully',
    errorTitle: 'Oh no! Something went wrong!',
    successDescription: 'You’ve successfully verified your email.',
    errorDescription:
      'The account verification link is invalid or has expired. Please click here to send another verification email.',
  },
  [TokenActionEnum.RESET_PASSWORD]: {
    successTitle: 'Password Reset Successful',
    errorTitle: 'Oh no! Something went wrong!',
    successDescription: 'You can now set a new password.',
    errorDescription:
      'The reset password link is invalid or has expired. Please click here to request a new password reset email.',
  },
};

interface TokenActionHandlerProps {
  action: TokenActionEnum;
}

export const TokenActionHandler = ({ action }: TokenActionHandlerProps) => {
  const { showToast } = useToast();
  const router = useNavigate();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail();
      showToast({
        description: 'Please check your email for a new verification mail sent to you.',
        severity: 'success',
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        showToast({
          description: 'Your account email is already verified.',
          severity: 'error',
        });
      } else {
        showToast({
          description: 'An error occurred while attempting to resend.',
          severity: 'error',
        });
      }
    }
  };

  const handleClickHereButton = async () => {
    if (action === TokenActionEnum.VERIFY_EMAIL) {
      await handleResendVerificationEmail();
    } else if (action === TokenActionEnum.RESET_PASSWORD) {
      router.navigateTo('/forgot-password');
    }
  };

  const handleAction = async (token: string) => {
    try {
      if (action === TokenActionEnum.VERIFY_EMAIL) {
        await verifyAccount(token);
      } else if (action === TokenActionEnum.RESET_PASSWORD) {
        await resetPassword(token);
      }
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromURL = urlParams.get('token');

      if (!tokenFromURL) {
        router.navigateTo('/');
      }

      await handleAction(tokenFromURL as string);
    };

    verifyToken().then((r) => null);
  }, [action]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const messages = actionMessages[action];

  if (success) {
    return (
      <div className='flex flex-col gap-8 text-center mb-32 mt-16'>
        <TaskAlt className='mx-auto h-16 w-16 text-green-500' />
        <h1 className='text-3xl text-white font-bold'>{messages.successTitle}</h1>
        <p>{messages.successDescription}</p>
        <ReturnToHomeButton />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col gap-8 text-center mb-32 mt-16'>
        <Unpublished className='mx-auto h-16 w-16 text-red-500' />
        <h1 className='text-3xl text-white font-bold'>{messages.errorTitle}</h1>
        <p>
          {messages.errorDescription.split('here').map((part, index, arr) => (
            <span key={index}>
              {part}
              {index < arr.length - 1 && (
                <a className='cursor-pointer font-bold' onClick={handleClickHereButton}>
                  here
                </a>
              )}
            </span>
          ))}
        </p>

        <ReturnToHomeButton />
      </div>
    );
  }
};
