import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUser, updateEmail, UpdateEmailDetails } from '@api/auth';
import { AlertProps, AlertToast } from '@components';
import { ChangeEmailValidation } from '@forms/validation';
import { AuthContext, MediaQueryContext } from '@providers';
import { Typography, TextField, Button, FormControl } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import './account.css';

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
          <form
            onSubmit={handleSubmit(handleUpdateEmail)}
            id='emailForm'
            className='update-outer-div'
          >
            <div className='update-grid'>
              <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
              <Typography>{user?.email}</Typography>
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
              <Typography sx={{ fontWeight: 'bold' }}>Status</Typography>
              <Typography
                sx={{
                  color: user?.verified ? 'green' : 'red',
                }}
              >
                {user?.verified ? 'Verified' : 'Unverified'}
              </Typography>
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
