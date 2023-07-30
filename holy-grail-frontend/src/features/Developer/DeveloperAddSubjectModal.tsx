import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createSubject } from '@api/actions';
import { fetchData, CategoryType } from '@api/library';
import { AlertToast, AlertProps, Combobox } from '@components';
import { DeveloperAddModalProps, singularDataType, AddSubjectDetails } from '@features';
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

export const DeveloperAddSubjectModal = ({
  isOpen,
  onClose,
  onSuccessfulAdd,
}: Omit<DeveloperAddModalProps, 'type'>) => {
  const singularType = singularDataType['subjects'];
  const { register, handleSubmit, control } = useForm<AddSubjectDetails>();

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
      onClose();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: 'Failed to add subject',
        description: 'A subject with the category and name already exists.',
      });
      setOpenAlert(true);
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
              <Controller
                name='category_id'
                control={control}
                render={({ field }) => (
                  <Combobox
                    label='Select a category'
                    options={categoryData}
                    onChange={(newValue) => field.onChange(newValue)}
                    value={field.value}
                  />
                )}
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
