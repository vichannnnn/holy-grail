import { useEffect, useRef, useState } from 'react';

import { Combobox } from '@components';
import { EditModalProps, ValidationResult } from '@features';
import { Box, Button, Modal, createTheme, TextField, Tooltip, Typography } from '@mui/material';

export const ApprovalEditModal = ({
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
  const muiTheme = createTheme();
  const [newCategory, setNewCategory] = useState<number | ''>('');
  const [newSubject, setNewSubject] = useState<number | ''>('');
  const [newType, setNewType] = useState<number | ''>('');
  const [newDocName, setNewDocName] = useState<string | ''>('');

  useEffect(() => {
    setNewCategory(category);
    setNewSubject(subject);
    setNewType(type);
    setNewDocName(documentName);
  }, [category, documentName, isOpen, subject, type]);

  const validityChecks = (): ValidationResult => {
    return {
      'Title must be between 4 and 100 characters long':
        newDocName.length >= 4 && newDocName.length <= 100,
      'Category must be selected': newCategory !== '',
      'Subject must be selected': newSubject !== '',
      'Type must be selected': newType !== '',
    };
  };

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
              {Object.entries(validityChecks()).map(([text, value], idx) => (
                <Typography
                  key={idx}
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
              disabled={Object.values(validityChecks()).some((elem) => !elem)}
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
  );
};
