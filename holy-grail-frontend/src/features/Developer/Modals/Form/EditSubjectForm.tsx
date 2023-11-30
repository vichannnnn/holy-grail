import { useEffect, forwardRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DropdownMenuItem } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateSubjectDetails } from '@features';
import { DeveloperAddSubjectValidation } from '@forms/validation';
import { TextField } from '@mui/material';
import { CategoryType, fetchAllCategories } from '@api/library';

interface EditSubjectFormProps {
  onSubmit: SubmitHandler<UpdateSubjectDetails>;
  initialData: {
    id: number;
    name: string;
    category: CategoryType;
  };
}

export const EditSubjectForm = forwardRef<HTMLFormElement, EditSubjectFormProps>(
  ({ onSubmit, initialData }, ref) => {
    const {
      register,
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
    } = useForm<UpdateSubjectDetails>({
      resolver: yupResolver(DeveloperAddSubjectValidation),
    });
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
      const getAllCategories = async () => {
        const fetchedCategories = await fetchAllCategories();
        setCategories(fetchedCategories);
      };
      getAllCategories();
    }, []);

    useEffect(() => {
      setValue('name', initialData.name);
      setValue('category_id', initialData.category.id);
    }, [initialData.name, initialData.category.id, setValue]);

    console.log(watch('category_id'));
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
          defaultValue={initialData.category.id}
          render={({ field }) => (
            <TextField
              {...field}
              select
              margin='dense'
              label={<span style={{ textTransform: 'capitalize' }}>category</span>}
              error={Boolean(errors && errors.category_id)}
              helperText={errors && errors.category_id ? errors.category_id.message : ''}
              fullWidth
            >
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} value={category.id}>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          {...register('name', { required: true })}
          autoFocus
          margin='dense'
          label={<span style={{ textTransform: 'capitalize' }}>subject</span>}
          type='text'
          error={Boolean(errors && errors.name)}
          helperText={errors && errors.name ? errors.name.message : ''}
          fullWidth
        />
      </form>
    );
  },
);
