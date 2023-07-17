import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { CategoryType, CommonType, DocumentType, fetchData, SubjectType } from '@api/library';
import {
  createCategory,
  createDocumentType,
  createSubject,
  updateCategory,
  updateDocumentType,
  updateSubject,
  fetchAllUsers,
  updateUserRole,
} from '@api/actions';
import { DeveloperEditModal } from './DeveloperEditModal';
import { DeveloperEditUserModal } from './DeveloperEditUserModal';
import { AddModal } from './AddModal';
import { TabContent } from './TabContent';
import { RoleEnum, TabContentUsers, User } from './TabContentUsers';

type DataTypeKey = 'categories' | 'subjects' | 'types';

export const DeveloperScreen = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
  }>({ categories: [], subjects: [], types: [] });

  const [editId, setEditId] = useState<number | null>(null);
  const [editType, setEditType] = useState<DataTypeKey | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addType, setAddType] = useState<DataTypeKey | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserRole, setEditUserRole] = useState<RoleEnum | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false);

  const handleAdd = async (newName: string) => {
    if (addType !== null) {
      if (addType === 'categories') {
        await createCategory(newName);
      } else if (addType === 'subjects') {
        await createSubject(newName);
      } else if (addType === 'types') {
        await createDocumentType(newName);
      }
      // fetch the data again after adding
      fetchData().then(setData);
    }
    setIsAddModalOpen(false);
    setAddType(null);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openAddModal = (type: DataTypeKey) => {
    setAddType(type);
    setIsAddModalOpen(true);
  };

  const openEditModal = (id: number, type: string) => {
    setEditId(id);
    setEditType(type as DataTypeKey);
  };

  const closeEditModal = () => {
    setEditId(null);
    setEditType(null);
  };

  const openEditUserModal = (id: number) => {
    const user = users.find((user) => user.user_id === id);
    if (user) {
      setEditUserId(id);
      setEditUserRole(user.role);
      setIsEditUserModalOpen(true);
    }
  };

  const closeEditUserModal = () => {
    setEditUserId(null);
    setEditUserRole(null);
    setIsEditUserModalOpen(false);
  };

  const handleUpdate = async (newName: string) => {
    if (editId !== null && editType !== null) {
      if (editType === 'categories') {
        await updateCategory(editId, newName);
      } else if (editType === 'subjects') {
        await updateSubject(editId, newName);
      } else if (editType === 'types') {
        await updateDocumentType(editId, newName);
      }
      fetchData().then(setData);
    }
    closeEditModal();
  };

  const handleUpdateUser = async (newRole: RoleEnum) => {
    if (editUserId !== null) {
      await updateUserRole(editUserId, newRole);
      fetchAllUsers().then(setUsers);
    }
    setEditUserId(null);
    setEditUserRole(null);
  };

  useEffect(() => {
    fetchData().then(setData);
    fetchAllUsers().then(setUsers);
  }, []);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {isAddModalOpen && (
        <AddModal isOpen={true} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd} />
      )}
      <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
        <Tab label='Categories' />
        <Tab label='Subjects' />
        <Tab label='Types' />
        <Tab label='Users' />
      </Tabs>
      {value === 0 && (
        <TabContent
          title='Categories'
          data={data.categories}
          handleEdit={openEditModal}
          handleAdd={() => openAddModal('categories')}
          type='categories'
        />
      )}
      {value === 1 && (
        <TabContent
          title='Subjects'
          data={data.subjects}
          handleEdit={openEditModal}
          handleAdd={() => openAddModal('subjects')}
          type='subjects'
        />
      )}
      {value === 2 && (
        <TabContent
          title='Types'
          data={data.types}
          handleEdit={openEditModal}
          handleAdd={() => openAddModal('types')}
          type='types'
        />
      )}
      {value === 3 && <TabContentUsers data={users} handleEdit={openEditUserModal} />}
      {editId !== null && editType !== null && (
        <DeveloperEditModal
          isOpen={true}
          onClose={closeEditModal}
          onSubmit={handleUpdate}
          initialName={
            data[editType as DataTypeKey].find((item: CommonType) => item.id === editId)?.name || ''
          }
        />
      )}
      {editUserId !== null && editUserRole !== null && (
        <DeveloperEditUserModal
          isOpen={isEditUserModalOpen}
          onClose={closeEditUserModal}
          onSubmit={handleUpdateUser}
          initialRole={editUserRole}
          userName={users.find((user) => user.user_id === editUserId)?.username || ''}
          userId={editUserId}
        />
      )}
    </Box>
  );
};
