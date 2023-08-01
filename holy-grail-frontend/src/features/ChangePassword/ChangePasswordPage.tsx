import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePassword, UpdatePasswordDetails } from '@api/auth';
import { AccountForm, AlertToast, AlertProps } from '@components';
import { PasswordValidationBox } from '@features';
import { UpdatePasswordValidation } from '@forms/validation';
import { useNavigation } from '@utils';
import { Button, FormControl, TextField, Stack } from '@mui/material';
import '../SignIn/login.css';

export const ChangePasswordPage = () => {
  const { goToHome } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
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
    <section className='updatePw section container'>
      <AccountForm>
        <div className='login__title'>Update Password</div>
        <div className='section__subtitle'>You can change your password here.</div>

        <form className='login__fields' onSubmit={handleSubmit(handleUpdatePassword)}>
          <Stack direction='column' spacing={4}>
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
            <PasswordValidationBox
              password={watch('password')}
              repeatPassword={watch('repeat_password')}
            />
            <Button type='submit' variant='contained' fullWidth>
              Update Password
            </Button>
          </Stack>
        </form>
      </AccountForm>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </section>
  );
};
