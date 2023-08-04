import { useContext, useState } from 'react';
import { updateEmail } from '@api/auth';
import { getUser } from '@api/auth';
import { UpdateEmailDetails } from '@api/auth';
import { Typography, Button, TextField, FormControl } from '@mui/material';
import { AuthContext, MediaQueryContext } from '@providers';
import { AlertProps, AlertToast } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEmailValidation } from '@forms/validation';
import { useForm } from 'react-hook-form';
import './account.css';

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
    <form onSubmit={handleSubmit(handleUpdateEmail)} id='emailForm' className='update-outer-div'>
      <div className={isDesktop ? 'update-grid' : 'update-grid-mobile'}>
        <Typography sx={{ fontWeight: 'bold' }}>Username</Typography>
        <Typography>{user?.username}</Typography>
        <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{user?.email}</Typography>
          {isDesktop ? (
            <Button
              variant='contained'
              color='primary'
              sx={{ textTransform: 'capitalize' }}
              onClick={changeEmailClick}
            >
              Change Email
            </Button>
          ) : null}
        </div>
        <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
        <Typography sx={{ color: user?.verified ? 'green' : 'red' }}>
          {user?.verified ? 'Verified' : 'Unverified'}
        </Typography>
        {!isDesktop ? (
          <>
            <Typography sx={{ fontWeight: 'bold' }}>New Email</Typography>
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
              <Button
                variant='contained'
                color='info'
                type='submit'
                form='emailForm'
                disabled={Object.keys(errors).length !== 0}
                sx={{ textTransform: 'capitalize', width: '7vw' }}
              >
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
