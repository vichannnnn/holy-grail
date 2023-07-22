import { useState, FormEvent } from 'react';
import { RoleEnum, EditUserModalProps } from '@features';
import { Box, Button, MenuItem, Modal, Select, SelectChangeEvent, Stack } from '@mui/material';
import './developer.css';

export const DeveloperEditUserModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialRole,
  userName,
  userId,
}: EditUserModalProps) => {
  const [newRole, setNewRole] = useState<RoleEnum>(initialRole);

  const handleRoleChange = (event: SelectChangeEvent<RoleEnum>) => {
    setNewRole(event.target.value as RoleEnum);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(newRole);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>User ID: {userId}</h2>
        <h3>Username: {userName}</h3>
        <form onSubmit={handleFormSubmit}>
          <Stack
            direction='column'
            sx={{ alignItems: 'center', marginTop: '20%', justifyContent: 'center' }}
          >
            <Select value={newRole} onChange={handleRoleChange}>
              <MenuItem value={RoleEnum.USER}>User</MenuItem>
              <MenuItem value={RoleEnum.ADMIN}>Admin</MenuItem>
              <MenuItem value={RoleEnum.DEVELOPER}>Developer</MenuItem>
            </Select>
            <div style={{ marginTop: '20%' }}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
