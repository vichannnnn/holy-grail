import { useContext, useState } from 'react';
import { ChangeEmailDetails } from '@features';
import { AlertProps, AlertToast } from '@components';
import { Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEmailValidation } from '@forms/validation';
import { AuthContext } from '@providers';

import * as Yup from 'yup';

export const UpdateEmail = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user } = useContext(AuthContext);

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

  const emailValidator = initialiseValidator(ChangeEmailValidation, { email: user?.email || '' });

  const handleUpdateEmail = async (formData: ChangeEmailDetails) => {
    console.log(formData);
    //TODO: implement endpoint
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.2fr auto',
          gridColumnGap: '10%',
          gridRowGap: '3vh',
          alignItems: 'center',
          marginTop: '2vh',
          width: '100%',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Account Status</Typography>
        <Typography
          sx={{
            color: user?.verified ? 'green' : 'red',
          }}
        >
          {user?.verified ? 'Verified' : 'Unverified'}
        </Typography>

        <Typography sx={{ fontWeight: 'bold' }}>Current Email</Typography>
        <Typography>{user?.email}</Typography>

        <Typography sx={{ fontWeight: 'bold' }}>New Email</Typography>
        <form
          onSubmit={emailValidator.handleSubmit(handleUpdateEmail)}
          style={{ width: '100%' }}
          id='emailForm'
        >
          <TextField
            sx={{ width: '100%' }}
            label='Email'
            {...emailValidator.register('email')}
            error={Boolean(emailValidator.errors.email)}
            helperText={emailValidator.errors.email?.message as String}
            required
          />
        </form>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2vw',
          justifyContent: 'center',
          marginTop: '2vh',
        }}
      >
        <Button
          variant='contained'
          color='info'
          type='submit'
          form='emailForm'
          disabled={Object.keys(emailValidator.errors).length !== 0}
          sx={{ textTransform: 'capitalize', width: '7vw' }}
        >
          Save
        </Button>
      </div>

      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </div>
  );
};
