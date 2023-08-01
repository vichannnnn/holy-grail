import { useRef } from 'react';
import { DeleteAlertProps } from '@features';
import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export const DeleteAlert = ({ isOpen, onClose, onConfirm }: DeleteAlertProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography sx={{ marginBottom: '4%', fontWeight: 'bold', fontSize: '130%' }}>
          Delete Note
        </Typography>
        <Typography sx={{ marginBottom: '10%' }}>
          Are you sure you want to delete this note? This action cannot be undone.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button ref={cancelRef} onClick={onClose} variant='contained' sx={{ margin: '1%' }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant='contained' color='error' sx={{ margin: '1%' }}>
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
