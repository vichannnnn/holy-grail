import { useEffect, forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateTypeDetails, DataTypeEnum } from '@features';
import { DeveloperAddTypeValidation } from '@forms/validation';
import { TextField } from '@mui/material';

interface EditPropertiesFormProps {
  onSubmit: SubmitHandler<UpdateTypeDetails>;
  type: DataTypeEnum;
  initialData: {
    id: number;
    name: string;
  };
}

export const EditPropertiesForm = forwardRef<HTMLFormElement, EditPropertiesFormProps>(
  ({ onSubmit, type, initialData }, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<UpdateTypeDetails>({
      resolver: yupResolver(DeveloperAddTypeValidation),
    });

    useEffect(() => {
      setValue('name', initialData.name);
    }, [initialData.name, setValue]);

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
