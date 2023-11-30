import { useRef, useState } from 'react';
import { createCategory, createDocumentType } from '@api/actions';
import { AlertProps, AlertToast, Button, Modal } from '@components';
import { singularDataType, AddTypeDetails, DataTypeKey, AddPropertiesForm } from '@features';
import { Stack } from '@mui/material';

interface DeveloperAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulAdd: () => void;
  type: DataTypeKey | null;
}

export const AddModal = ({ isOpen, onClose, onSuccessfulAdd, type }: DeveloperAddModalProps) => {
  const singularType = type && (singularDataType[type] as DataTypeKey);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = async (formData: AddTypeDetails) => {
    if (type !== null) {
      try {
        if (type === 'categories') {
          await createCategory(formData);
        } else if (type === 'types') {
          await createDocumentType(formData);
        }

        onSuccessfulAdd();
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

  const handleConfirmButtonClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        confirmButton={
          <Button type='submit' onClick={handleConfirmButtonClick}>
            Add
          </Button>
        }
      >
        <>
          <h2>Add {singularType}</h2>
          <p>Please enter the name of the {singularType}.</p>
          <Stack direction='column' spacing={2}>
            <AddPropertiesForm ref={formRef} onSubmit={handleAdd} type={singularType} />
          </Stack>
        </>
      </Modal>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
