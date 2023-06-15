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
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { Tab } from "@chakra-ui/react";

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
  const [query, setQuery] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [chunkSize, setChunkSize] = React.useState<number>(10);

  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  //filter data based on query
  const handleValidData = () => {
    let validData: Array<CategoryType | SubjectType | DocumentType> = data.filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase());
    });
    return validData;
  }

  //paginate data into chunks
  const handlePaging = () =>{
    let pagedData: Array<Array<CategoryType | SubjectType | DocumentType>> = [];
    let validData: Array<CategoryType | SubjectType | DocumentType> = handleValidData();
    for (let i = 0; i < validData.length; i += chunkSize ) {
      pagedData.push(
        validData.slice(i, i + chunkSize)
      );
    };
    console.log(pagedData);
    return pagedData;
  }
  


  
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
    
            <TableCell>
              <OutlinedInput
                sx={{ width: '120%' }}
                placeholder={`Search for ${title}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                  handleValidData();
                  
                }}
              />
              
            </TableCell>
            
            <TableCell align="right">
                <Button onClick={handleAdd}>+ {title}</Button>
            </TableCell>
          </TableRow>
          <TablePagination 
            count={handleValidData().length}
            onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, page: number) =>{
              setPage(page);
            }}
            page={page}
            rowsPerPage={chunkSize}
            rowsPerPageOptions={[5,10,15,20]}
            onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setChunkSize(parseInt(event.target.value));
              handlePaging();
            }}
          /> 
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
