import { useRef } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '2%',
  boxShadow: 24,
  p: 4,
};

const DeleteAlert = ({ isOpen, onClose, onConfirm }: DeleteAlertProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const muiTheme = createTheme();
  return (
    <ThemeProvider theme={muiTheme}>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ marginBottom: '4%', fontWeight: 'bold', fontSize: '130%' }}>
            Delete Note
          </Typography>
          <Typography sx={{ marginBottom: '2%' }}>
            Are you sure you want to delete this note? This action cannot be undone.
          </Typography>
          <Button ref={cancelRef} onClick={onClose} variant='contained' sx={{ margin: '1%' }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant='contained' color='error' sx={{ margin: '1%' }}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteAlert;
