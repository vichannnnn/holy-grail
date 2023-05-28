import {
  CategoryType,
  DocumentType,
  SubjectType,
} from "../../utils/library/Search";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

type DataTypeKey = "categories" | "subjects" | "types";

interface TabContentProps {
  title: string;
  data: Array<CategoryType | SubjectType | DocumentType>;
  handleEdit: (id: number, type: DataTypeKey) => void;
  handleAdd: () => void;
  type: DataTypeKey;
}

export const TabContent = ({
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
