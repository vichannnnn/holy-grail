import { useState, useEffect, useContext, useRef } from 'react';
import { AxiosResponse } from 'axios';
import { fetchData } from '@api/library';
import { createNote } from '@api/actions';
import { AlertToast, AlertProps } from '@components';
import {
  DeleteAlert,
  OptionsProps,
  SelectedFilesProps,
  NotesProps,
  UploadNote,
  FileSelect,
} from '@features';
import { useNavigation } from '@utils';
import { AuthContext } from '@providers';
import { LoadingButton } from '@mui/lab';
import './upload.css';

export const UploadPage = () => {
  const { goToHome, goToLoginPage } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const { user, isLoading } = useContext(AuthContext);
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

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData().then((options) => {
      setOptions(options as OptionsProps);
    });
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'Please login.',
          description: 'You need to be logged in to upload documents.',
          severity: 'error',
        };
        goToLoginPage({ state: { alertContent: alertContentRedirect } });
      } else if (!user.verified) {
        const alertContentNotVerified: AlertProps = {
          title: 'Verification Required',
          description: 'You need to be verified to upload documents.',
          severity: 'error',
        };
        goToHome({ state: { alertContent: alertContentNotVerified } });
      }
    }
  }, [isLoading, user]);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    if (!notes || !selectedFiles) {
      setSubmitLoading(false);
      return;
    }
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
          DOCUMENT_NAME_DUPLICATED: 'You are uploading multiple documents with the same name.',
          DOCUMENT_NAME_IN_DB: 'Document name already exists.',
          SCHEMA_VALIDATION_ERROR:
            'Please ensure your document name is between 1 and 100 characters long.',
          INVALID_FILE_TYPE: 'Please ensure all files uploaded are pdf files.',
        };
        const indexedErrors: Record<number, string[]> = {};
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
        const keyedErrors: Record<string, string[]> = {};
        for (const [errIndex, err] of Object.entries(indexedErrors)) {
          keyedErrors[Object.keys(notes)[Number(errIndex)]] = err;
        }

        setServerValidationErrors(keyedErrors);

        return {
          title: 'Error',
          description: 'You have errors in your submission. Please fix them and try again.',
          severity: 'error',
        } as AlertProps;
      } else if (responseStatus === 401) {
        return {
          title: 'Error',
          description: 'Please login to upload documents.',
          severity: 'error',
        } as AlertProps;
      } else if (responseStatus === 500) {
        return {
          title: 'Internal Server Error',
          description: 'Please try again later.',
          severity: 'error',
        } as AlertProps;
      } else if (responseStatus === 200) {
        return {
          title: 'Success',
          description: 'Successfully sent for review and will be shown in library once uploaded.',
          severity: 'success',
        } as AlertProps;
      } else {
        return generalisedAlertError;
      }
    };
    setSubmitLoading(false);
    if (response?.status === 200) {
      goToHome({ state: { alertContent: statusAlertContent() } });
    }
    if (response?.status === 401) {
      goToLoginPage({ state: { alertContent: statusAlertContent() } });
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
      <div className='section__subtitle' style={{ textAlign: 'center' }}>
        Upload your materials here! All submitted materials will be reviewed before being published
        to the Holy Grail.
      </div>

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

        <LoadingButton
          loading={submitLoading}
          loadingIndicator='Submitting...'
          sx={{
            borderColor: 'transparent',
            backgroundColor: 'rgb(237, 242, 247)',
            textTransform: 'capitalize',
            color: 'black',
            fontWeight: 'bold',
            width: '10%',
            borderRadius: '4px',
          }}
          onClick={handleSubmit}
          disabled={handleDisableSumbit()}
        >
          Submit
        </LoadingButton>
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
    </section>
  );
};
