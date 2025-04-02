import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Stack } from '@mui/material';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { PasswordField, TextField } from '@components/TextField';

import { AuthContext } from '@providers/AuthProvider';

import { SignInValidation } from '@utils/forms';

import { FormProps } from '@forms/types';

export interface LogInDetails {
  username: string;
  password: string;
}

export const AccountLoginForm = ({ onSubmitSuccess, onSubmitFailure, formId }: FormProps) => {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInDetails>({
    resolver: yupResolver(SignInValidation),
  });

  const handleLogin = async (formData: LogInDetails) => {
    try {
      onSubmitFailure(null);
      await login(formData);
      onSubmitSuccess();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (
        (axiosError.response && axiosError.response.status === 401) ||
        (axiosError.response && axiosError.response.status === 422)
      ) {
        onSubmitFailure('You have entered an invalid username or password');
      } else {
        onSubmitFailure(axiosError.message);
      }
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit(handleLogin)}>
        <Stack direction='column' spacing={2}>
          <FormControl id='username'>
            <TextField
              label='Username'
              type='text'
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              {...register('username')}
              required
            />
          </FormControl>
          <FormControl id='password'>
            <PasswordField
              label='Password'
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password')}
              required
            />
          </FormControl>
        </Stack>
      </form>
    </>
  );
};
