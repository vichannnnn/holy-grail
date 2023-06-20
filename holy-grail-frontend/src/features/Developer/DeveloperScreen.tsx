import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { fetchData } from "../../utils/library/Search";
import {
  CommonType,
  CategoryType,
  SubjectType,
  DocumentType,
} from "../../utils/library/Search";
import EditModal from "./EditModal";
import EditUserModal from "./EditUserModal";
import {
  updateSubject,
  updateCategory,
  updateDocumentType,
} from "../../utils/actions/UpdateCategory";
import {
  createCategory,
  createSubject,
  createDocumentType,
} from "../../utils/actions/CreateCategory";
import AddModal from "./AddModal";
import { TabContent } from "./TabContent";
import { TabContentUsers } from "./TabContentUsers";
import { updateUserRole, fetchAllUsers } from "../../utils/actions/UpdateUser";
import { User, RoleEnum } from "./TabContentUsers";
type DataTypeKey = "categories" | "subjects" | "types";

const DeveloperScreen = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState<{
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
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
      useState<boolean>(false);

  const handleAdd = async (newName: string) => {
    if (addType !== null) {
      if (addType === "categories") {
        await createCategory(newName);
      } else if (addType === "subjects") {
        await createSubject(newName);
      } else if (addType === "types") {
        await createDocumentType(newName);
      }
      // fetch the data again after adding
      fetchData().then(setData);
    }
    setIsAddModalOpen(false);
    setAddType(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
      if (editType === "categories") {
        await updateCategory(editId, newName);
      } else if (editType === "subjects") {
        await updateSubject(editId, newName);
      } else if (editType === "types") {
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {isAddModalOpen && (
            <AddModal
                isOpen={true}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAdd}
            />
        )}
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
        >
          <Tab label="Categories" />
          <Tab label="Subjects" />
          <Tab label="Types" />
          <Tab label="Users" />
        </Tabs>
        {value === 0 && (
            <TabContent
                title="Categories"
                data={data.categories}
                handleEdit={openEditModal}
                handleAdd={() => openAddModal("categories")}
                type="categories"
            />
        )}
        {value === 1 && (
            <TabContent
                title="Subjects"
                data={data.subjects}
                handleEdit={openEditModal}
                handleAdd={() => openAddModal("subjects")}
                type="subjects"
            />
        )}
        {value === 2 && (
            <TabContent
                title="Types"
                data={data.types}
                handleEdit={openEditModal}
                handleAdd={() => openAddModal("types")}
                type="types"
            />
        )}
        {value === 3 && (
            <TabContentUsers data={users} handleEdit={openEditUserModal} />
        )}
        {editId !== null && editType !== null && (
            <EditModal
                isOpen={true}
                onClose={closeEditModal}
                onSubmit={handleUpdate}
                initialName={
                    data[editType as DataTypeKey].find(
                        (item: CommonType) => item.id === editId
                    )?.name || ""
                }
            />
        )}
        {editUserId !== null && editUserRole !== null && (
            <EditUserModal
                isOpen={isEditUserModalOpen}
                onClose={closeEditUserModal}
                onSubmit={handleUpdateUser}
                initialRole={editUserRole}
                userName={
                    users.find((user) => user.user_id === editUserId)?.username || ""
                }
                userId={editUserId}
            />
        )}
      </Box>
  );
};

export default DeveloperScreen;
