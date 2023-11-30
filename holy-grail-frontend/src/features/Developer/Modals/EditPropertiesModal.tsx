import { useRef, useState } from 'react';
import { CategoryType } from '@api/library';
import { updateCategory, updateDocumentType, updateSubject, updateUserRole } from '@api/actions';
import { AlertProps, AlertToast, Button, Modal } from '@components';
import {
  DataTypeEnum,
  DataTypeKey,
  EditPropertiesForm,
  EditSubjectForm,
  EditUserForm,
  singularDataType,
  UpdateSubjectDetails,
  UpdateTypeDetails,
  UpdateUserDetails,
  User,
} from '@features';
import { Stack } from '@mui/material';

interface PropertiesInitialData {
  id: number;
  name: string;
}

interface SubjectInitialData {
  id: number;
  name: string;
  category: CategoryType;
}

interface SubjectInitialData {
  id: number;
  name: string;
  category: CategoryType;
}

interface EditPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: DataTypeKey;
  initialData: SubjectInitialData | PropertiesInitialData | User;
  onSuccessfulUpdate: () => void;
}

export const EditPropertiesModal = ({
  isOpen,
  onClose,
  type,
  initialData,
  onSuccessfulUpdate,
}: EditPropertiesModalProps) => {
  const singularType = type && (singularDataType[type] as DataTypeEnum);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const subjectInitialData =
    singularType === DataTypeEnum.SUBJECT ? (initialData as SubjectInitialData) : undefined;
  const propertiesInitialData =
    singularType === DataTypeEnum.CATEGORY || singularType === DataTypeEnum.TYPE
      ? (initialData as PropertiesInitialData)
      : undefined;
  const userInitialData = singularType === DataTypeEnum.USER ? (initialData as User) : undefined;

  const handleUpdateProperties = async (formData: UpdateTypeDetails) => {
    try {
      if (singularType === DataTypeEnum.CATEGORY) {
        await updateCategory((initialData as PropertiesInitialData).id, formData);
      } else if (singularType === DataTypeEnum.TYPE) {
        await updateDocumentType((initialData as PropertiesInitialData).id, formData);
      }
      onClose();
      onSuccessfulUpdate();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: `Failed to update ${singularType}`,
        description: `The name of the ${singularType} already exists.`,
      });
      setOpenAlert(true);
    }
  };

  const handleUpdateSubject = async (formData: UpdateSubjectDetails) => {
    try {
      await updateSubject((initialData as SubjectInitialData).id, formData);
      onSuccessfulUpdate();
      onClose();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: `Failed to update subject`,
        description: `The name and category of the subject already exists.`,
      });
      setOpenAlert(true);
    }
  };

  const handleUpdateUser = async (formData: UpdateUserDetails) => {
    try {
      await updateUserRole((initialData as User).user_id, formData);
      onSuccessfulUpdate();
      onClose();
    } catch (err) {
      setAlertContent({
        severity: 'error',
        title: `Failed to update user`,
        description: `The user's role couldn't be updated.`,
      });
      setOpenAlert(true);
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
            Update
          </Button>
        }
      >
        <>
          <h2>Update {singularType}</h2>
          <p>Please enter the new name of the {singularType}.</p>
          <Stack direction='column' spacing={2}>
            {singularType === DataTypeEnum.SUBJECT && subjectInitialData ? (
              <EditSubjectForm
                ref={formRef}
                onSubmit={handleUpdateSubject}
                initialData={subjectInitialData}
              />
            ) : null}
            {(singularType === DataTypeEnum.TYPE || singularType === DataTypeEnum.CATEGORY) &&
            propertiesInitialData ? (
              <EditPropertiesForm
                ref={formRef}
                onSubmit={handleUpdateProperties}
                type={singularType}
                initialData={propertiesInitialData}
              />
            ) : null}
            {singularType === DataTypeEnum.USER && userInitialData ? (
              <EditUserForm
                ref={formRef}
                onSubmit={handleUpdateUser}
                initialData={userInitialData}
              />
            ) : null}
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
