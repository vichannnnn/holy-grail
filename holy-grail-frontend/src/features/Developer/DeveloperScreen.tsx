import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchData } from "../../utils/library/Search";
import {
  CommonType,
  CategoryType,
  SubjectType,
  DocumentType,
} from "../../utils/library/Search";
import EditModal from "./EditModal";
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
type DataTypeKey = "categories" | "subjects" | "types";

interface TabContentProps {
  title: string;
  data: Array<CategoryType | SubjectType | DocumentType>;
  handleEdit: (id: number, type: DataTypeKey) => void;
  handleAdd: () => void;
  type: DataTypeKey;
}

const TabContent = ({
  title,
  data,
  handleEdit,
  handleAdd,
  type,
}: TabContentProps) => {
  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell align="right">
              <Button onClick={handleAdd}>+</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEditClick(item.id)}>
                  <EditIcon />
                </Button>
                {/*<Button onClick={() => handleDelete(item.id)}>*/}
                {/*  <DeleteIcon />*/}
                {/*</Button>*/}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

  useEffect(() => {
    fetchData().then(setData);
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
    </Box>
  );
};

export default DeveloperScreen;
