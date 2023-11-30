import { FormEventHandler, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Combobox } from '@components';
import { DataTypeKey, AddSubjectDetails } from '@features';
import { DeveloperAddSubjectValidation } from '@forms/validation';
import { TextField } from '@mui/material';
import { CategoryType } from '@api/library';

interface AddSubjectFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  type: DataTypeKey | null;
}

export const AddSubjectForm = ({ onSubmit, type }: AddSubjectFormProps) => {
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSubjectDetails>({
    resolver: yupResolver(DeveloperAddSubjectValidation),
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name='category_id'
        control={control}
        render={({ field }) => (
          <Combobox
            label='Select a category'
            options={categoryData}
            onChange={(newValue) => field.onChange(newValue)}
            value={field.value}
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
};
