import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newName: string) => void;
}

const AddModal = ({ isOpen, onClose, onSubmit }: AddModalProps) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the new identifier.</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Identifier'
          type='text'
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
