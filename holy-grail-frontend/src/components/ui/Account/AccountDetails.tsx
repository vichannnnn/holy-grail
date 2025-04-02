import { Mail, Password, Person } from '@mui/icons-material';
import { useContext } from 'react';

import { SectionBox, VerificationSection } from '@components/Account';
import { Button } from '@components/Button';
import { TextField } from '@components/TextField';

import { User } from '@providers/AuthProvider';
import { MediaQueryContext } from '@providers/MediaQueryProvider';
import { useToast } from '@providers/ToastProvider';

import { UpdateEmail as UpdateEmailForm } from '@forms/UpdateEmail';
import { UpdatePassword as UpdatePasswordForm } from '@forms/UpdatePassword';
import { FormEnum } from '@forms/types';

interface AccountDetailsProps {
  user: User;
}

export const AccountDetails = ({ user }: AccountDetailsProps) => {
  const { showToast } = useToast();
  const { isSmall, isMedium, isLarge, isXLarge, is2XLarge } = useContext(MediaQueryContext);

  let width: string;

  if (is2XLarge) {
    width = 'w-1/2';
  } else if (isXLarge) {
    width = 'w-1/2';
  } else if (isLarge) {
    width = 'w-1/2';
  } else if (isMedium) {
    width = 'w-3/5';
  } else if (isSmall) {
    width = 'w-5/6';
  } else {
    width = 'w-5/6';
  }

  const handleUpdateEmailSubmitFailure = (errorMessage: string | null) => {
    if (errorMessage) {
      showToast({ severity: 'warning', description: errorMessage });
    }
  };

  const handleUpdatePasswordSubmitFailure = (errorMessage: string | null) => {
    if (errorMessage) {
      showToast({ severity: 'warning', description: errorMessage });
    }
  };

  const handleUpdateEmailSubmitSuccess = () => {
    showToast({
      severity: 'success',
      description: 'A verification email has been sent to your registered email.',
    });
  };

  const handleUpdatePasswordSubmitSuccess = () => {
    showToast({
      severity: 'success',
      description: 'Your password has been successfully updated.',
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <SectionBox icon={<Person className='mr-2' />} title='Account Information'>
        <p>Username</p>
        <TextField className={width} type='text' value={user.username} />
        <p className='text-sm mt-1'>Your username cannot be changed once created.</p>
        <h3 className='mt-4 mb-2'>
          Account verification status
          <VerificationSection verified={user.verified} />
        </h3>
      </SectionBox>

      <SectionBox icon={<Mail className='mr-2' />} title='Update your email address'>
        <p>
          Your current email address is <b>{user.email}</b>.
        </p>
        <UpdateEmailForm
          onSubmitSuccess={handleUpdateEmailSubmitSuccess}
          onSubmitFailure={handleUpdateEmailSubmitFailure}
          formId={FormEnum.UPDATE_EMAIL_FORM_ID}
        />
        <Button
          className='mt-4'
          sx={{
            color: 'black',
            backgroundColor: '#FFA5A5',
            '&:hover': {
              backgroundColor: '#cc8484',
              border: 'none',
            },
          }}
          form={FormEnum.UPDATE_EMAIL_FORM_ID}
          type='submit'
        >
          Save
        </Button>
      </SectionBox>

      <SectionBox icon={<Password className='mr-2' />} title='Change your password'>
        <p>Enter your current password and the new password you want to change to.</p>
        <UpdatePasswordForm
          onSubmitSuccess={handleUpdatePasswordSubmitSuccess}
          onSubmitFailure={handleUpdatePasswordSubmitFailure}
          formId={FormEnum.UPDATE_PASSWORD_FORM_ID}
        />
        <Button
          className='mt-4'
          sx={{
            color: 'black',
            backgroundColor: '#FFA5A5',
            '&:hover': {
              backgroundColor: '#cc8484',
              border: 'none',
            },
          }}
          form={FormEnum.UPDATE_PASSWORD_FORM_ID}
          type='submit'
        >
          Save
        </Button>
      </SectionBox>
    </div>
  );
};
