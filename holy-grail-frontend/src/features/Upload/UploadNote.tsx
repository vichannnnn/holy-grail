import { useState, useRef, useContext, useEffect } from 'react';
import { OptionsProps } from './UploadPage';
import Combobox from '../Library/Combobox';
import {
  createTheme,
  ThemeProvider,
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

  const validChecks = {
    category: category !== 0,
    subject: subject !== 0,
    type: type !== 0,
    name: documentName !== '',
  };

  const [expanded, setExpanded] = useState<boolean>(true);

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
    const valid = Object.values(validChecks).every((value) => Boolean(value));
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
        <div style={{ width: '50vw' }}>
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
                margin: '1%',
              }}
            >
              <Typography sx={{ marginLeft: '4%' }}>{fileName}</Typography>

              <IconButton
                sx={{ marginLeft: 'auto', display: isDesktop ? null : 'none' }}
                onClick={() => setExpanded(!expanded)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>

            <Collapse
              in={isDesktop ? expanded : true}
              timeout='auto'
              unmountOnExit
              sx={{ padding: '0 1% 1% 1%', flexGrow: 1, display: 'flex', flexDirection: 'row' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2% 0 2% 2%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh', flexGrow: 1 }}>
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
                      error={!validChecks.name}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    sx={{
                      ...gridStyles,
                      margin: '1%',
                      gap: '2%',

                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Combobox
                      style={{ flex: '1 1 0' }}
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
                      error={!validChecks.category}
                    />

                    <Combobox
                      style={{ flex: '1 1 0' }}
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
                      error={!validChecks.subject}
                    />

                    <Combobox
                      style={{ flex: '1 1 0' }}
                      label='Type'
                      value={type || 0}
                      onChange={(newValue) => {
                        setType(newValue || 0);
                      }}
                      options={
                        options?.types.map((type) => ({ value: type.id, label: type.name })) || []
                      }
                      error={!validChecks.type}
                    />
                  </Grid>
                </Box>
                <Box sx={{ marginLeft: '2%' }}>
                  <IconButton onClick={deleteNote} sx={{ flexGrow: 0 }}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </Box>
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
