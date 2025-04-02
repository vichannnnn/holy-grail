import { Box, Typography } from '@mui/material';

import { Button } from '@components/Button';
import { Modal } from '@components/Modal/Modal';

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteNoteModal = ({ isOpen, onClose, onConfirm }: DeleteNoteModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h6'>Delete Note</Typography>
        <Typography>
          Are you sure you want to delete this note? This action cannot be undone.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: '#df6b51',
              '&:hover': {
                backgroundColor: '#e9947c',
                borderColor: '#fcaac0',
              },
            }}
            onClick={onConfirm}
          >
            Yes, delete it!
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
