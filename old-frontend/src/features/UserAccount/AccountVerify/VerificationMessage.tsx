import { Link } from '@mui/material';
import './AccountVerifyPage';

interface VerificationMessageProps {
  resetStatus: string | null;
  isFailed: boolean;
  handleResendVerificationEmail: () => void;
}

export const VerificationMessage = ({
  resetStatus,
  isFailed,
  handleResendVerificationEmail,
}: VerificationMessageProps) => {
  if (resetStatus) {
    return <div className='account-form-subtitle'>{resetStatus}</div>;
  } else if (isFailed) {
    return (
      <div className='account-form-subtitle'>
        The account verification link is invalid or has expired. Please click{' '}
        <Link onClick={handleResendVerificationEmail} underline='always'>
          here
        </Link>{' '}
        to send another verification email.
      </div>
    );
  } else {
    return null;
  }
};
