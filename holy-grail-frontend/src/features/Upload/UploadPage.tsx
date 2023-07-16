import { useState, useEffect, useContext, useRef } from 'react';
import { fetchData, CategoryType, SubjectType, DocumentType } from '../../api/utils/library/Search';
import { createNote } from '../../api/utils/actions/CreateNote';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';
import UploadNote, { NoteInfoProps } from './UploadNote';
import './upload.css';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import DeleteAlert from '../Approval/DeleteAlert';
import FileSelect from './FileSelect';
import { AxiosResponse } from 'axios';

interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
}

export type { OptionsProps, SelectedFilesProps };

interface NotesProps {
  [key: string]: NoteInfoProps;
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

  const [serverValidationErrors, setServerValidationErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

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
    const response: AxiosResponse | undefined = await createNote(
      Object.values(selectedFiles),
      Object.values(notes),
    );

    const generalisedAlertError: AlertProps = {
      title: 'Error',
      description: 'Something went wrong.',
      severity: 'error',
    };

    const statusAlertContent: () => AlertProps = () => {
      if (response === undefined) return generalisedAlertError;

      const responseStatus = response?.status;
      const responseBody = response?.data['detail'];
      if (responseStatus === 400) {
        if (responseBody === undefined) return generalisedAlertError;
        const friendlyErrorText: Record<string, string> = {
          DOCUMENT_NAME_DUPLICATED: 'Document name already exists. Please rename this document.',
          DOCUMENT_NAME_IN_DB:
            'We have another document in our database with the same name. Please rename this document.',
          SCHEMA_VALIDATION_ERROR:
            'Please ensure your document name is between 1 and 100 characters long.',
          INVALID_FILE_TYPE: 'Please ensure all files uploaded are pdf files.',
        };
        let indexedErrors: Record<number, string[]> = {};
        for (const [err, val] of Object.entries<number[]>(responseBody)) {
          if (val.length === 0) continue;

          // if there is an error
          val.forEach((errIndex: number) => {
            if (indexedErrors[errIndex] === undefined) {
              indexedErrors[errIndex] = [friendlyErrorText[err]];
            } else {
              indexedErrors[errIndex].push(friendlyErrorText[err]);
            }
          });
        }
        let keyedErrors: Record<string, string[]> = {};
        for (const [errIndex, err] of Object.entries(indexedErrors)) {
          keyedErrors[Object.keys(notes)[Number(errIndex)]] = err;
        }
        // map each indexed error to its key
        console.log(keyedErrors);
        setServerValidationErrors(keyedErrors);

        return {
          title: 'Error',
          description: 'You have errors in your submission. Please fix them and try again.',
          severity: 'error',
        } as AlertProps;
      }
      if (responseStatus === 500) {
        return {
          title: 'Internal Server Error',
          description: 'Please try again later.',
          severity: 'error',
        } as AlertProps;
      }
      if (responseStatus === 200) {
        return {
          title: 'Success',
          description: 'Successfully sent for review and will be shown in library once uploaded.',
          severity: 'success',
        } as AlertProps;
      }
      return generalisedAlertError;
    };

    if (response?.status === 200) {
      navigate('/', { state: { alertContent: statusAlertContent() } });
    }
    setAlertContent(statusAlertContent());
    setOpenAlert(true);
  };

  const handleDisableSumbit = () => {
    if (!notes) return true;

    return !Object.values(notes)
      .map((note) => note.valid)
      .every((valid) => valid);
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
    if (files.length + Object.values(selectedFiles || {}).length >= 10) {
      setAlertContent({
        title: 'Error',
        description: 'You can only upload up to 10 documents at a time.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }

    let newKey = key.current;
    const newSelectedFiles = { ...selectedFiles };
    const newNotes = { ...notes };

    files.forEach((file: File) => {
      newKey += 1;
      newSelectedFiles[newKey] = [file, file.name];
      newNotes[newKey] = { category: 0, subject: 0, type: 0, name: '', valid: false };
    });
    key.current = newKey;

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
            ? Object.keys(notes).map((key) => (
                <UploadNote
                  fileName={selectedFiles ? selectedFiles[key][1] : ''}
                  key={key}
                  options={options}
                  saveNoteUpdates={(note) => setNotes({ ...notes, [key]: note })}
                  deleteNote={() => {
                    setOpenDeleteAlert(true);
                    setDeleteAlertKey(key);
                  }}
                  errors={serverValidationErrors ? serverValidationErrors[key] : undefined}
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
