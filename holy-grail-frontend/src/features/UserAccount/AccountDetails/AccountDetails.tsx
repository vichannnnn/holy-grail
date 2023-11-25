import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser, updateEmail, UpdateEmailDetails } from '@api/auth';
import { AlertProps, AlertToast, Button } from '@components';
import { ChangeEmailValidation } from '@forms/validation';
import { AuthContext, MediaQueryContext } from '@providers';
import { TextField, FormControl } from '@mui/material';
import './AccountDetails.css';

export const AccountDetails = ({ changeEmailClick }: { changeEmailClick?: () => void }) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user, updateUser } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangeEmailValidation),
  });

  const handleUpdateEmail = async (formData: UpdateEmailDetails) => {
    const { success, message } = await updateEmail(formData);
    if (success) {
      const alertContent: AlertProps = {
        title: 'Email successfully updated.',
        description: 'A verification email has been sent to your new email address.',
        severity: 'success',
      };

      setAlertContent(alertContent);
      setOpenAlert(true);
      const updatedUser = await getUser();
      updateUser(updatedUser);
    } else {
      setAlertContent({
        title: 'Email update failed.',
        description: message,
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateEmail)} id='emailForm'>
      <div className={isDesktop ? 'update-details-grid' : 'update-details-grid-mobile'}>
        <a className='account-details-title'>Username</a>
        <a>{user?.username}</a>
        <a className='account-details-title'>Email</a>
        <div className='change-email-button-view'>
          <a>{user?.email}</a>
          {isDesktop ? <Button onClick={changeEmailClick}>Change Email</Button> : null}
        </div>
        <a className='account-details-title'>Status</a>
        <a className={`verified-status ${user?.verified ? 'verified' : 'unverified'}`}>
          {user?.verified ? 'Verified' : 'Unverified'}
        </a>
        {!isDesktop ? (
          <>
            <a>New Email</a>
            <FormControl id='new_email'>
              <TextField
                label='Email'
                error={Boolean(errors.new_email)}
                helperText={errors.new_email?.message}
                {...register('new_email')}
                required
              />
            </FormControl>
            <div className='change-email-button-container'>
              <Button type='submit' form='emailForm' disabled={Object.keys(errors).length !== 0}>
                Save
              </Button>
            </div>
          </>
        ) : null}

        <AlertToast
          openAlert={openAlert}
          onClose={() => setOpenAlert(false)}
          alertContent={alertContent}
        />
      </div>
    </form>
  );
};
