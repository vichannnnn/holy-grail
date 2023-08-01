import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fetchAllUsers, updateUserRole } from '@api/actions';
import { RoleEnum, EditUserModalProps, UpdateUserDetails, User } from '@features';
import { AlertProps, AlertToast } from '@components';
import { Box, Button, MenuItem, Modal, Select, Stack } from '@mui/material';
import './developer.css';

export const DeveloperEditUserModal = ({
  isOpen,
  onClose,
  onSuccessfulUpdate,
  initialData,
}: EditUserModalProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]);
  const { handleSubmit, setValue, control } = useForm<UpdateUserDetails>({
    defaultValues: {
      role: initialData.role,
    },
  });

  const handleUpdate = async (formData: UpdateUserDetails) => {
    try {
      await updateUserRole(initialData.user_id, formData);
      await onSuccessfulUpdate();
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

  useEffect(() => {
    const getAllUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    setValue('role', initialData.role);
  }, [initialData.role, setValue]);

  return (
    <>
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
          <h2>User ID: {initialData.user_id}</h2>
          <h3>Username: {initialData.username}</h3>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Stack
              direction='column'
              sx={{ alignItems: 'center', marginTop: '20%', justifyContent: 'center' }}
            >
              <Controller
                name='role'
                control={control}
                defaultValue={initialData.role}
                render={({ field }) => (
                  <Select
                    {...field}
                    margin='dense'
                    label={<span style={{ textTransform: 'capitalize' }}>role</span>}
                    fullWidth
                  >
                    <MenuItem value={RoleEnum.USER}>User</MenuItem>
                    <MenuItem value={RoleEnum.ADMIN}>Admin</MenuItem>
                    <MenuItem value={RoleEnum.DEVELOPER}>Developer</MenuItem>
                  </Select>
                )}
              />
              <div style={{ marginTop: '20%' }}>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </div>
            </Stack>
          </form>
        </Box>
      </Modal>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </>
  );
};
