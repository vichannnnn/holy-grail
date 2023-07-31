import { useState, useContext, useEffect } from 'react';
import { fetchData, fetchCategory, SubjectType } from '@api/library';
import { Combobox } from '@components';
import { UploadNoteProps } from '@features';
import { MediaQueryContext, AuthContext } from '@providers';
import { Typography, TextField, Grid, Collapse, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [subjectsData, setSubjectsData] = useState([]);

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
      name: documentName,
      valid: valid,
    });
    setServerValidationError(false);
  }, [category, subject, type, documentName]);

  const gridStyles = {
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '0 !important',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div style={{ width: isDesktop ? '60vw' : '90vw' }}>
        <Grid
          container
          sx={{
            border: serverValidationError
              ? '1px solid red'
              : validInput
              ? '1px solid green'
              : '1px solid black',
            borderRadius: '10px',
          }}
        >
          <Grid
            container
            item
            wrap='nowrap'
            sx={{
              ...gridStyles,
              gap: '2%',
              justifyContent: 'space-between',
              margin: '1%',
            }}
          >
            <Typography noWrap sx={{ marginLeft: '4%' }}>
              {fileName}
            </Typography>
            {isDesktop ? (
              <IconButton
                sx={{ marginLeft: 'auto', display: isDesktop ? null : 'none' }}
                onClick={() => setExpanded(!expanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            ) : (
              <IconButton onClick={deleteNote} sx={{ flexGrow: 0 }}>
                <DeleteIcon color='error' />
              </IconButton>
            )}
          </Grid>

          <Collapse
            in={isDesktop ? expanded : true}
            timeout='auto'
            unmountOnExit
            sx={{ padding: '0 1% 1% 1%', flexGrow: 1, display: 'flex', flexDirection: 'row' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2% 0 2% 2%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3vh', flexGrow: 1 }}>
                <Grid container item sx={gridStyles}>
                  <TextField
                    sx={{ flexGrow: 1 }}
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
                      <Typography sx={{ fontSize: '100%' }}>{error}</Typography>
                    ))}
                  />
                </Grid>
                <Grid
                  container
                  item
                  sx={{
                    ...gridStyles,

                    gap: '1vh',
                    justifyContent: 'space-evenly',
                    flexDirection: isDesktop ? 'row' : 'column',
                  }}
                >
                  <Combobox
                    style={{ flex: '1 1 0', width: '100%' }}
                    label='Category'
                    value={category || 0}
                    onChange={async (newValue) => {
                      setCategory(newValue || 0);
                      if (newValue === '') return;
                      const categoryData = await fetchCategory({ category_id: Number(newValue) });
                      const data = await fetchData({ category_id: categoryData.id });
                      setSubjectsData(
                        data.subjects.map((subject: SubjectType) => ({
                          id: subject.id,
                          name: subject.name,
                        })),
                      );
                    }}
                    options={
                      options?.categories.map((category) => ({
                        id: category.id,
                        name: category.name,
                      })) || []
                    }
                    error={!validChecks.category}
                  />

                  <Combobox
                    style={{ flex: '1 1 0', width: '100%' }}
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
                    style={{ flex: '1 1 0', width: '100%' }}
                    label='Type'
                    value={type || 0}
                    onChange={(newValue) => {
                      setType(newValue || 0);
                    }}
                    options={options?.types.map((type) => ({ id: type.id, name: type.name })) || []}
                    error={!validChecks.type}
                  />
                </Grid>
              </Box>
              <Box sx={{ marginLeft: '2%' }}>
                <IconButton
                  onClick={deleteNote}
                  sx={{ flexGrow: 0, display: isDesktop ? null : 'none' }}
                >
                  <DeleteIcon color='error' />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Grid>
      </div>
    </div>
  );
};
