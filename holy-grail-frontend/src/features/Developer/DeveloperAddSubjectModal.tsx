import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createSubject } from '@api/actions';
import { fetchData, CategoryType } from '@api/library';
import { AlertToast, AlertProps, Combobox } from '@components';
import { DeveloperAddModalProps, AddSubjectDetails } from '@features';
import { Box, Button, Modal, TextField, Stack, Typography } from '@mui/material';

export const DeveloperAddSubjectModal = ({
  isOpen,
  onClose,
  onSuccessfulAdd,
}: Omit<DeveloperAddModalProps, 'type'>) => {
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '1em',
    outline: 'none',
    width: '500px',
    borderRadius: '4px',
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Subject
          </Typography>
          <form onSubmit={handleSubmit(handleAdd)}>
            <Typography marginTop='3%' marginBottom='5%'>
              Please select the type and enter the name of the new subject.
            </Typography>
            <Stack direction='column' spacing={2}>
              <TextField
                {...register('name', { required: true })}
                autoFocus
                margin='dense'
                label={<span style={{ textTransform: 'capitalize' }}>Subjects</span>}
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
            <Stack direction='row' spacing={2} justifyContent='center' marginTop='5%'>
              <Button variant='contained' type='submit' color='primary'>
                Add
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
