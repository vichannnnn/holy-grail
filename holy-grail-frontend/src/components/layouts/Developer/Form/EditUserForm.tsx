import { yupResolver } from '@hookform/resolvers/yup';
import { RoleEnum, UpdateUserDetails } from '@layouts/Developer';
import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { DropdownMenuItem } from '@components/DropdownMenuItem';

import { User } from '@providers/AuthProvider';

import { DeveloperAddUserValidation } from '@utils/forms';

interface EditUserFormProps {
  onSubmit: SubmitHandler<UpdateUserDetails>;
  initialData: User;
}

export const EditUserForm = forwardRef<HTMLFormElement, EditUserFormProps>(
  ({ onSubmit, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<UpdateUserDetails>({
      defaultValues: { role: initialData.role },
      resolver: yupResolver(DeveloperAddUserValidation),
    });

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        <TextField
          value={initialData.user_id}
          margin='dense'
          label={<span style={{ textTransform: 'capitalize' }}>User ID</span>}
          type='text'
          disabled
          fullWidth
        />
        <TextField
          value={initialData.username}
          margin='dense'
          label={<span style={{ textTransform: 'capitalize' }}>Username</span>}
          type='text'
          disabled
          fullWidth
        />
        <Controller
          name='role'
          control={control}
          defaultValue={initialData.role}
          render={({ field }) => (
            <TextField
              select
              {...field}
              margin='dense'
              label={<span style={{ textTransform: 'capitalize' }}>role</span>}
              error={Boolean(errors && errors.role)}
              helperText={errors && errors.role ? errors.role.message : ''}
              fullWidth
            >
              <DropdownMenuItem value={RoleEnum.USER}>User</DropdownMenuItem>
              <DropdownMenuItem value={RoleEnum.ADMIN}>Admin</DropdownMenuItem>
              <DropdownMenuItem value={RoleEnum.DEVELOPER}>Developer</DropdownMenuItem>
            </TextField>
          )}
        />
      </form>
    );
  },
);

EditUserForm.displayName = 'EditUserForm';
