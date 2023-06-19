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
  OutlinedInput,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, ChangeEvent, MouseEvent } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Pagination } from "../../components/Pagination/Pagination";

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
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [chunkSize, setChunkSize] = useState<number>(10);

  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  const handleFilterContent = () => {
    let validData: Array<CategoryType | SubjectType | DocumentType> =
      data.filter((option) => {
        return option.name.toLowerCase().includes(query.toLowerCase());
      });
    return validData;
  };

  const handlePaging = () => {
    let pagedData: Array<Array<CategoryType | SubjectType | DocumentType>> = [];
    let validData: Array<CategoryType | SubjectType | DocumentType> =
      handleFilterContent();
    for (let i = 0; i < validData.length; i += chunkSize) {
      pagedData.push(validData.slice(i, i + chunkSize));
    }
    return pagedData;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <OutlinedInput
                sx={{ width: "120%" }}
                placeholder={`Search for ${title}`}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                  //go back to first page to prevent overflow
                  setPage(0);
                  handleFilterContent();
                }}
              />
            </TableCell>

            <TableCell align="right">
              <Button onClick={handleAdd}>+ {title}</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <ChakraProvider>
                <Pagination
                  pageInfo={{
                    page: page + 1,
                    size: chunkSize,
                    total: handleFilterContent().length,
                    pages: handlePaging().length,
                  }}
                  handlePageChange={(newPage: number) => {
                    setPage(newPage - 1);
                  }}
                  styles={{ mt: "0%" }}
                />
              </ChakraProvider>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(handlePaging()[page] || []).map((item) => (
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
