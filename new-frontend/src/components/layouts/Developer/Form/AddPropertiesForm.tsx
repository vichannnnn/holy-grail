import { yupResolver } from '@hookform/resolvers/yup';
import { AddTypeDetails, DataTypeEnum } from '@layouts/Developer';
import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DeveloperAddTypeValidation } from '@utils/forms';

interface AddPropertiesFormProps {
  onSubmit: SubmitHandler<AddTypeDetails>;
  type: DataTypeEnum;
}

export const AddPropertiesForm = forwardRef<HTMLFormElement, AddPropertiesFormProps>(
  ({ onSubmit, type }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<AddTypeDetails>({
      resolver: yupResolver(DeveloperAddTypeValidation),
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
          {...register('name', { required: true })}
          autoFocus
          margin='dense'
          label={<span style={{ textTransform: 'capitalize' }}>{type}</span>}
          type='text'
          error={Boolean(errors && errors.name)}
          helperText={errors && errors.name ? errors.name.message : ''}
          fullWidth
        />
      </form>
    );
  },
);

AddPropertiesForm.displayName = 'AddPropertiesForm';
