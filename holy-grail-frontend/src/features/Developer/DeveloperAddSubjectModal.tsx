import { useForm } from 'react-hook-form';
import { DeveloperAddModalProps, singularDataType, AddSubjectDetails } from '@features';
import { AlertToast, AlertProps, Combobox } from '@components';
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
import { createSubject } from '@api/actions';
import { useEffect, useState } from 'react';
import { fetchData, CategoryType } from '@api/library';

export const DeveloperAddSubjectModal = ({
  isOpen,
  onClose,
  onSuccessfulAdd,
}: Omit<DeveloperAddModalProps, 'type'>) => {
  const singularType = singularDataType['subjects'];
  const { register, handleSubmit } = useForm<AddSubjectDetails>();

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetchData().then(({ categories }) => {
      setCategoryData(categories);
    });
  }, []);

  const handleAdd = async (formData: AddSubjectDetails) => {
    try {
      await createSubject(formData);

      await onSuccessfulAdd();
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Add {singularType}</DialogTitle>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogContent>
            <DialogContentText marginBottom='10%'>Create new {singularType}.</DialogContentText>
            <Stack direction='column' spacing={2}>
              <TextField
                {...register('name', { required: true })}
                autoFocus
                margin='dense'
                label={<span style={{ textTransform: 'capitalize' }}>{singularType}</span>}
                type='text'
                fullWidth
              />
              <Combobox
                label='Select a category'
                options={categoryData}
                onChange={() => {}}
                value=''
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
