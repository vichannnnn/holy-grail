import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchAllSubjects, fetchCategory, fetchLibraryTypes, SubjectType } from '@api/library';
import { createNote } from '@api/actions';
import { AlertToast, AlertProps } from '@components';
import {
  DeleteAlert,
  OptionsProps,
  UploadNote,
  FileSelect,
  NoteInfoProps,
  NotesFormData,
  UploadError,
} from '@features';
import { UploadNotesValidation } from '@forms/validation';
import { AuthContext } from '@providers';
import { useNavigation } from '@utils';
import './upload.css';

export const UploadPage = () => {
  const { goToHome, goToLoginPage } = useNavigation();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { user, isLoading } = useContext(AuthContext);
  const [options, setOptions] = useState<OptionsProps | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [deleteAlertKey, setDeleteAlertKey] = useState<number | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<NotesFormData>({
    defaultValues: {
      notes: [],
    },
    resolver: yupResolver(UploadNotesValidation),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notes',
  });

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'Please login.',
          description: 'You need to be logged in to upload resources.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  useEffect(() => {
    fetchLibraryTypes().then((options) => {
      setOptions(options as OptionsProps);
    });
  }, [isLoading, user]);

  const fetchSubjectsForCategory = async (categoryId: number) => {
    const categoryData = await fetchCategory({
      category_id: categoryId,
    });
    const subjects = await fetchAllSubjects(categoryData.id);
    return subjects.map((subject: SubjectType) => ({
      id: subject.id,
      name: subject.name,
    }));
  };

  const handleMirrorNotes = (toMirror: number) => {
    if (fields.length <= 1) return;
    const toMirrorNote = watch(`notes.${toMirror}`);
    fields.forEach((_, index) => {
      setValue(`notes.${index}.category`, toMirrorNote.category, { shouldValidate: true });
      fetchSubjectsForCategory(Number(toMirrorNote.category)).then(() => {
        setValue(`notes.${index}.subject`, toMirrorNote.subject, { shouldValidate: true });
      });
      setValue(`notes.${index}.type`, toMirrorNote.type);
      setValue(`notes.${index}.year`, toMirrorNote.year);
    });
  };

  const resetSubjectForNote = (noteIndex: number) => {
    setValue(`notes.${noteIndex}.subject`, 0);
  };

  const statusAlertContent: (response: AxiosResponse) => AlertProps = (response) => {
    const generalisedAlertError: AlertProps = {
      title: 'Error',
      description: 'Please check your input and try again.',
      severity: 'error',
    };

    if (response.status === 200) {
      return {
        title: 'Success',
        description: 'Successfully sent for review and will be shown in library once uploaded.',
        severity: 'success',
      } as AlertProps;
    }
    if (response.status === 401) {
      return {
        title: 'Error',
        description: 'Please login to upload documents.',
        severity: 'error',
      } as AlertProps;
    }
    if (response.status === 429) {
      return {
        title: 'Rate Limit Exceeded',
        description: "You're trying too fast! Please try again in 1 minute.",
        severity: 'error',
      } as AlertProps;
    } else {
      return generalisedAlertError;
    }
  };

  const handleSubmitUpload = async (formData: { notes: NoteInfoProps[] }) => {
    setIsUploading(true);
    const response = await createNote(formData.notes);
    const alertContent = statusAlertContent(response);

    if (response.status === 200) {
      goToHome({ state: { alertContent: alertContent } });
    }
    if (response.status === 401) {
      goToLoginPage({ state: { alertContent: alertContent } });
    }

    if (response.status === 400) {
      const failedNotes = response.data['detail'];
      console.log(failedNotes);

      if (failedNotes[UploadError.DOCUMENT_NAME_DUPLICATED]) {
        failedNotes[UploadError.DOCUMENT_NAME_DUPLICATED].forEach((index: number) => {
          setError(`notes.${index}.name`, {
            type: 'manual',
            message: 'Document name is duplicated',
          });
        });
      }

      if (failedNotes[UploadError.SCHEMA_VALIDATION_ERROR]) {
        failedNotes[UploadError.SCHEMA_VALIDATION_ERROR].forEach((index: number) => {
          setError(`notes.${index}.name`, {
            type: 'manual',
            message: 'Please ensure your document name is between 1 and 100 characters long',
          });
        });
      }

      if (failedNotes[UploadError.INVALID_FILE_TYPE]) {
        failedNotes[UploadError.INVALID_FILE_TYPE].forEach((index: number) => {
          setError(`notes.${index}.file`, {
            type: 'manual',
            message: 'Invalid file type',
          });
        });
      }

      if (failedNotes[UploadError.DOCUMENT_NAME_IN_DB]) {
        failedNotes[UploadError.DOCUMENT_NAME_IN_DB].forEach((index: number) => {
          setError(`notes.${index}.name`, {
            type: 'manual',
            message: 'Document name already exists in the database',
          });
        });
      }
    }

    setIsUploading(false);
    setAlertContent(alertContent);
    setOpenAlert(true);
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
    if (files.length + fields.length >= 25) {
      setAlertContent({
        title: 'Error',
        description: 'You can only upload up to 25 documents at a time.',
        severity: 'error',
      });
      setOpenAlert(true);
      return;
    }

    files.forEach((file: File) => {
      append({
        category: 0,
        subject: 0,
        type: 0,
        name: file.name,
        year: 0,
        file: file,
      });
    });
  };

  const handleDeleteNote = (index: number | null) => {
    if (index === null) {
      setOpenDeleteAlert(false);
      return;
    }

    remove(index);
    setOpenDeleteAlert(false);
  };

  return (
    <section className='upload section container'>
      <div className='section__title'>Upload Materials</div>
      <div className='section__subtitle' style={{ textAlign: 'center' }}>
        Upload your materials here! All submitted materials will be reviewed before being published
        to the Holy Grail.
      </div>

      <form onSubmit={handleSubmit(handleSubmitUpload)} className='upload__multiContainer'>
        {fields.map((field, index) => (
          <UploadNote
            key={field.id}
            control={control}
            errors={errors.notes && (errors.notes[index] as FieldErrors<NoteInfoProps>)}
            field={field}
            options={options}
            index={index}
            watch={watch}
            deleteNote={() => {
              setOpenDeleteAlert(true);
              setDeleteAlertKey(index);
            }}
            mirrorNote={() => handleMirrorNotes(index)}
            resetSubject={() => resetSubjectForNote(index)}
            totalNotesCount={fields.length}
          />
        ))}
        <FileSelect handleAddNotes={handleAddNotes} />

        <button
          className='upload-notes-submit-button'
          type='submit'
          disabled={isUploading || fields.length === 0}
        >
          Submit
        </button>
      </form>
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
