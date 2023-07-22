import { useState } from 'react';
import { DeveloperEditModalProps } from '@features';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import './developer.css';

export const DeveloperEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialName,
}: DeveloperEditModalProps) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = async () => {
    await onSubmit(name);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Name</DialogTitle>
      <Stack direction='column' sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            type='text'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Button type='submit' variant='contained' onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};
