import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateCategory, updateDocumentType } from '@api/actions';
import { AlertProps, AlertToast } from '@components';
import { DeveloperEditModalProps, singularDataType, UpdateTypeDetails } from '@features';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import './developer.css';

export const DeveloperEditSubjectModal = ({
  isOpen,
  onClose,
  onSuccessfulUpdate,
  initialData,
}: DeveloperEditModalProps) => {
  const singularType = singularDataType[initialData.type];
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { register, handleSubmit, setValue } = useForm<UpdateTypeDetails>({
    defaultValues: {
      name: initialData.name,
    },
  });

  const handleUpdate = async (formData: UpdateTypeDetails) => {
    try {
      if (initialData.type === 'categories') {
        await updateCategory(initialData.id, formData);
      } else if (initialData.type === 'types') {
        await updateDocumentType(initialData.id, formData);
      }

      await onSuccessfulUpdate();
      onClose();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: `Failed to update ${singularType}`,
        description: `The name of the ${singularType} already exists.`,
      });
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    setValue('name', initialData.name);
  }, [initialData.name, setValue]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Update {singularType}</DialogTitle>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <DialogContentText marginBottom='10%'>
            Please enter the new name of the {singularType}.
          </DialogContentText>
          <DialogContent>
            <Stack direction='column' spacing={2}>
              <TextField
                {...register('name', { required: true })}
                autoFocus
                margin='dense'
                label={<span style={{ textTransform: 'capitalize' }}>{singularType}</span>}
                type='text'
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack direction='row' spacing={2} justifyContent='center'>
              <Button variant='contained' type='submit' color='primary'>
                Update
              </Button>
              <Button variant='contained' onClick={onClose} color='primary'>
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
