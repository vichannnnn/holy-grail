import { Button, Modal } from '@components';
import { DeleteAlertProps } from '@features';

export const DeleteAlert = ({ isOpen, onClose, onConfirm }: DeleteAlertProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      confirmButton={
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
      }
    >
      <div>
        <h2>Delete Note</h2>
        <a>Are you sure you want to delete this note? This action cannot be undone.</a>
      </div>
    </Modal>
  );
};
