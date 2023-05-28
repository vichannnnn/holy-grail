import React, { useState } from "react";
import { Box, Button, Modal, Select, MenuItem } from "@mui/material";
import { RoleEnum } from "./TabContentUsers";
import { SelectChangeEvent } from "@mui/material/Select";
import { VStack } from "@chakra-ui/react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRole: RoleEnum) => Promise<void>;
  initialRole: RoleEnum;
  userName: string;
  userId: number;
}

const EditUserModal = ({
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

  const handleFormSubmit = async (event: React.FormEvent) => {
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>User ID: {userId}</h2>
        <h3>Username: {userName}</h3>
        <form onSubmit={handleFormSubmit}>
          <VStack mt="20%">
          <Select value={newRole} onChange={handleRoleChange}>
            <MenuItem value={RoleEnum.USER}>User</MenuItem>
            <MenuItem value={RoleEnum.ADMIN}>Admin</MenuItem>
            <MenuItem value={RoleEnum.DEVELOPER}>Developer</MenuItem>
          </Select>
          <Button type="submit">Submit</Button>
          </VStack>
        </form>
      </Box>

    </Modal>
  );
};

export default EditUserModal;
