import { useState, useEffect, useContext, useRef } from 'react';
import { fetchData, CategoryType, SubjectType, DocumentType } from '../../api/utils/library/Search';
import { createNote } from '../../api/utils/actions/CreateNote';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';
import UploadNote, { NoteInfoProps } from './UploadNote';
import './upload.css';
import { Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import DeleteAlert from '../Approval/DeleteAlert';
import FileSelect from './FileSelect';
import { set } from 'lodash';

interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
}

interface NotesProps {
  [key: string]: NoteInfoProps;
}

interface ResponseStatusProps {
  [key: string]: AlertProps;
}

interface SelectedFilesProps {
  [key: string]: [File, string];
}

const UploadPage = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [options, setOptions] = useState<OptionsProps | null>(null);

  const key = useRef<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFilesProps | null>(null);
  const [notes, setNotes] = useState<NotesProps | null>(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [deleteAlertKey, setDeleteAlertKey] = useState<string | null>(null);

  const muiTheme = createTheme();

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

  const handleSubmit = async () => {
    if (!notes || !selectedFiles) return;
    const responseStatus: string = (
      await createNote(Object.values(selectedFiles), Object.values(notes))
    ).toString();
    const statusAlertContent: ResponseStatusProps = {
      '200': {
        title: 'Success',
        description: 'Successfully sent for review and will be shown in library once uploaded.',
        severity: 'success',
      },
      '429': {
        title: "You're submitting too fast!",
        description: 'You can only upload 1 document per minute.',
        severity: 'error',
      },
      '401': {
        title: 'Your account has not been verified yet.',
        description: 'Please verify your account with the verification mail sent to your email.',
        severity: 'error',
      },
      '409': {
        title: 'Conflict occured.',
        description:
          'Another document with the same name already exists. Please rename your document.',
        severity: 'error',
      },
      '403': {
        title: 'Forbidden',
        description: 'Please ensure all files uploaded are pdf files.',
        severity: 'error',
      },
      '500': {
        title: 'Error',
        description: 'An internal server error has occured. Please try again later.',
        severity: 'error',
      },
    };

    const generalisedAlertError: AlertProps = {
      title: 'Error',
      description: 'Something went wrong.',
      severity: 'error',
    };
    if (responseStatus === undefined || !Object.keys(statusAlertContent).includes(responseStatus)) {
      setAlertContent(generalisedAlertError);
      setOpenAlert(true);
      return;
    }

    setAlertContent(statusAlertContent[responseStatus]);
    setOpenAlert(true);
  };

  const handleDisableSumbit = () => {
    if (!notes) return true;

    return !Object.values(notes)
      .map((note) => note.valid)
      .every((valid) => valid === true);
  };

  const handleAddNotes = (eventFiles: FileList) => {
    const files = Array.from(eventFiles);

    if (files.some((file) => file.type !== 'application/pdf')) {
      setAlertContent({
        title: 'Error',
        description: 'Please ensure all files uploaded are pdf files.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }
    if (files.length + Object.values(selectedFiles ? selectedFiles : {}).length >= 20) {
      setAlertContent({
        title: 'Error',
        description: 'You can only upload up to 20 documents at a time.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }

    let newKey = key.current;
    let newSelectedFiles = { ...selectedFiles };
    let newNotes = { ...notes };

    files.forEach((file: File) => {
      newKey += 1;

      newSelectedFiles[newKey] = [file, file.name];

      newNotes[newKey] = { category: 0, subject: 0, type: 0, name: '', valid: false };
    });
    key.current = newKey;
    console.log(newSelectedFiles, selectedFiles);
    setSelectedFiles(newSelectedFiles);
    setNotes(newNotes);
  };

  const handleDeleteNote = (key: string | null) => {
    if (key === null) {
      setOpenDeleteAlert(false);
      return;
    }
    const newNotes = { ...notes };
    const newSelectedFiles = { ...selectedFiles };
    delete newNotes[Number(key)];
    delete newSelectedFiles[Number(key)];

    setNotes(newNotes);
    setSelectedFiles(newSelectedFiles);
    setOpenDeleteAlert(false);
    setDeleteAlertKey(null);
  };

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
          {notes
            ? Object.entries(notes).map(([key, value]) => (
                <UploadNote
                  fileName={selectedFiles ? selectedFiles[key][1] : ''}
                  key={key}
                  options={options}
                  saveNoteUpdates={(note) => setNotes({ ...notes, [key]: note })}
                  deleteNote={() => {
                    setOpenDeleteAlert(true);
                    setDeleteAlertKey(key);
                  }}
                />
              ))
            : null}
          <FileSelect handleAddNotes={handleAddNotes} />

          <Button
            sx={{
              borderColor: 'transparent',
              backgroundColor: 'rgb(237, 242, 247)',
              textTransform: 'capitalize',
              color: 'black',
              fontWeight: 'bold',
              aspectRatio: 1.618,
              borderRadius: '10%',
            }}
            onClick={handleSubmit}
            disabled={handleDisableSumbit()}
          >
            Submit
          </Button>
        </div>
        <DeleteAlert
          isOpen={openDeleteAlert}
          onClose={() => {
            setOpenDeleteAlert(false);
            setDeleteAlertKey(null);
          }}
          onConfirm={() => {
            handleDeleteNote(deleteAlertKey);
          }}
        />

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
export type { OptionsProps, SelectedFilesProps };
