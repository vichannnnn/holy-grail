import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '@api/auth';
import { Link } from '@mui/material';
import '../SignIn/login.css';

export const ResetPasswordPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <section className='resetPw section container'>
      <div>
        <div className='login__title'>Reset Password</div>

        {resetStatus ? (
          <div className='section__subtitle'>{resetStatus}</div>
        ) : isFailed ? (
          <div className='section__subtitle '>
            The password reset link is invalid or has expired. Please click{' '}
            <Link onClick={handleForgotPassword} underline='always'>
              here
            </Link>{' '}
            to reset your password again.
          </div>
        ) : null}
      </div>
    </section>
  );
};
