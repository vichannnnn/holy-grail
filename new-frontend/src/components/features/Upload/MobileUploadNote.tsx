import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { SubjectType, fetchAllSubjects, fetchCategory } from '@api/library';

import { Combobox } from '@components/Combobox';
import { DropdownMenuItem } from '@components/DropdownMenuItem';

import { UploadNoteProps } from '@features/Upload/types';

import { AuthContext } from '@providers/AuthProvider';

export const MobileUploadNote = ({
  options,
  errors,
  control,
  field,
  index,
  watch,
  deleteNote,
  mirrorNote,
  resetSubject,
  totalNotesCount,
}: UploadNoteProps) => {
  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const { user } = useContext(AuthContext);
  const categoryValue = watch(`notes.${index}.category`);

  // TODO: Need to separate the component into a common one

  const fetchSubjectsForCategory = async (categoryId: number) => {
    return fetchCategory({
      category_id: categoryId,
    })
      .then((categoryData) => fetchAllSubjects(categoryData.id))
      .then((subjects) => {
        setSubjectsData(
          subjects.map((subject: SubjectType) => ({
            id: subject.id,
            name: subject.name,
          })),
        );
        return subjects;
      });
  };

  useEffect(() => {
    if (categoryValue && categoryValue !== 0) {
      fetchSubjectsForCategory(Number(categoryValue));
    }
    resetSubject(index);
  }, [categoryValue]);

  return (
    <div className='w-[90vw]'>
      <div className='border border-black dark:border-white rounded-[10px]'>
        <div className='mx-6 my-6 flex flex-row justify-between'>
          <p className='font-bold'>{field.file.name}</p>
          <div className='flex flex-row'>
            <MoreHorizIcon onClick={(event) => setAnchorEl(event.currentTarget)} />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <Controller
            name={`notes.${index}.name`}
            control={control}
            defaultValue={field.name}
            render={({ field }) => (
              <TextField
                className='w-[90%]'
                label='Document Name'
                placeholder={`Enter document name (eg. ${user?.username || 'anonymous'}'s Notes)`}
                variant='outlined'
                value={field.value}
                onChange={field.onChange}
                error={Boolean(errors && errors.name)}
                helperText={errors && errors.name ? errors.name.message : ' '}
              />
            )}
          />
          <Controller
            name={`notes.${index}.category`}
            control={control}
            defaultValue={field.category}
            render={({ field }) => (
              <Combobox
                className='w-[90%]'
                label='Category'
                value={field.value}
                onChange={async (newValue) => {
                  field.onChange(newValue);
                }}
                options={
                  options?.categories.map((category) => ({
                    id: category.id,
                    name: category.name,
                  })) ?? []
                }
                error={Boolean(errors && errors.category)}
                helperText={errors && errors.category ? errors.category.message : ' '}
              />
            )}
          />
          <Controller
            name={`notes.${index}.subject`}
            control={control}
            defaultValue={field.subject}
            render={({ field }) => (
              <Combobox
                className='w-[90%]'
                label='Subject'
                value={field.value}
                onChange={field.onChange}
                options={subjectsData}
                disabled={!categoryValue || categoryValue === 0}
                error={Boolean(errors && errors.subject)}
                helperText={errors && errors.subject ? errors.subject.message : ' '}
              />
            )}
          />
          <Controller
            name={`notes.${index}.type`}
            control={control}
            defaultValue={field.type}
            render={({ field }) => (
              <Combobox
                className='w-[90%]'
                label='Type'
                value={field.value}
                onChange={field.onChange}
                options={
                  options?.types.map((type) => ({
                    id: type.id,
                    name: type.name,
                  })) ?? []
                }
                error={Boolean(errors && errors.type)}
                helperText={errors && errors.type ? errors.type.message : ' '}
              />
            )}
          />
          <Controller
            name={`notes.${index}.year`}
            control={control}
            defaultValue={field.year}
            render={({ field }) => (
              <Combobox
                className='w-[90%]'
                label='Year'
                value={field.value ?? ''}
                onChange={field.onChange}
                options={
                  options?.years.map((year) => ({
                    id: year.id,
                    name: year.name,
                  })) ?? []
                }
                helperText=' '
              />
            )}
          />
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <DropdownMenuItem
          key='Mirror properties to all other notes'
          disabled={totalNotesCount <= 1}
          className='bg-transparent box-border outline-1 outline-transparent transition-all duration-200 ease-in hover:bg-[#e9e9e9] hover:outline-transparent'
          onClick={() => {
            mirrorNote();
            setAnchorEl(null);
          }}
        >
          Mirror properties to all other notes
        </DropdownMenuItem>

        <DropdownMenuItem
          key='Delete this field'
          className='bg-transparent box-border outline-1 outline-transparent transition-all duration-200 ease-in hover:bg-[#e9e9e9] hover:outline-transparent'
          onClick={() => {
            deleteNote();
            setAnchorEl(null);
          }}
        >
          Delete this field
        </DropdownMenuItem>
      </Menu>
    </div>
  );
};
