import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
<<<<<<< HEAD
          margin='dense'
          id='name'
          label='Identifier'
          type='text'
=======
          margin="dense"
          id="name"
          label="Identifier"
          type="text"
>>>>>>> bbe493b (new FE (desktop))
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
