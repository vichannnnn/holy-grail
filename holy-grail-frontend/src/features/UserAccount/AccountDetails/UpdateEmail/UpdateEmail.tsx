import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser, updateEmail, UpdateEmailDetails } from '@api/auth';
import { AlertProps, AlertToast, Button } from '@components';
import { ChangeEmailValidation } from '@forms/validation';
import { AuthContext, MediaQueryContext } from '@providers';
import { TextField, FormControl } from '@mui/material';
import '../AccountDetails.css';

export const UpdateEmail = () => {
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
    <>
      {isDesktop ? (
        <>
          <form onSubmit={handleSubmit(handleUpdateEmail)} id='emailForm'>
            <div className='update-details-grid'>
              <a className='account-details-title'>Email</a>
              <a>{user?.email}</a>
              <a className='account-details-title'>New Email</a>
              <FormControl id='new_email'>
                <TextField
                  label='Email'
                  error={Boolean(errors.new_email)}
                  helperText={errors.new_email?.message}
                  {...register('new_email')}
                  required
                />
              </FormControl>
              <a className='account-details-title'>Status</a>
              <a className={`verified-status ${user?.verified ? 'verified' : 'unverified'}`}>
                {user?.verified ? 'Verified' : 'Unverified'}
              </a>
              <div className='change-email-button-container'>
                <Button type='submit' form='emailForm' disabled={Object.keys(errors).length !== 0}>
                  Save
                </Button>
              </div>
            </div>
          </form>
          <AlertToast
            openAlert={openAlert}
            onClose={() => setOpenAlert(false)}
            alertContent={alertContent}
          />
        </>
      ) : null}
    </>
  );
};
