import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateCategory, updateDocumentType } from '@api/actions';
import { AlertProps, AlertToast } from '@components';
import { DeveloperEditModalProps, singularDataType, UpdateTypeDetails } from '@features';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import './developer.css';

export const DeveloperEditModal = ({
  isOpen,
  onClose,
  type,
  initialData,
}: DeveloperEditModalProps) => {
  const singularType = singularDataType[type];
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const { register, handleSubmit, setValue } = useForm<UpdateTypeDetails>({
    defaultValues: {
      name: initialData.name,
    },
  });

  const handleUpdate = async (formData: UpdateTypeDetails) => {
    try {
      if (type === 'categories') {
        await updateCategory(initialData.id, formData);
      } else if (type === 'types') {
        await updateDocumentType(initialData.id, formData);
      }

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
            Update {singularType}
          </Typography>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Typography marginTop='3%' marginBottom='5%'>
              Please enter the new name of the {singularType}.
            </Typography>
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
