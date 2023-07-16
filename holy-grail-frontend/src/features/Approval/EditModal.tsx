import { useEffect, useRef, useState } from 'react';

import { Combobox, ComboboxProps } from '../Library/Combobox';
import { Box, Button, Modal, TextField, Tooltip, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newCategory: number | '',
    newSubject: number | '',
    newType: number | '',
    newDocName: string | '',
  ) => void;
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  documentName: string;
}

const EditModal = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  subjects,
  types,
  category,
  subject,
  type,
  documentName,
}: EditModalProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [newCategory, setNewCategory] = useState<number | ''>('');
  const [newSubject, setNewSubject] = useState<number | ''>('');
  const [newType, setNewType] = useState<number | ''>('');
  const [newDocName, setNewDocName] = useState<string | ''>('');

  useEffect(() => {
    setNewCategory(category);
    setNewSubject(subject);
    setNewType(type);
    setNewDocName(documentName);
  }, [isOpen]);

  const validityChecks = () => {
    const res: Object = {
      'Title must be between 4 and 100 characters long':
        newDocName.length >= 4 && newDocName.length <= 100,
      'Category must be selected': newCategory !== '',
      'Subject must be selected': newSubject !== '',
      'Type must be selected': newType !== '',
    };

    return res;
  };

  const muiTheme = createTheme();
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

  return (
    <ThemeProvider theme={muiTheme}>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ marginBottom: '8%', fontWeight: 'bold', fontSize: '130%' }}>
            Edit Note Properties
          </Typography>

          <TextField
            variant={'outlined'}
            label={'Title'}
            value={newDocName}
            onChange={(e) => {
              setNewDocName(e.target.value);
            }}
            sx={{ marginBottom: '4%', width: '100%' }}
          />

          <Combobox
            label='Category'
            value={newCategory}
            options={categories}
            onChange={(newValue) => setNewCategory(newValue)}
            disablePortal={true}
            style={{ marginBottom: '4%' }}
          />
          <Combobox
            label='Subject'
            value={newSubject}
            options={subjects}
            onChange={(newValue) => setNewSubject(newValue)}
            disablePortal={true}
            style={{ marginBottom: '4%' }}
          />
          <Combobox
            label='Type'
            value={newType}
            options={types}
            onChange={(newValue) => setNewType(newValue)}
            disablePortal={true}
            style={{ marginBottom: '4%' }}
          />

          <Button ref={cancelRef} onClick={onClose} variant='contained' sx={{ margin: '1%' }}>
            Cancel
          </Button>
          <Tooltip
            title={
              <Box>
                {Object.entries(validityChecks()).map(([text, value]) => (
                  <Typography
                    sx={{
                      color: value ? muiTheme.palette.success.light : muiTheme.palette.error.light,
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            }
            placement='bottom'
            arrow
            leaveDelay={1300}
          >
            <span>
              <Button
                sx={{ margin: '1%' }}
                disabled={Object.values(validityChecks()).some((elem) => elem === false)}
                variant='contained'
                color='success'
                onClick={() => {
                  setNewCategory('');
                  setNewSubject('');
                  setNewDocName('');
                  setNewType('');
                  onConfirm(newCategory, newSubject, newType, newDocName);
                  onClose();
                }}
              >
                Save Changes
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default EditModal;
