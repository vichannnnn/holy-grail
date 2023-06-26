import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyAccount } from '../../api/utils/auth/VerifyAccount';
import { Link, useToast } from '@chakra-ui/react';
import { resendVerificationEmail } from '../../api/utils/auth/ResendVerificationEmail';
import '../SignIn/login.css';
import AlertToast, {AlertProps} from '../../components/AlertToast/AlertToast';

const VerifyAccountPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>({} as AlertProps);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const location = useLocation();

  const parseQuery = (query: string): URLSearchParams => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const query = parseQuery(location.search);
    const token = query.get('token');
    setToken(token);

    if (token) {
      verifyAccount(token)
        .then(() => {
          setResetStatus(
            'Your account has been successfully verified. You can now upload resources.',
          );
        })
        .catch(() => {
          setFailed(true);
        });
    } else {
      setFailed(true);
    }
  }, [location.search]);

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail();
      setAlert({
        title: 'Verification email resent successfully.',
        description:
          'Please check your email for the verification mail sent to you.',
        severity: 'success',
      });
      setOpenAlert(true);
    } catch (error) {
      console.error(error);
      setAlert({
        title: 'Failed to resend verification email.',
        description: 'An error occurred while sending.',
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <section className='resetPw section container'>
      <div>
        <div className='login__title'>Account Verification</div>

        {resetStatus ? (
          <div className='section__subtitle'>{resetStatus}</div>
        ) : isFailed ? (
          <div className='section__subtitle'>
            The account verification link is invalid or has expired. Please click{' '}
            <Link as='button' onClick={handleResendVerificationEmail} textDecoration='underline'>
              here
            </Link>{' '}
            to send another verification email.
          </div>
        ) : null}
        <AlertToast
          openAlert={openAlert}
          onClose={() => setOpenAlert(false)}
          alert={alert}
        />
      </div>
    </section>
  );
};

export default VerifyAccountPage;
