import { useState, useRef, useContext, useEffect } from 'react';
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
import { grid } from '@chakra-ui/react';

interface NoteInfoProps {
  file: File | null;
  category: number | '';
  subject: number | '';
  type: number | '';
  name: string | '';
}

interface UploadNoteProps {
  options: OptionsProps | null;
  saveNote: (note: NoteInfoProps) => void;
}

export const UploadNote = ({ options, saveNote }: UploadNoteProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
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
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = Object.values(validInputTip).every((value) => Boolean(value));
    setValidInput(valid);

    if (valid) {
      saveNote({
        file: selectedFile,
        category: category,
        subject: subject,
        type: type,
        name: documentName,
      });
    }

    setExpanded(false);
  };

  const gridStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '0 !important',
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div style={{ width: '50vw' }}>
        <form onSubmit={handleSave}>
          <Badge
            badgeContent={
              validInput ? (
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
                      <Typography key='Save your changes' fontSize={'100%'}>
                        Save your changes
                      </Typography>
                    </Box>
                  }
                >
                  <ErrorIcon color='error' />
                </Tooltip>
              )
            }
            sx={{ width: '50vw' }}
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
                  onChange={(event) => setDocumentName(event.target.value)}
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
                      onChange={(newValue) => setCategory(newValue || 0)}
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
                      onChange={(newValue) => setSubject(newValue || 0)}
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
                      onChange={(newValue) => setType(newValue || 0)}
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
                  <Grid
                    container
                    item
                    sx={{
                      ...gridStyles,
                      margin: '2%',
                    }}
                  >
                    <Button type='submit' variant='contained' color='success'>
                      Save Changes
                    </Button>
                  </Grid>
                </Box>
              </Collapse>
            </Grid>
          </Badge>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default UploadNote;
export type { NoteInfoProps };
