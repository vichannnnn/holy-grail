import { useState, useContext, ElementType, ReactNode, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { fetchCategory, SubjectType, fetchAllSubjects } from '@api/library';
import { Combobox } from '@components';
import { UploadNoteProps } from '@features';
import { MediaQueryContext, AuthContext } from '@providers';
import { Typography, TextField, Grid, Collapse, Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UploadNote.css';

export const UploadNote = ({
  options,
  errors,
  control,
  field,
  index,
  watch,
  deleteNote,
}: UploadNoteProps) => {
  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);
  const [expanded, setExpanded] = useState<boolean>(true);

  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);
  const categoryValue = watch(`notes.${index}.category`);

  const fetchSubjectsForCategory = async (categoryId: number) => {
    const categoryData = await fetchCategory({
      category_id: categoryId,
    });
    const subjects = await fetchAllSubjects(categoryData.id);
    setSubjectsData(
      subjects.map((subject: SubjectType) => ({
        id: subject.id,
        name: subject.name,
      })),
    );
  };

  useEffect(() => {
    if (categoryValue && categoryValue !== 0) {
      fetchSubjectsForCategory(Number(categoryValue));
    }
  }, [categoryValue]);

  const wrapForMobile = (component: ReactNode) => {
    if (isDesktop) {
      return component;
    }
    return (
      <Grid item xs={12}>
        {component}
      </Grid>
    );
  };

  const renderExpandIcon = () => {
    const IconComponent: ElementType = expanded ? ExpandLess : ExpandMore;
    return (
      <IconComponent
        className={expanded ? 'collapse-icon' : 'expand-icon'}
        sx={{
          display: isDesktop ? null : 'none',
        }}
        onClick={() => setExpanded(!expanded)}
      />
    );
  };

  return (
    <div className='upload-note-div'>
      <div style={{ width: isDesktop ? '60vw' : '90vw' }}>
        <Grid
          container
          sx={{
            border: '1px solid black',
            borderRadius: '10px',
          }}
        >
          <Grid container item className={expanded ? 'grid-container' : 'grid-container-collapsed'}>
            <Typography className={expanded ? 'file-name-expanded' : 'file-name-collapsed'}>
              {field.file.name}
            </Typography>

            {isDesktop ? (
              renderExpandIcon()
            ) : (
              <DeleteIcon
                color='error'
                onClick={deleteNote}
                style={{ position: 'absolute', top: '8px', right: '8px' }}
              />
            )}
          </Grid>

          <Collapse
            in={isDesktop ? expanded : true}
            timeout='auto'
            unmountOnExit
            className='collapsible-grid'
          >
            <Box className='outer-note-box'>
              <Box className='inner-note-box'>
                {isDesktop && (
                  <Grid container item className='document-name-grid-container'>
                    <Controller
                      name={`notes.${index}.name`}
                      control={control}
                      defaultValue={field.name}
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
                )}

                <Grid
                  container
                  item
                  className={isDesktop ? 'combobox-container-desktop' : 'combobox-container-mobile'}
                >
                  {wrapForMobile(
                    <>
                      {!isDesktop && (
                        <Grid container item className='document-name-grid-container'>
                          <Controller
                            name={`notes.${index}.name`}
                            control={control}
                            defaultValue={field.name}
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
                      )}
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
                    </>,
                  )}
                </Grid>
              </Box>
              {isDesktop ? (
                <Box className='note-form-box'>
                  <DeleteIcon
                    color='error'
                    style={{ cursor: 'pointer' }}
                    className={isDesktop ? 'delete-icon-desktop' : 'delete-icon-mobile'}
                    onClick={deleteNote}
                  />
                </Box>
              ) : null}
            </Box>
          </Collapse>
        </Grid>
      </div>
    </div>
  );
};
