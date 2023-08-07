import { useState, useContext, useEffect, ElementType } from 'react';
import { fetchCategory, SubjectType, fetchAllSubjects } from '@api/library';
import { Combobox } from '@components';
import { UploadNoteProps } from '@features';
import { MediaQueryContext, AuthContext } from '@providers';
import { Typography, TextField, Grid, Collapse, Box } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UploadNote.css';

export const UploadNote = ({
  fileName,
  options,
  saveNoteUpdates,
  deleteNote,
  errors,
}: UploadNoteProps) => {
  const [documentName, setDocumentName] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [subject, setSubject] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);

  const [validInput, setValidInput] = useState<boolean>(false);

  const validChecks = {
    category: category !== 0,
    subject: subject !== 0,
    type: type !== 0,
    name: documentName !== '',
  };

  const [expanded, setExpanded] = useState<boolean>(true);
  const [serverValidationError, setServerValidationError] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);

  const renderExpandIcon = () => {
    const IconComponent: ElementType = expanded ? ExpandLess : ExpandMore;
    return (
      <IconComponent
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        sx={{ marginLeft: 'auto', display: isDesktop ? null : 'none' }}
        onClick={() => setExpanded(!expanded)}
      />
    );
  };

  useEffect(() => {
    if (errors) {
      setServerValidationError(true);
    }
  }, [errors]);

  useEffect(() => {
    const valid = Object.values(validChecks).every((value) => Boolean(value));
    setValidInput(valid);
    saveNoteUpdates({
      category: category,
      subject: subject,
      type: type,
      year: year,
      name: documentName,
      valid: valid,
    });
    setServerValidationError(false);
  }, [category, subject, type, year, documentName]);

  let borderColor;
  if (serverValidationError) {
    borderColor = '1px solid red';
  } else if (validInput) {
    borderColor = '1px solid green';
  } else {
    borderColor = '1px solid black';
  }

  return (
    <div className='upload-note-div'>
      <div style={{ width: isDesktop ? '60vw' : '90vw' }}>
        <Grid
          container
          sx={{
            border: borderColor,
            borderRadius: '10px',
          }}
        >
          <Grid container item className={expanded ? 'grid-container' : 'grid-container-collapsed'}>
            <Typography className={expanded ? 'file-name-expanded' : 'file-name-collapsed'}>
              {fileName}
            </Typography>

            {isDesktop ? (
              renderExpandIcon()
            ) : (
              <DeleteIcon color='error' onClick={deleteNote} sx={{ flexGrow: 0 }} />
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
                <Grid container item className='document-name-grid-container'>
                  <TextField
                    className='document-name-text-field'
                    label='Document Name'
                    placeholder={`Enter document name (eg. ${
                      user?.username || 'anonymous'
                    }'s Notes)`}
                    variant='outlined'
                    value={documentName}
                    onChange={(event) => {
                      setDocumentName(event.target.value);
                    }}
                    error={!validChecks.name || errors ? errors?.length !== 0 : false}
                    helperText={errors?.map((error) => (
                      <Typography className='error-text'>{error}</Typography>
                    ))}
                  />
                </Grid>
                <Grid
                  container
                  item
                  className={isDesktop ? 'combobox-container-desktop' : 'combobox-container-mobile'}
                >
                  <Combobox
                    className='note-combobox'
                    label='Category'
                    value={category || 0}
                    onChange={async (newValue) => {
                      setCategory(newValue || 0);
                      if (newValue === '') return;
                      const categoryData = await fetchCategory({ category_id: Number(newValue) });
                      const subjects = await fetchAllSubjects(categoryData.id);
                      setSubjectsData(
                        subjects.map((subject: SubjectType) => ({
                          id: subject.id,
                          name: subject.name,
                        })),
                      );
                    }}
                    options={
                      options?.categories.map((category) => ({
                        id: category.id,
                        name: category.name,
                      })) ?? []
                    }
                    error={!validChecks.category}
                  />
                  <Combobox
                    className='note-combobox'
                    label='Subject'
                    value={subject || 0}
                    onChange={(newValue) => {
                      setSubject(newValue || 0);
                    }}
                    options={
                      subjectsData ||
                      options?.subjects.map((subject) => ({
                        id: subject.id,
                        name: subject.name,
                      })) ||
                      []
                    }
                    error={category !== 0 && !validChecks.subject}
                    disabled={category === 0}
                  />
                  <Combobox
                    className='note-combobox'
                    label='Type'
                    value={type || 0}
                    onChange={(newValue) => {
                      setType(newValue || 0);
                    }}
                    options={options?.types.map((type) => ({ id: type.id, name: type.name })) ?? []}
                    error={!validChecks.type}
                  />
                  <Combobox
                    className='note-combobox'
                    label='Year'
                    value={year || 0}
                    onChange={(newValue) => {
                      setYear(newValue || 0);
                    }}
                    options={options?.years.map((year) => ({ id: year.id, name: year.name })) ?? []}
                  />
                </Grid>
              </Box>
              <Box className='note-form-box'>
                <DeleteIcon
                  color='error'
                  style={{ cursor: 'pointer' }}
                  className={isDesktop ? 'delete-icon-desktop' : 'delete-icon-mobile'}
                  onClick={deleteNote}
                />
              </Box>
            </Box>
          </Collapse>
        </Grid>
      </div>
    </div>
  );
};
