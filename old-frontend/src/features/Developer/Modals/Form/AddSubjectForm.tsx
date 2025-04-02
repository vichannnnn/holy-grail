import { forwardRef, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryType, fetchLibraryTypes } from '@api/library';
import { Combobox } from '@components';
import { AddSubjectDetails } from '@features';
import { DeveloperAddSubjectValidation } from '@forms/validation';
import { TextField } from '@mui/material';

interface AddSubjectFormProps {
  onSubmit: SubmitHandler<AddSubjectDetails>;
}

export const AddSubjectForm = forwardRef<HTMLFormElement, AddSubjectFormProps>(
  ({ onSubmit }, ref) => {
    const [categoryData, setCategoryData] = useState<CategoryType[]>([]);

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<AddSubjectDetails>({
      resolver: yupResolver(DeveloperAddSubjectValidation),
    });

    useEffect(() => {
      fetchLibraryTypes().then(({ categories }) => {
        setCategoryData(categories);
      });
    }, []);

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
        <Controller
          name='category_id'
          control={control}
          render={({ field }) => (
            <Combobox
              label='Select a category'
              options={categoryData}
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value}
              error={Boolean(errors && errors.category_id)}
              helperText={errors && errors.category_id ? errors.category_id.message : ''}
              fullWidth
            />
          )}
        />
        <TextField
          {...register('name', { required: true })}
          autoFocus
          margin='dense'
          label={<span style={{ textTransform: 'capitalize' }}>Subject</span>}
          type='text'
          error={Boolean(errors && errors.name)}
          helperText={errors && errors.name ? errors.name.message : ''}
        />
      </form>
    );
  },
);
