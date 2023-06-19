import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newValue: string) => Promise<void>;
  initialName: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialName,
}: DeleteModalProps) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = async () => {
    await onSubmit(name);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm delete {name}?</DialogTitle>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
