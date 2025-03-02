import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Stack } from '@mui/material';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { UpdateEmailDetails, updateEmail } from '@api/auth';

import { TextField } from '@components/TextField';

import { AuthContext } from '@providers/AuthProvider';

import { UpdateEmailValidation } from '@utils/forms';

import { FormProps } from '@forms/types';

export const UpdateEmail = ({ onSubmitSuccess, onSubmitFailure, formId }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmailDetails>({ resolver: yupResolver(UpdateEmailValidation) });

  const { fetchUser } = useContext(AuthContext);

  const handleUpdateEmail = async (formData: UpdateEmailDetails) => {
    try {
      onSubmitFailure(null);
      await updateEmail(formData);
      onSubmitSuccess();

      fetchUser();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 422) {
        onSubmitFailure(
          'You have entered an invalid email format. Please check your email address.',
        );
      } else if (axiosError.response && axiosError.response.status === 400) {
        onSubmitFailure("The email address you\'ve entered is already in use.");
      }
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(handleUpdateEmail)}>
      <Stack direction='column' spacing={2}>
        <FormControl id='new_email' className='flex flex-row gap-4 items-center'>
          <TextField
            type='text'
            label='New Email'
            error={Boolean(errors.new_email)}
            helperText={errors.new_email?.message}
            {...register('new_email')}
            required
          />
        </FormControl>
      </Stack>
    </form>
  );
};
