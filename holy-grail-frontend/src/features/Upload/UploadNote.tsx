import { useState, useRef, useContext, memo, useEffect } from 'react';
import { OptionsProps } from './UploadPage';
import Combobox from '../Library/Combobox';
import {
  createTheme,
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Grid,
  Collapse,
  IconButton,
  Badge,
  Tooltip,
  Box,
} from '@mui/material';
import MediaQueryContext from '../../providers/MediaQueryProvider';
import AuthContext from '../../providers/AuthProvider';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';

interface NoteInfoProps {
  file: File | null;
  category: number;
  subject: number;
  type: number;
  name: string | '';
}

interface UploadNoteProps {
  options: OptionsProps | null;
  saveNoteUpdates: (note: NoteInfoProps) => void;
  deleteNote: () => void;
}

export const UploadNote = ({ options, saveNoteUpdates, deleteNote }: UploadNoteProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(undefined);
  const [documentName, setDocumentName] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [subject, setSubject] = useState<number>(0);
  const [type, setType] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(false);

  const validInputTip: Object = {
    'Select a file': selectedFile,
    'Choose a category': category,
    'Choose a subject': subject,
    'Choose a type': type,
    'Enter a document name': documentName,
  };

  const [expanded, setExpanded] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { user } = useContext(AuthContext);
  const { isDesktop } = useContext(MediaQueryContext);

  const muiTheme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
          },
        },
      },
    },
  });

  useEffect(() => {
    const valid = Object.values(validInputTip).every((value) => Boolean(value));
    setValidInput(valid);
    saveNoteUpdates({
      file: selectedFile,
      category: category,
      subject: subject,
      type: type,
      name: documentName,
    });
  }, [selectedFile, category, subject, type, documentName]);

  const gridStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '0 !important',
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '10%',
          margin: '1%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Grid sx={gridStyles}>
            {validInput ? (
              <CheckCircleIcon color='success' />
            ) : (
              <Tooltip
                title={
                  <Box>
                    <Typography>Please do the following: </Typography>

                    {Object.entries(validInputTip)
                      .filter(([_, value]) => Boolean(!value))
                      .map(([key, _]) => (
                        <Typography key={key} fontSize={'100%'}>
                          {key}
                        </Typography>
                      ))}
                  </Box>
                }
              >
                <ErrorIcon color='error' />
              </Tooltip>
            )}
          </Grid>
        </div>

        <div style={{ width: '60vw' }}>
          <Badge
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            badgeContent={
              <IconButton onClick={deleteNote}>
                <ClearIcon color='error' />
              </IconButton>
            }
            sx={{ width: '60vw' }}
          >
            <Grid
              container
              sx={{
                border: validInput ? '1px solid green' : '1px solid red',
                borderRadius: '10px',
                paddingRight: '0 !important',
              }}
            >
              <Grid
                container
                item
                sx={{
                  ...gridStyles,
                  gap: '2%',
                }}
              >
                <TextField
                  sx={{ flexGrow: 1, margin: '2% 0 2% 2%' }}
                  required
                  label='Document Name'
                  placeholder={`Enter document name (eg. ${user?.username || 'anonymous'}'s Notes)`}
                  variant='outlined'
                  value={documentName}
                  onChange={(event) => {
                    setDocumentName(event.target.value);
                  }}
                />

                <IconButton
                  sx={{ display: isDesktop ? null : 'none', margin: '2%' }}
                  onClick={() => setExpanded(!expanded)}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
              <Collapse
                in={isDesktop ? expanded : true}
                timeout='auto'
                unmountOnExit
                sx={{ width: '50vw', padding: '0 2% 2% 2%' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                  <Grid
                    container
                    item
                    sx={{
                      ...gridStyles,
                      margin: '1%',
                      gap: '2%',
                    }}
                  >
                    <Combobox
                      style={{ flexGrow: 1 }}
                      label='Category'
                      value={category || 0}
                      onChange={(newValue) => {
                        setCategory(newValue || 0);
                      }}
                      options={
                        options?.categories.map((category) => ({
                          value: category.id,
                          label: category.name,
                        })) || []
                      }
                    />

                    <Combobox
                      style={{ flexGrow: 1 }}
                      label='Subject'
                      value={subject || 0}
                      onChange={(newValue) => {
                        setSubject(newValue || 0);
                      }}
                      options={
                        options?.subjects.map((subject) => ({
                          value: subject.id,
                          label: subject.name,
                        })) || []
                      }
                    />

                    <Combobox
                      style={{ flexGrow: 1 }}
                      label='Type'
                      value={type || 0}
                      onChange={(newValue) => {
                        setType(newValue || 0);
                      }}
                      options={
                        options?.types.map((type) => ({ value: type.id, label: type.name })) || []
                      }
                    />
                  </Grid>
                  <Grid container item sx={gridStyles}>
                    <Typography>{selectedFileName || 'No file selected'}</Typography>
                  </Grid>
                  <Grid container item sx={gridStyles}>
                    <Button
                      onClick={() => {
                        if (fileRef.current) {
                          fileRef.current.click();
                        }
                      }}
                      variant='contained'
                      color='info'
                    >
                      Upload File
                    </Button>
                    <input
                      ref={fileRef}
                      type='file'
                      accept='application/pdf'
                      // , text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          setSelectedFile(event.target.files[0]);
                          setSelectedFileName(event.target.files[0].name);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </Grid>
                </Box>
              </Collapse>
            </Grid>
          </Badge>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadNote;
export type { NoteInfoProps };
