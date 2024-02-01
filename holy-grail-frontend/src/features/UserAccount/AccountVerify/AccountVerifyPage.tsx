import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { resendVerificationEmail, verifyAccount } from '@api/auth';
import { AlertToast, AlertProps } from '@components';
import { AuthContext } from '@providers';
import { VerificationMessage } from './VerificationMessage';
import './AccountVerify.css';

export const AccountVerifyPage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [token, setToken] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<string | null>(null);
  const [isFailed, setFailed] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const location = useLocation();

  const parseQuery = (query: string): URLSearchParams => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const query = parseQuery(location.search);
    const token = query.get('token');
    setToken(token);

    if (token && user) {
      verifyAccount(token)
        .then(() => {
          setResetStatus(
            'Your account has been successfully verified. You can now upload resources.',
          );
          const updatedUser = { ...user, verified: true };
          updateUser(updatedUser);
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
      setAlertContent({
        title: 'Verification email resent successfully.',
        description: 'Please check your email for the verification mail sent to you.',
        severity: 'success',
      });
      setOpenAlert(true);
    } catch (error) {
      setAlertContent({
        title: 'Failed to resend verification email.',
        description: 'An error occurred while sending.',
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <div className='account-verify-container'>
      <div className='account-verify-title'>Account Verification</div>
      <div>
        <VerificationMessage
          resetStatus={resetStatus}
          isFailed={isFailed}
          handleResendVerificationEmail={handleResendVerificationEmail}
        />
      </div>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </div>
  );
};
