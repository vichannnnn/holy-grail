import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory, createDocumentType } from '@api/actions';
import { AlertProps, AlertToast } from '@components';
import { DeveloperAddModalProps, singularDataType, AddTypeDetails } from '@features';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import './developer.css';

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
            Add {singularType}
          </Typography>
          <form onSubmit={handleSubmit(handleAdd)}>
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
