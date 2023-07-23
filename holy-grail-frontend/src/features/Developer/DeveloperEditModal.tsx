import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateCategory, updateDocumentType, updateSubject } from '@api/actions';
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

export const DeveloperEditModal = ({
  isOpen,
  onClose,
  onSuccessfulUpdate,
  initialName,
  type,
  id,
}: DeveloperEditModalProps) => {
  const singularType = type && singularDataType[type];
  const { register, handleSubmit, setValue } = useForm<UpdateTypeDetails>({
    defaultValues: {
      name: initialName, // Set the default value for the 'name' field
    },
  });
  const handleUpdate = async (formData: UpdateTypeDetails) => {
    if (type !== null) {
      try {
        if (type === 'categories') {
          await updateCategory(id, formData);
        } else if (type === 'subjects') {
          await updateSubject(id, formData);
        } else if (type === 'types') {
          await updateDocumentType(id, formData);
        }

        await onSuccessfulUpdate();
      } catch (err) {
        console.error(err);
      } finally {
        onClose();
      }
    }
  };

  useEffect(() => {
    setValue('name', initialName);
  }, [initialName, setValue]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Update {singularType}</DialogTitle>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DialogContentText marginBottom='10%'>
          Please enter the new {singularType}.
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
  );
};
