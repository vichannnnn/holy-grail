import { useState, useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { fetchCategory, SubjectType, fetchAllSubjects } from '@api/library';
import { Combobox, DropdownMenuItem } from '@components';
import { UploadNoteProps } from '@features';
import { AuthContext } from '@providers';
import { TextField, Grid, Collapse, Box, Menu } from '@mui/material';
import { NoteOptionsIcon } from './Icons';
import { ExpandCollapse } from './View';
import './DesktopUploadNote.css';

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
    <div className='desktop-upload-note-container'>
      <div className='single-note-container'>
        <div className='file-name-header-container'>
          <a>{field.file.name}</a>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: '16px' }}>
            <ExpandCollapse expanded={expanded} onClick={handleExpansion} />
            <NoteOptionsIcon onClick={(event) => setAnchorEl(event.currentTarget)} />
          </div>
        </div>
        <div>
          <Collapse in={expanded} timeout='auto' unmountOnExit className='collapsible-grid'>
            <Box className='outer-note-box'>
              <Box className='inner-note-box'>
                <Grid container item className='document-name-grid-container'>
                  <Controller
                    name={`notes.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className='document-name-text-field'
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

                <Grid container item className='combobox-container-desktop'>
                  <Controller
                    name={`notes.${index}.category`}
                    control={control}
                    defaultValue={field.category}
                    render={({ field }) => (
                      <Combobox
                        className='note-combobox'
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
                        className='note-combobox'
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
                        className='note-combobox'
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
                        className='note-combobox'
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
          className='upload-item-options'
          onClick={() => {
            mirrorNote();
            setAnchorEl(null);
          }}
        >
          Mirror properties to all other notes
        </DropdownMenuItem>

        <DropdownMenuItem
          key='Delete this field'
          className='upload-item-options'
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
