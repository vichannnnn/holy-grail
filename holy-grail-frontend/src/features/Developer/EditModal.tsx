import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newValue: string) => Promise<void>;
  initialName: string;
}

const EditModal = ({ isOpen, onClose, onSubmit, initialName }: EditModalProps) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = async () => {
    await onSubmit(name);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Name</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
