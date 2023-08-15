import { useState, useEffect, useContext } from 'react';
import { useForm, useFieldArray, useFormContext } from 'react-hook-form';
import { fetchLibraryTypes } from '@api/library';
import { createNote } from '@api/actions';
import { AlertToast, AlertProps } from '@components';
import { DeleteAlert, OptionsProps, UploadNote, FileSelect, NoteInfoProps } from '@features';
import { AuthContext } from '@providers';
import { LoadingButton } from '@mui/lab';
import './upload.css';

export const UploadPage = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const { user, isLoading } = useContext(AuthContext);
  const [options, setOptions] = useState<OptionsProps | null>(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [deleteAlertKey, setDeleteAlertKey] = useState<number | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ notes: NoteInfoProps[] }>({
    defaultValues: {
      notes: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'notes',
  });

  useEffect(() => {
    fetchLibraryTypes().then((options) => {
      setOptions(options as OptionsProps);
    });
  }, [isLoading, user]);

  const handleSubmitUpload = async (formData: { notes: NoteInfoProps[] }) => {
    console.log(formData);
    await createNote(formData.notes);
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
    if (files.length + fields.length >= 10) {
      setAlertContent({
        title: 'Error',
        description: 'You can only upload up to 10 documents at a time.',
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
            errors={Boolean(errors.notes)}
            field={field}
            options={options}
            index={index}
            watch={watch}
            deleteNote={() => {
              setOpenDeleteAlert(true);
              setDeleteAlertKey(index);
            }}
          />
        ))}
        <FileSelect handleAddNotes={handleAddNotes} />
        <LoadingButton
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
          type='submit'
        >
          Submit
        </LoadingButton>
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
