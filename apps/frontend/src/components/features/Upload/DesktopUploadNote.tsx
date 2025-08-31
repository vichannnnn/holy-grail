import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Collapse, Grid, Menu, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { SubjectType, fetchAllSubjects, fetchCategory } from '@api/library';

import { Combobox } from '@components/Combobox';
import { DropdownMenuItem } from '@components/DropdownMenuItem';

import { ExpandCollapse } from '@features/Upload/ExpandCollapse';
import { UploadNoteProps } from '@features/Upload/types';

import { AuthContext } from '@providers/AuthProvider';

export const DesktopUploadNote = ({
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
  const [expanded, setExpanded] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const { user } = useContext(AuthContext);
  const categoryValue = watch(`notes.${index}.category`);

  const handleExpansion = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

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

  useEffect(() => setAnchorEl(null), [expanded]);

  useEffect(() => {
    if (categoryValue && categoryValue !== 0) {
      fetchSubjectsForCategory(Number(categoryValue));
    }
    resetSubject(index);
  }, [categoryValue]);

  return (
    <div className='w-[60vw] flex flex-col'>
      <div className='border border-black dark:border-white rounded-[10px]'>
        <div className='mx-6 my-6 flex flex-row justify-between'>
          <p className='font-bold truncate'>{field.file.name}</p>
          <div className='flex flex-row items-center'>
            <ExpandCollapse expanded={expanded} onClick={handleExpansion} />
            <MoreHorizIcon onClick={(event) => setAnchorEl(event.currentTarget)} />
          </div>
        </div>
        <div>
          <Collapse
            in={expanded}
            timeout='auto'
            unmountOnExit
            className='p-[0_2%_2%_2%] flex-grow flex flex-row'
          >
            <Box className='flex flex-row'>
              <Box className='flex flex-col flex-grow'>
                <Grid
                  container
                  item
                  className='flex flex-row justify-center items-center pr-0 mb-3'
                >
                  <Controller
                    name={`notes.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className='w-full'
                        label='Document Name'
                        placeholder={`Enter document name (eg. ${
                          user?.username || 'anonymous'
                        }'s Notes)`}
                        variant='outlined'
                        value={field.value}
                        onChange={field.onChange}
                        error={Boolean(errors && errors.name)}
                        helperText={errors && errors.name ? errors.name.message : ' '}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  container
                  item
                  className='flex flex-row items-center pr-0 gap-[1vh] justify-evenly'
                >
                  <Controller
                    name={`notes.${index}.category`}
                    control={control}
                    defaultValue={field.category}
                    render={({ field }) => (
                      <Combobox
                        className='flex-1 w-full mb-4'
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
                        className='flex-1 w-full mb-4'
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
                        className='flex-1 w-full mb-4'
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
                        className='flex-1 w-full mb-4'
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
                </Grid>
              </Box>
            </Box>
          </Collapse>
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
          className='m-[3px] bg-transparent rounded-[8px] box-border outline-1 outline-transparent transition-all duration-200 ease-in hover:bg-[#e9e9e9] hover:outline-transparent'
          onClick={() => {
            mirrorNote();
            setAnchorEl(null);
          }}
        >
          Mirror properties to all other notes
        </DropdownMenuItem>

        <DropdownMenuItem
          key='Delete this field'
          className='m-[3px] bg-transparent rounded-[8px] box-border outline-1 outline-transparent transition-all duration-200 ease-in hover:bg-[#e9e9e9] hover:outline-transparent'
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
