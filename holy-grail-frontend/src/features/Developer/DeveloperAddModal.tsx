import { useForm } from 'react-hook-form';
import { DeveloperAddModalProps, singularDataType, AddTypeDetails } from '@features';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
} from '@mui/material';
import { createCategory, createDocumentType, createSubject } from '@api/actions';

export const DeveloperAddModal = ({
  isOpen,
  onClose,
  onSuccessfulAdd,
  type,
}: DeveloperAddModalProps) => {
  const singularType = type && singularDataType[type];
  const { register, handleSubmit } = useForm<AddTypeDetails>();
  const handleAdd = async (formData: AddTypeDetails) => {
    if (type !== null) {
      try {
        if (type === 'categories') {
          await createCategory(formData);
        } else if (type === 'subjects') {
          await createSubject(formData);
        } else if (type === 'types') {
          await createDocumentType(formData);
        }

        await onSuccessfulAdd();
      } catch (err) {
        console.error(err);
      } finally {
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add {singularType}</DialogTitle>
      <form onSubmit={handleSubmit(handleAdd)}>
        <DialogContent>
          <DialogContentText marginBottom='10%'>
            Please enter the new {singularType}.
          </DialogContentText>
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
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <Button variant='contained' type='submit' color='primary'>
              Add
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
