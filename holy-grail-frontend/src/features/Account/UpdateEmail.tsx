import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertProps, AlertToast } from '@components';
import { ChangeEmailDetails } from '@features';
import { ChangeEmailValidation } from '@forms/validation';
import { AuthContext, MediaQueryContext } from '@providers';
import { Typography, TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

export const UpdateEmail = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangeEmailValidation),
  });

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
        {isDesktop ? (
          <>
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
          </>
        ) : null}

        <Typography sx={{ fontWeight: 'bold' }}>New Email</Typography>
        <form onSubmit={handleSubmit(handleUpdateEmail)} style={{ width: '100%' }} id='emailForm'>
          <TextField
            sx={{ width: '100%' }}
            label='Email'
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
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
          disabled={Object.keys(errors).length !== 0}
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
