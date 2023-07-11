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
  Tooltip,
  Box,
} from '@mui/material';
import MediaQueryContext from '../../providers/MediaQueryProvider';
import AuthContext from '../../providers/AuthProvider';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

interface NoteInfoProps {
  category: number;
  subject: number;
  type: number;
  name: string | '';
  valid: boolean;
}

interface UploadNoteProps {
  fileName: string;
  options: OptionsProps | null;
  saveNoteUpdates: (note: NoteInfoProps) => void;
  deleteNote: () => void;
}

export const UploadNote = ({ fileName, options, saveNoteUpdates, deleteNote }: UploadNoteProps) => {
  const [documentName, setDocumentName] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [subject, setSubject] = useState<number>(0);
  const [type, setType] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(false);

  const validInputTip: Object = {
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
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  useEffect(() => {
    const valid = Object.values(validInputTip).every((value) => Boolean(value));
    setValidInput(valid);
    saveNoteUpdates({
      category: category,
      subject: subject,
      type: type,
      name: documentName,
      valid: valid,
    });
  }, [category, subject, type, documentName]);

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
              <CheckCircleIcon sx={{ transform: 'scale(1.5)' }} color='success' />
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
                <ErrorIcon sx={{ transform: 'scale(1.5)' }} color='error' />
              </Tooltip>
            )}
          </Grid>
        </div>

        <div style={{ width: '65vw' }}>
          <Grid
            container
            sx={{
              border: validInput ? '1px solid green' : '1px solid red',
              borderRadius: '10px',
            }}
          >
            <Grid
              container
              item
              sx={{
                ...gridStyles,
                gap: '2%',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ marginLeft: '3%' }}>{fileName}</Typography>

              <IconButton
                sx={{ marginLeft: 'auto', display: isDesktop ? null : 'none', margin: '2%' }}
                onClick={() => setExpanded(!expanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>

            <Collapse
              in={isDesktop ? expanded : true}
              timeout='auto'
              unmountOnExit
              sx={{ padding: '0 2% 2% 2%', flexGrow: 1 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                <Grid container item sx={gridStyles}>
                  <TextField
                    sx={{ flexGrow: 1, margin: '2% 0 2% 0' }}
                    required
                    label='Document Name'
                    placeholder={`Enter document name (eg. ${
                      user?.username || 'anonymous'
                    }'s Notes)`}
                    variant='outlined'
                    value={documentName}
                    onChange={(event) => {
                      setDocumentName(event.target.value);
                    }}
                  />
                </Grid>
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
                  <IconButton onClick={deleteNote} sx={{ flexGrow: 0 }}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </Grid>
              </Box>
            </Collapse>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadNote;
export type { NoteInfoProps };
