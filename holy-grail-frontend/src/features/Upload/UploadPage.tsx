import React, { useState, useEffect, useRef, useContext } from 'react';
import { fetchData, CategoryType, SubjectType, DocumentType } from '../../api/utils/library/Search';
import { createNote } from '../../api/utils/actions/CreateNote';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MediaQueryContext from '../../providers/MediaQueryProvider';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';
import UploadNote, { NoteInfoProps } from './UploadNote';
import './upload.css';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { border } from '@chakra-ui/react';

interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
}

const UploadPage = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [uploadNoteCount, setUploadNoteCount] = useState<number>(1);
  const muiTheme = createTheme();

  const [options, setOptions] = useState<OptionsProps | null>(null);

  const [savedData, setSavedData] = useState<NoteInfoProps[]>([]);
  const handleSaveNote = ({ file, category, subject, type, name }: NoteInfoProps) => {
    const newSavedData = [...savedData, { file, category, subject, type, name }];
    setSavedData(newSavedData);
  };

  if (!user) {
    const alertContentRedirect: AlertProps = {
      title: 'Please login.',
      description: 'You need to be logged in to upload documents.',
      severity: 'error',
    };
    navigate('/login', { state: { alertContent: alertContentRedirect } });
  }

  useEffect(() => {
    fetchData().then((options) => {
      setOptions(options as OptionsProps);
    });
  }, []);

  function renderNotes() {
    const notes = [];
    for (let i = 0; i < uploadNoteCount; i++) {
      notes.push(<UploadNote key={i} options={options} saveNote={handleSaveNote} />);
      notes.push(<hr style={{ width: '100vw' }} />);
    }

    return notes;
  }
  /*
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile || category === '' || subject === '' || type === '') {
      setAlertContent({
        title: 'Error',
        description: 'You need to select everything and upload at least one file.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }

    if (selectedFile) {
      const responseStatus = await createNote(
        selectedFile,
        category,
        subject,
        type,
        documentName || '',
      );

      let alertContentRedirect: AlertProps; // Initialize the alertContentRedirect object outside the conditions

      if (responseStatus == 200) {
        alertContentRedirect = {
          title: 'Success',
          description: 'Successfully sent for review and will be shown in library once uploaded.',
          severity: 'success',
        };
        setAlertContent(alertContentRedirect);
        setOpenAlert(true);
        navigate('/', { state: { alertContent: alertContentRedirect } });
      } else if (responseStatus === 429) {
        alertContentRedirect = {
          title: 'Rate limit exceeded',
          description: "You're trying too fast! Please try again in 1 minutes.",
          severity: 'error',
        };
      } else if (responseStatus === 401) {
        alertContentRedirect = {
          title: 'Account not verified',
          description: 'Please verify your account with the verification mail sent to your email.',
          severity: 'error',
        };
      } else if (responseStatus === 409) {
        alertContentRedirect = {
          title: 'Notes upload unsuccessful',
          description:
            "A name of the note that you're trying to upload already exists in the repository.",
          severity: 'error',
        };
      } else {
        alertContentRedirect = {
          title: 'Error',
          description: 'Something went wrong. Please contact an administrator!',
          severity: 'error',
        };
      }
      setAlertContent(alertContentRedirect);
      setOpenAlert(true);
    }
  };
  */

  return (
    <section className='upload section container'>
      <div className='section__title'>Upload Materials</div>
      <div className='section__subtitle'>
        Upload your materials here! All submitted materials will be reviewed before being published
        to the Holy Grail.
      </div>
      <ThemeProvider theme={muiTheme}>
        <div className='upload__multiContainer'>
          {renderNotes()}
          <Button
            variant='contained'
            sx={{ width: '20vw' }}
            onClick={() => setUploadNoteCount(uploadNoteCount + 1)}
          >
            Upload another document
          </Button>
        </div>

        <AlertToast
          openAlert={openAlert}
          onClose={() => setOpenAlert(false)}
          alertContent={alertContent}
        />
      </ThemeProvider>
    </section>
  );
};

export default UploadPage;
export type { OptionsProps };
