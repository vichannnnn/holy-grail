import { ChangeEvent, useState } from 'react';
import { CategoryType, SubjectType, DocumentType } from '@api/library';
import { Pagination } from '@components';
import { TabContentProps } from '@features';
import {
  Button,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const TabContent = ({ title, data, handleEdit, handleAdd, type }: TabContentProps) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [chunkSize, setChunkSize] = useState<number>(10);

  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  const handleFilterContent = () => {
    const validData: Array<CategoryType | SubjectType | DocumentType> = data.filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase());
    });
    return validData;
  };

  const handlePaging = () => {
    const pagedData: Array<Array<CategoryType | SubjectType | DocumentType>> = [];
    const validData: Array<CategoryType | SubjectType | DocumentType> = handleFilterContent();
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
                sx={{ width: '120%' }}
                placeholder={`Search for ${title}`}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                  //go back to first page to prevent overflow
                  setPage(0);
                  handleFilterContent();
                }}
              />
            </TableCell>

            <TableCell align='right'>
              <Button onClick={handleAdd}>+ {title}</Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(handlePaging()[page] || []).map((item) => (
            <TableRow key={item.id}>
              <TableCell component='th' scope='row'>
                {item.name}
              </TableCell>
              <TableCell align='right'>
                <Button onClick={() => handleEditClick(item.id)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
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
                styles={{ mt: '0%' }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
