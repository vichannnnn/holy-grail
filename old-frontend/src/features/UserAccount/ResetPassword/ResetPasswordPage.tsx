import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '@api/auth';
import { useNavigation } from '@utils';
import { Link } from '@mui/material';
import '../UserAccountForm.css';

export const ResetPasswordPage = () => {
  const { goToForgotPassword } = useNavigation();
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const location = useLocation();

  const parseQuery = (query: string): URLSearchParams => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const query = parseQuery(location.search);
    const token = query.get('token');
    setToken(token);

    if (token) {
      resetPassword(token)
        .then(() => {
          setResetStatus(
            'Your password reset is successful. Please check your email for the new password sent to you.',
          );
        })
        .catch(() => {
          setFailed(true);
        });
    } else {
      setFailed(true);
    }
  }, [location.search]);

  return (
    <div className='account-form-container'>
      <div className='account-form-title'>Reset Password</div>
      {resetStatus ? (
        <div className='account-form-subtitle'>{resetStatus}</div>
      ) : isFailed ? (
        <div className='account-form-subtitle '>
          The password reset link is invalid or has expired. Please click{' '}
          <Link onClick={goToForgotPassword} underline='always'>
            here
          </Link>{' '}
          to reset your password again.
        </div>
      ) : null}
    </div>
  );
};
