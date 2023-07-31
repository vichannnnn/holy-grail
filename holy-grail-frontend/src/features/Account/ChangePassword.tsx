import { useState } from 'react';
import { PasswordValidationBox, ChangePasswordDetails } from '@features';
import { AlertProps, AlertToast } from '@components';
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordValidation } from '@forms/validation';
import { updatePassword } from '@api/auth';
import * as Yup from 'yup';

export const ChangePassword = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const initialiseValidator = (schema: Yup.AnyObjectSchema, defaultValues: Object) => {
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: { ...defaultValues },
    });
    return { register, watch, handleSubmit, errors };
  };

  const passwordValidator = initialiseValidator(ChangePasswordValidation, {});

  const handleUpdatePassword = async (formData: ChangePasswordDetails) => {
    const { success, message } = await updatePassword(
      formData.currentPassword,
      formData.newPassword,
      formData.repeatPassword,
    );

    if (success) {
      const alertContent: AlertProps = {
        title: 'Password successfully updated.',
        description: message,
        severity: 'success',
      };
      setAlertContent(alertContent);
      setOpenAlert(true);
    } else {
      const alertContent: AlertProps = {
        title: 'Password update failed.',
        description: message,
        severity: 'error',
      };
      setAlertContent(alertContent);
      setOpenAlert(true);
    }
  };

  return (
    <>
      <form
        onSubmit={passwordValidator.handleSubmit(handleUpdatePassword)}
        style={{ width: '100%' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.2fr auto',
            gridRowGap: '3vh',
            alignItems: 'center',
            marginTop: '2vh',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Current Password</Typography>
          <TextField
            label='Password'
            {...passwordValidator.register('currentPassword')}
            error={Boolean(passwordValidator.errors.currentPassword)}
            helperText={passwordValidator.errors.currentPassword?.message as String}
            required
          />

          <Typography sx={{ fontWeight: 'bold' }}>New Password</Typography>
          <TextField
            label='Password'
            {...passwordValidator.register('newPassword')}
            error={Boolean(passwordValidator.errors.newPassword)}
            helperText={passwordValidator.errors.newPassword?.message as String}
            required
          />

          <Typography sx={{ fontWeight: 'bold' }}>Repeat Password</Typography>
          <TextField
            label='Password'
            {...passwordValidator.register('repeatPassword')}
            error={Boolean(passwordValidator.errors.repeatPassword)}
            helperText={passwordValidator.errors.repeatPassword?.message as String}
            required
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2vw',
            alignItems: 'center',
            marginTop: '2vh',
          }}
        >
          <PasswordValidationBox
            password={passwordValidator.watch('newPassword')}
            repeatPassword={passwordValidator.watch('repeatPassword')}
          />
          <Button
            variant='contained'
            color='info'
            type='submit'
            disabled={Object.keys(passwordValidator.errors).length !== 0}
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
