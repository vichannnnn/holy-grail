import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory, createDocumentType } from '@api/actions';
import { AlertProps, AlertToast } from '@components';
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

export const DeveloperAddModal = ({
  isOpen,
  onClose,
  onSuccessfulAdd,
  type,
}: DeveloperAddModalProps) => {
  const singularType = type && singularDataType[type];
  const { register, handleSubmit } = useForm<AddTypeDetails>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const handleAdd = async (formData: AddTypeDetails) => {
    if (type !== null) {
      try {
        if (type === 'categories') {
          await createCategory(formData);
        } else if (type === 'types') {
          await createDocumentType(formData);
        }

        await onSuccessfulAdd();
        onClose();
      } catch (err) {
        setAlertContent({
          severity: 'error',
          title: `Failed to add ${singularType}`,
          description: `The name of the ${singularType} already exists.`,
        });
        setOpenAlert(true);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Add {singularType}</DialogTitle>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogContent>
            <DialogContentText marginBottom='10%'>
              Please enter the new name of the {singularType}.
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
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
