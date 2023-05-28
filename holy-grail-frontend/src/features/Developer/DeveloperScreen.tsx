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

type DataTypeKey = "categories" | "subjects" | "types";

interface TabContentProps {
  title: string;
  data: Array<CategoryType | SubjectType | DocumentType>;
  handleEdit: (id: number, type: DataTypeKey) => void;
  type: DataTypeKey;
}

const TabContent = ({ title, data, handleEdit, type }: TabContentProps) => {
  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell align="right">Actions</TableCell>
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
    }
    closeEditModal();
  };

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          type="categories"
        />
      )}
      {value === 1 && (
        <TabContent
          title="Subjects"
          data={data.subjects}
          handleEdit={openEditModal}
          type="subjects"
        />
      )}
      {value === 2 && (
        <TabContent
          title="Types"
          data={data.types}
          handleEdit={openEditModal}
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
