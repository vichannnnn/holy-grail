import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateSubject } from '@api/actions';
import { CategoryType, fetchAllCategories } from '@api/library';
import { AlertProps, AlertToast } from '@components';
import { DeveloperEditSubjectModalProps, UpdateSubjectDetails } from '@features';
import { Box, Button, Modal, Stack, TextField, Typography, MenuItem } from '@mui/material';
import './developer.css';

export const DeveloperEditSubjectModal = ({
  isOpen,
  onClose,
  onSuccessfulUpdate,
  initialData,
}: DeveloperEditSubjectModalProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { register, handleSubmit, setValue, control } = useForm<UpdateSubjectDetails>({
    defaultValues: {
      name: initialData.name,
      category_id: initialData.category.id,
    },
  });

  const handleUpdate = async (formData: UpdateSubjectDetails) => {
    try {
      await updateSubject(initialData.id, formData);
      onSuccessfulUpdate();
      onClose();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: `Failed to update subject`,
        description: `The name and category of the subject already exists.`,
      });
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const fetchedCategories = await fetchAllCategories();
      setCategories(fetchedCategories);
    };
    getAllCategories();
  }, []);

  useEffect(() => {
    setValue('name', initialData.name);
  }, [initialData.name, setValue]);

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
            Update Subject
          </Typography>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Typography marginTop='3%' marginBottom='5%'>
              Please enter the new name of the subject.
            </Typography>
            <Stack direction='column' spacing={2}>
              <TextField
                {...register('name', { required: true })}
                autoFocus
                margin='dense'
                label={<span style={{ textTransform: 'capitalize' }}>subject</span>}
                type='text'
                fullWidth
              />
              <Controller
                name='category_id'
                control={control}
                defaultValue={initialData.category.id}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    margin='dense'
                    label={<span style={{ textTransform: 'capitalize' }}>category</span>}
                    fullWidth
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' marginTop='5%'>
              <Button variant='contained' type='submit' color='primary'>
                Update
              </Button>
              <Button variant='contained' onClick={onClose} color='primary'>
                Cancel
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
