import { useEffect, forwardRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryType, fetchAllCategories } from '@api/library';
import { DropdownMenuItem } from '@components';
import { UpdateSubjectDetails } from '@features';
import { DeveloperAddSubjectValidation } from '@forms/validation';
import { TextField } from '@mui/material';

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
      formState: { errors },
    } = useForm<UpdateSubjectDetails>({
      defaultValues: {
        name: initialData.name,
        category_id: initialData.category.id,
      },
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

    if (categories.length === 0) {
      return <></>;
    }

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
