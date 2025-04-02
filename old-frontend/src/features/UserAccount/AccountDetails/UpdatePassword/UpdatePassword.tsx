import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePassword, UpdatePasswordDetails } from '@api/auth';
import { AlertProps, AlertToast, PasswordValidation, Button } from '@components';
import { MediaQueryContext } from '@providers';
import { UpdatePasswordValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import { TextField, FormControl } from '@mui/material';
import '../AccountDetails.css';

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
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className={isDesktop ? 'update-details-grid' : 'update-details-grid-mobile'}>
          <a className='account-details-title'>Current Password</a>
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

          <a className='account-details-title'>New Password</a>
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

          <a className='account-details-title'>Repeat Password</a>
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
        <div className='password-validation-container'>
          <PasswordValidation
            password={watch('password')}
            repeatPassword={watch('repeat_password')}
          />
        </div>
        <div className='change-password-button-container'>
          <Button type='submit'>Save Password</Button>
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
