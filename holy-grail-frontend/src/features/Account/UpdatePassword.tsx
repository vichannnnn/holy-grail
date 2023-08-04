import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updatePassword, UpdatePasswordDetails } from '@api/auth';
import { AlertProps, AlertToast } from '@components';
import { PasswordValidationBox } from '@features';
import { Typography, TextField, Button, FormControl } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdatePasswordValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import './account.css';
import { MediaQueryContext } from '@providers';

export const UpdatePassword = () => {
  const { goToHome } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { isDesktop } = useContext(MediaQueryContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdatePasswordValidation),
  });

  const handleUpdatePassword = async (formData: UpdatePasswordDetails) => {
    const { success, message } = await updatePassword(formData);
    if (success) {
      const alertContentRedirect: AlertProps = {
        title: 'Password successfully updated.',
        description: `You can now log in with your new password.`,
        severity: 'success',
      };

      goToHome({ state: { alertContent: alertContentRedirect } });
    } else {
      setAlertContent({
        title: 'Password update failed.',
        description: message,
        severity: 'error',
      });
      setOpenAlert(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdatePassword)} className='update-outer-div'>
        <div className={isDesktop ? 'update-grid' : 'update-grid-mobile'}>
          <Typography sx={{ fontWeight: 'bold' }}>Current Password</Typography>
          <FormControl id='before-password'>
            <TextField
              type='password'
              label='Current Password'
              error={Boolean(errors.before_password)}
              helperText={errors.before_password?.message}
              {...register('before_password')}
              required
            />
          </FormControl>

          <Typography sx={{ fontWeight: 'bold' }}>New Password</Typography>
          <FormControl id='password'>
            <TextField
              type='password'
              label='New Password'
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password')}
              required
            />
          </FormControl>

          <Typography sx={{ fontWeight: 'bold' }}>Repeat Password</Typography>
          <FormControl id='repeat-password'>
            <TextField
              type='password'
              label='Repeat Password'
              error={Boolean(errors.repeat_password)}
              helperText={errors.repeat_password?.message}
              {...register('repeat_password')}
              required
            />
          </FormControl>
        </div>
        <div className='change-password-button-container'>
          <PasswordValidationBox
            password={watch('password')}
            repeatPassword={watch('repeat_password')}
          />
          <Button
            variant='contained'
            color='info'
            type='submit'
            sx={{ textTransform: 'capitalize' }}
          >
            Save Password
          </Button>
        </div>
      </form>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
